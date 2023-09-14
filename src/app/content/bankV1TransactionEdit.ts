function bankV1TransactionEdit() {
	const originalName = getOriginalName();

	quickAssignButtons();
	expensifyReport(originalName);
}

function getOriginalName(): String {
	return (<HTMLPreElement>(
		document.querySelector('.container > pre.bg-smoke.mt0')
	)).innerText;
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

	if (regexMatch) {
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

		const container = document.querySelector('.container > h1').parentElement;
		container.appendChild(displayElement.firstElementChild);
	}
}

export default bankV1TransactionEdit;
