const DEFAULT_PAY_FROM_ACCOUNT = "Fiscal Sponsorship 2 - New";

function svbPayBillAddIndivHaveBank() {
	// Click on the "I have the bank account information" switch
	const iHaveBankInfoSwitch = <HTMLInputElement>(
		document.querySelector("#ctl00_DefaultContent_rdoIHaveTheirInfoForm")
	);
	if (!iHaveBankInfoSwitch.checked) {
		iHaveBankInfoSwitch.click();
	}

	// Select "Default pay from account" to be DEFAULT_PAY_FROM_ACCOUNT ("Fiscal Sponsorship - 2 New")
	Array.prototype.slice
		.call(
			document.querySelectorAll(
				"#ctl00_DefaultContent_IHaveTheirInfoForm_ddDefaultPayFrom > option"
			)
		)
		.forEach((option) => {
			if (option.innerText === DEFAULT_PAY_FROM_ACCOUNT) {
				option.selected = "true";
			}
		});

	// Allow paste to confirm account/routing number input
	const accountConfirmInput = document.querySelector(
		"#ctl00_DefaultContent_IHaveTheirInfoForm_txtConfirmAccountNumber"
	);
	const routingConfirmInput = document.querySelector(
		"#ctl00_DefaultContent_IHaveTheirInfoForm_txtConfirmRoutingNumber"
	);
	window.addEventListener(
		"paste",
		function (event) {
			if (
				(<HTMLElement>event.target).isSameNode(accountConfirmInput) ||
				(<HTMLElement>event.target).isSameNode(routingConfirmInput)
			) {
				event.stopPropagation();
			}
		},
		true
	);
}
export default svbPayBillAddIndivHaveBank;
