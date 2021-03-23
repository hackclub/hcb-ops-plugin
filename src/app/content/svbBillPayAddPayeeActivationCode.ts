import options from '../helpers/options';

function svbBillPayAddPayeeActivationCode() {
	options.svbBillPayAddPayeeActivationCode.get().then((value) => {
		if (!value) {
			return;
		}

		// Automatically click on "Request activation code"
		(<HTMLAnchorElement>(
			document.querySelector('#ctl00_DefaultContent_requestCode')
		)).click();
	});
}
export default svbBillPayAddPayeeActivationCode;
