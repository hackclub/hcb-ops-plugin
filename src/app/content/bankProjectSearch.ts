function bankProjectSearch() {
	const params = new URLSearchParams(window.location.search);

	const nameParam = params.get('name');
	if (nameParam !== null && nameParam !== '') {
		search(nameParam);
	}
}

function search(name) {
	console.log('Searching for', name);

	const searchInput = <HTMLInputElement>(
		document.querySelector(".filterbar > input[type='search']")
	);

	searchInput.value = name;
	searchInput.dispatchEvent(
		new Event('input', {
			bubbles: true,
			cancelable: true,
		})
	);
}

export default bankProjectSearch;
