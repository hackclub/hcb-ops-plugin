import axios from 'axios';

function bankV2TransactionEdit() {
	const rawName = getRawName();

	// quickAssignButtons();
	if (rawName !== null) {
		expensifyReport(rawName);
	}
}

function getRawName() {
	const paragraphs = <Array<HTMLParagraphElement>>(
		Array.prototype.slice.call(document.querySelectorAll('p'))
	);

	var rawPlaidTransaction: Array<Node>;
	paragraphs.forEach((p) => {
		if (p.innerText === 'RawPlaidTransaction') {
			rawPlaidTransaction = Array.prototype.slice.call(
				p.nextElementSibling.firstElementChild.childNodes
			);
		}
	});
	if (typeof rawPlaidTransaction === 'undefined') return null;

	var nameElement: Node;
	rawPlaidTransaction.forEach((e) => {
		if (e.nodeType === 3 && e.nodeValue.substring(1).trim() === '"name"') {
			nameElement = e;
		}
	});
	if (typeof nameElement === 'undefined') return null;

	const nameValue = (<HTMLElement>nameElement.nextSibling.nextSibling)
		.innerHTML;

	return nameValue;
}

function quickAssignButtons() {
	const options = [
		{
			name: 'HQ',
			eventId: 183,
		},
		{
			name: 'HCB',
			eventId: 636,
		},
		{
			name: 'Not event-related',
			eventId: null,
		},
	];

	// inject reuseable assign script
	var scriptInject = document.createElement('script');
	scriptInject.type = 'text/javascript';
	scriptInject.innerText = `
		function assign(event){
			if(event !== null) {
				document.querySelector("#transaction_is_event_related").checked = true;
				document.querySelector("#transaction_fee_relationship_attributes_event_id > option[value='" + event + "']").selected = true;
			} else {
				document.querySelector("#transaction_is_event_related").checked = false;
				document.querySelector("#transaction_fee_relationship_attributes_event_id > option").selected = true;
			}
		}
	`;
	document.head.appendChild(scriptInject);

	// build injected buttons
	var content = `
	<div class="hcb-plugin-tools mt3">
		<div class="btn-group center">`;
	options.forEach((option) => {
		content += `
			<span class="btn bg-accent"
				onClick="assign(${option.eventId})"
			>${option.name}</span>
		`;
	});
	content += `</div></div>`;

	// inject the buttons
	var displayElement = document.createElement('div');
	displayElement.innerHTML = content;

	const container = document.querySelector('.container > h1').parentElement;
	container.appendChild(displayElement.firstElementChild);
}

function expensifyReport(originalName: String) {
	const regexMatch = originalName.match(/Expensify R(\d*) The Hack Foundation/);

	if (regexMatch === null) return;

	console.log('This is an Expensify Report with id ' + regexMatch[1]);
	const expensifyReportUrl = `https://www.expensify.com/report?param={%22pageReportID%22:%22${regexMatch[1]}%22,%22keepCollection%22:true}`;

	var content = `
		<div class="hcb-plugin-tools mt3">
			<p>Visit
				<a href="${expensifyReportUrl}" target="_blank">Expensify Report (${regexMatch[1]})</a>.
			</p>
		</div>
		`;

	var displayElement = document.createElement('div');
	displayElement.innerHTML = content;

	const txDetailsTable = document.querySelector('table');
	txDetailsTable.parentElement.insertBefore(
		displayElement.firstElementChild,
		txDetailsTable.nextSibling
	);
}

export default bankV2TransactionEdit;
