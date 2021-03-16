function svbBillPayAddPayeeActivationCode() {
	// Automatically click on "Request activation code"
	(<HTMLAnchorElement>(
		document.querySelector('#ctl00_DefaultContent_requestCode')
	)).click();
}
export default svbBillPayAddPayeeActivationCode;
