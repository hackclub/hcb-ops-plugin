import axios from 'axios';
import { getKey } from '../helpers/g-verify-auth';

async function bankV1GoogleWorkspaceEdit() {
	processDomain();

	// listen for changes to the domain field
	// TODO: watch out for too many requests/max out api limit
	document.querySelector('#g_suite_domain').addEventListener('input', (e) => {
		processDomain();
	});
}

async function processDomain() {
	// get domain of current Google Worksapce
	const domain = (<HTMLInputElement>document.querySelector('#g_suite_domain'))
		.value;

	// get verification key from g-verify
	if (domain !== '') {
		displayToken('LOADING...');
		var domainKey = (await getToken(domain)).token;
		displayToken(domainKey);
		console.log(domain, domainKey);
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

	const form = document.querySelector('form');
	form.parentElement.insertBefore(
		displayElement.firstElementChild,
		form.nextElementSibling
	);
}

async function getToken(domain) {
	return (
		await axios.get('https://g-verify.herokuapp.com/token/' + domain, {
			headers: {
				authorization: await getKey(),
			},
		})
	).data;
}

export default bankV1GoogleWorkspaceEdit;
