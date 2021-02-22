function bankTransactionEdit() {
	const originalName = getOriginalName();

	expensifyReport(originalName);
}

function getOriginalName(): String {
	return (<HTMLPreElement>(
		document.querySelector(".container > pre.bg-smoke.mt0")
	)).innerText;
}

function expensifyReport(originalName: String) {
	const regexMatch = originalName.match(/Expensify R(\d*) The Hack Foundation/);

	if (regexMatch) {
		console.log("This is an Expensify Report with id " + regexMatch[1]);
		const expensifyReportUrl = `https://www.expensify.com/report?param={%22pageReportID%22:%22${regexMatch[1]}%22,%22keepCollection%22:true}`;

		var content = `
		<div class="hcb-plugin-tools mt3">
			<p>Visit
				<a href="${expensifyReportUrl}" target="_blank">Expensify Report (${regexMatch[1]})</a>.
			</p>
		</div>
		`;

		var displayElement = document.createElement("div");
		displayElement.innerHTML = content;

		const container = document.querySelector(".container > h1").parentElement;
		container.appendChild(displayElement.firstElementChild);
	}
}

export default bankTransactionEdit;
