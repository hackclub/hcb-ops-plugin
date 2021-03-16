function expensifyReport() {
	linkBankProjectSearch();
}
function linkBankProjectSearch() {
	const injectScript = document.createElement('script');
	injectScript.innerText = `
	function inject() {
		let observer = new MutationObserver((mutations) => {
			const displayLoc = document.querySelector(
				"#report_invoice_dates_container"
				);
				if (displayLoc === null) {
					return;
				}
			const policyName = Policy.getCurrent().policy.name;
			
			if(document.querySelector("#linkToHCBSearch") === null) {
				const displayElem = document.createElement("div");
				displayElem.classList.add("hcb-plugin-tools");
				displayElem.id = "linkToHCBSearch";
				displayElem.innerHTML = \`
					<p>
						Search for
						<a href='https://bank.hackclub.com/events?name=\` + policyName + \`' target='_blank'>\` + policyName + \`</a>
						on Hack Club Bank.
					</p>
				\`;
				displayLoc.appendChild(displayElem);
			}

			observer.disconnect();
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
			attributes: false,
			characterData: false,
		});
	}
	inject();
	`;
	document.head.appendChild(injectScript);
}
export default expensifyReport;
