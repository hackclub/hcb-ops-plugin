function bankEventCopyName() {
	if (onEventPage()) {
		const nameElement = <HTMLHeadElement>(
			document.querySelector('main.container > aside > a > h1.primary')
		);
		const name = nameElement.innerText;

		var copyElement = document.createElement('span');
		copyElement.className = 'badge bg-muted ml0 mb2';
		copyElement.innerText = 'copy project name';
		copyElement.style.cursor = 'pointer';
		copyElement.addEventListener('click', function () {
			navigator.clipboard.writeText(`${name.trim()}`);
		});

		var copyElementWrapper = document.createElement('div');
		copyElementWrapper.appendChild(copyElement);

		nameElement.parentElement.parentElement.insertBefore(
			copyElementWrapper,
			nameElement.parentElement.nextElementSibling
		);
	}
}

function onEventPage(): boolean {
	if (
		document.querySelector('main.container > aside > a > h1.primary') &&
		document.querySelector(
			"main.container > aside > nav > a[aria-label='Edit project settings']"
		)
	) {
		return true;
	}
	return false;
}

export default bankEventCopyName;
