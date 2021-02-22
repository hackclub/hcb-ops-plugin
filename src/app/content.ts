import bankGoogleWorkspace from "./content/bankGoogleWorkspace";
import bankGoogleWorkspaceEdit from "./content/bankGoogleWorkspaceEdit";
import bankTransactionEdit from "./content/bankTransactionEdit";
import svbBillPayAddIndivHaveBank from "./content/svbBillPayAddIndivHaveBank";
import svbBillPayAddPayeeActivationCode from "./content/svbBillPayAddPayeeActivationCode";

chrome.runtime.sendMessage({}, (response) => {
	var checkReady = setInterval(() => {
		if (document.readyState === "complete") {
			clearInterval(checkReady);

			// match path to content function
			const url = window.location.href;
			const matches = [
				{
					regex: "https://bank.hackclub.com/g_suites",
					func: bankGoogleWorkspace,
				},
				{
					regex: "https://bank.hackclub.com/.*/g_suites/.*/edit",
					func: bankGoogleWorkspaceEdit,
				},
				{
					regex:
						"https://www.businessbillpay-e.com/V2/Payees/AddIndividual.aspx*",
					func: svbBillPayAddIndivHaveBank,
				},
				{
					regex:
						"https://www.businessbillpay-e.com/V2/Payees/ActivationCode.aspx*",
					func: svbBillPayAddPayeeActivationCode,
				},
				{
					regex: "https://bank.hackclub.com/transactions/.*/edit",
					func: bankTransactionEdit,
				},
			];

			var matchesSpecificContent = false;
			for (let item of matches) {
				if (url.match(item.regex)) {
					matchesSpecificContent = true;
					console.log("Hack Club Bank Ops Plugin is running on this page!");

					// inject common css/scripts into page
					injectCommon();

					// run content specific function
					item.func();
				}
			}
			if (!matchesSpecificContent) {
				console.log(
					"Hack Club Bank Ops Plugin is installed, but not active on this page."
				);
			}
		}
	});
});

function injectCommon() {
	const customCss = document.createElement("style");
	customCss.innerText = `
		.hcb-plugin-tools {
			padding: 0.5rem;
			border-radius: 0.5rem;
			border: 1px dashed #ff3737;
			background: rgba(241,87,15,0.125);'
		}
	`;
	document.head.appendChild(customCss);
}
