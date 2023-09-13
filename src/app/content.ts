import bankEventCopyName from './content/bankEventCopyName';
import bankV1GoogleWorkspace from './content/bankV1GoogleWorkspace';
import bankV1GoogleWorkspaceEdit from './content/bankV1GoogleWorkspaceEdit';
import bankProjectSearch from './content/bankProjectSearch';
import bankV1TransactionEdit from './content/bankV1TransactionEdit';
import expensifyReport from './content/expensifyReport';
import svbBillPayAddIndivHaveBank from './content/svbBillPayAddIndivHaveBank';
import svbBillPayAddPayeeActivationCode from './content/svbBillPayAddPayeeActivationCode';
import bankV2GoogleWorkspaceEdit from './content/bankV2GoogleWorkspaceEdit';
import bankV2TransactionEdit from './content/bankV2TransactionEdit';
import bankV2GoogleWorkspace from './content/bankV2GoogleWorkspace';

function checkPath() {
	chrome.runtime.sendMessage({}, (response) => {
		var checkReady = setInterval(() => {
			if (document.readyState === 'complete') {
				clearInterval(checkReady);

				// match path to content function
				const matches = [
					{
						regex: /https:\/\/hcb\.hackclub\.com\/g_suites$/,
						func: bankV1GoogleWorkspace,
					},
					{
						regex: /https:\/\/hcb\.hackclub\.com\/.*\/g_suites\/.*\/edit/,
						func: bankV1GoogleWorkspaceEdit,
					},
					{
						regex: /https:\/\/www\.businessbillpay-e\.com\/V2\/Payees\/AddIndividual\.aspx.*/,
						func: svbBillPayAddIndivHaveBank,
					},
					{
						regex: /https:\/\/www\.businessbillpay-e\.com\/V2\/Payees\/ActivationCode\.aspx.*/,
						func: svbBillPayAddPayeeActivationCode,
					},
					{
						regex: /https:\/\/hcb\.hackclub\.com\/transactions\/.*\/edit/,
						func: bankV1TransactionEdit,
					},
					// {
					// 	regex: /https:\/\/hcb\.hackclub\.com\/.*/,
					// 	func: bankEventCopyName,
					// },
					{
						regex: /https:\/\/hcb\.hackclub\.com\/events.*[?&]name=.*/,
						func: bankProjectSearch,
					},
					{
						regex: /https:\/\/.*expensify\.com\/report.*/,
						func: expensifyReport,
					},
					{
						regex: /https:\/\/hcb\.hackclub\.com\/admin\/.*\/google_workspace_process/,
						func: bankV2GoogleWorkspaceEdit,
					},
					{
						regex: /https:\/\/hcb\.hackclub\.com\/admin\/.*\/transaction/,
						func: bankV2TransactionEdit,
					},
					{
						regex: /https:\/\/hcb\.hackclub\.com\/admin\/google_workspaces/,
						func: bankV2GoogleWorkspace,
					},
				];

				const url = window.location.href;
				var matchesSpecificContent = false;
				for (let item of matches) {
					if (item.regex instanceof RegExp) {
						if (url.match(item.regex)) {
							matchesSpecificContent = true;
							console.log('HCB Ops Plugin is running on this page!');
							console.log('Running function:', item.func.name + '()');

							// inject common css/scripts into page
							injectCommon();

							// run content specific function
							item.func();
						}
					} else if (Array.isArray(item.regex)) {
						var matched = false;
						interface matchObj {
							regex: RegExp;
							func: Function;
						}
						(<Array<matchObj>>item.regex).forEach((r) => {
							if (url.match(r.regex)) {
								// don't run same function multiple times per page
								if (matched) {
									return;
								}
								matchesSpecificContent = true;
								console.log(
									'HCB Ops Plugin is running on this page!'
								);

								// inject common css/scripts into page
								injectCommon();

								// run content specific function
								item.func();

								matched = true;
							}
						});
					}
				}
				if (!matchesSpecificContent) {
					console.log(
						'HCB Ops Plugin is installed, but not active on this page.'
					);
				}
			}
		});
	});
}
checkPath();

// check path on SPA page change
let url = window.location.href;
['click', 'popstate', 'onload'].forEach((evt) =>
	window.addEventListener(
		evt,
		function () {
			requestAnimationFrame(() => {
				if (url !== location.href) {
					checkPath();
				}
				url = location.href;
			});
		},
		true
	)
);

function injectCommon() {
	const customCss = document.createElement('style');
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
