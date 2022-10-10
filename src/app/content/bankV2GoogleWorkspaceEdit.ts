import axios from 'axios';
import { getKey } from '../helpers/g-verify-auth';

async function bankV2GoogleWorkspaceEdit() {
	processDomain();
}

async function processDomain() {
	const detailsTable = document.querySelector('table');

	// get domain of current Google Worksapce
	var details = {
		name: '',
		domain: '',
		key: '',
		ouId: '',
		ouPath: '',
	};
	for (let item of detailsTable.querySelectorAll('tr')) {
		const pairs = <Array<HTMLTableCellElement>>(
			Array.prototype.slice.call(item.querySelectorAll('td'))
		);

		// first td
		const name = pairs[0].innerText;
		const data = pairs[1].innerText;
		switch (name.trim()) {
			case 'Event:': {
				details.name = data;
				break;
			}
			case 'Domain:': {
				details.domain = data;
				break;
			}
			case 'Verificaton Key:': {
				details.key = data;
				break;
			}
			case 'OU ID:': {
				details.ouId = data;
				break;
			}
			case 'OU Path:': {
				details.ouPath = data;
				break;
			}
		}
	}

	// get verification key from g-verify
	if (details.domain !== '') {
		displayToken('LOADING...');
		var domainKey = (await getToken(details.domain.trim())).token;
		displayToken(domainKey);
		console.log(details.domain, domainKey);
	} else {
		displayToken('NO DOMAIN');
	}
}

async function displayToken(domainKey) {
	var content = `
	<div class="hcb-plugin-tools mt3" id="generatedDomainKeyWrapper">
		<h4>Verification Token</h4>
		<pre id="generatedDomainKey" onclick="
			(function() {
				navigator.clipboard.writeText('${domainKey}');
			})();
			"
			style="cursor: pointer"
		>${domainKey}</pre>
	</div>
	`;

	var displayElement = document.createElement('div');
	displayElement.innerHTML = content;

	// remove pre-existing
	const preexisting = document.querySelector(`#generatedDomainKeyWrapper`);
	preexisting && preexisting.remove();

	document.body.appendChild(displayElement.firstElementChild);
}

async function getToken(domain) {
	return (
		await axios.get('https://gverify.bank.engineering/token/' + domain, {
			headers: {
				authorization: await getKey(),
			},
		})
	).data;
}

export default bankV2GoogleWorkspaceEdit;
