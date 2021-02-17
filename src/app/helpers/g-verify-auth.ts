async function getKey(): Promise<string> {
	return new Promise((resolve, reject) => {
		chrome.storage.sync.get("bankOpsPlugin_gVerifyAuthKey", function (items) {
			console.log(items);
			return resolve(items.bankOpsPlugin_gVerifyAuthKey);
		});
	});
}

function setKey(key: string) {
	chrome.storage.sync.set({ bankOpsPlugin_gVerifyAuthKey: key });
}

export { getKey, setKey };
