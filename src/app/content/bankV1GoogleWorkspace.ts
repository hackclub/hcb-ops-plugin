import axios from 'axios';
import { getKey } from '../helpers/g-verify-auth';
import options from '../helpers/options';

function bankV1GoogleWorkspace() {
	const events = processTable();
	console.log(events);

	options.bankAutoVerifyGoogleWorkspace.get().then((value) => {
		value && verifyAll(events);
	});
}

const tableRowAttributeName = 'data-hcb-plugin-row-num';
function processTable() {
	var rows = Array.prototype.slice.call(document.querySelectorAll('table tr'));
	var data = [];

	// get rid of table heading
	rows.shift();

	// process
	for (let [index, row] of rows.entries()) {
		var cols = Array.prototype.slice.call(row.querySelectorAll('td'));
		data.push({
			eventName: cols[0].firstElementChild.innerText,
			eventSlug: cols[0].firstElementChild['href'],
			domain: cols[1].innerText,
			key: cols[2].innerText,
			status: cols[3].innerText,
			deleted: row.classList.contains('shade-red'),
			rowNum: index,
		});
		row.setAttribute(tableRowAttributeName, `${index}`);
	}

	return data;
}

function verifyAll(events) {
	var numVerified = 0;

	var verifyErrors = {};
	var verifyPromises = [];
	for (let event of events) {
		if (!event.deleted && event.status === 'verifying') {
			numVerified++;

			const promise = verify(event);
			verifyPromises.push(promise);
			promise.catch((res) => {
				// track errors
				verifyErrors[res.status] = res.data;
			});
		}
	}

	// display the number of domains sent to G-Verify on this page load
	const displayNumVerified = document.createElement('p');
	displayNumVerified.innerText = `G-Verify: ${numVerified} Domains`;
	document
		.querySelector('main')
		.insertBefore(displayNumVerified, document.querySelector('table'));

	// alert users of errors that have built up

	Promise.all(verifyPromises).catch(() => {
		Object.keys(verifyErrors).forEach((err) => {
			switch (err) {
				case '401':
					alert(
						'HCB Operations Plugin: UH OH!\nG-Verify Authentication Key not found\n\nPlease visit the plugin settings to set your authentication key.'
					);
					break;

				case '403':
					alert(
						'HCB Operations Plugin: UH OH!\nInvalid G-Verify Authentication Key\n\nPlease visit the plugin settings to double check your authentication key. Contact Gary for help!'
					);
					break;

				default:
					alert(
						`HCB Operations Plugin: UH OH!\nG-Verify Error\n\n${JSON.stringify(
							verifyErrors[err]
						)}`
					);
					break;
			}
		});
	});

	async function verify(event) {
		return new Promise(async (resolve, reject) => {
			const authKey = await getKey();
			try {
				setRowStatus(event, 'loading');
				const res = await axios.get(
					'https://gverify.bank.engineering/verify/' + event.domain,
					typeof authKey !== 'undefined' && authKey !== ''
						? {
								headers: {
									authorization: await getKey(),
								},
						  }
						: null
				);
				print(res.data);
				setRowStatus(event, 'verified');
				resolve(res.data);
			} catch (error) {
				print(error.response.data);

				// 400 from G-Verify (and Google) means verification token was not found in domain DNS
				// (no request error)
				if (error.response.status === 400) {
					setRowStatus(
						event,
						'failed',
						error.response.data.error.message.join(' ')
					);
					resolve(error.response.data);
					return;
				}

				// if there's error, but not 400, there's an issue!
				setRowStatus(event, 'failed', error.response.data.error);
				return reject(error.response);
			}
		});

		function print(data) {
			// console.group("Verify: " + event.domain);
			// console.log(data);
			// console.groupEnd();
		}
	}
}

function setRowStatus(event, status, message = undefined) {
	const statusInjectLoc = document.querySelector(
		`tr[${tableRowAttributeName}="${event.rowNum}"]`
	).firstElementChild;

	var statusDisplayText = '<strong>G-Verify</strong>: ';
	switch (status) {
		case 'loading':
			statusDisplayText += 'LOADING...';
			break;
		case 'verified':
			statusDisplayText += 'SUCCESSFUL';
			break;
		case 'failed':
			statusDisplayText += 'FAILED';
			break;
	}
	message && (statusDisplayText += ` (${message})`);

	var tempDiv = document.createElement('div');
	const uniqueId = `hcb-plugin-google-workspace-g-verify-${event.domain.replace(
		/\W+(?!$)/g,
		'_D-O-T_'
	)}`;
	tempDiv.innerHTML = `<div id="${uniqueId}">${statusDisplayText}</div>`;
	const preexistingElement = document.querySelector(`#${uniqueId}`);
	preexistingElement && preexistingElement.remove();
	statusInjectLoc.appendChild(tempDiv.firstElementChild);
}

export default bankV1GoogleWorkspace;
