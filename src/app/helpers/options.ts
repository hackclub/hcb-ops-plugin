const storagePrefix = 'bankOpsPlugin_';

async function get<T>(key: string): Promise<T> {
	return new Promise((resolve, reject) => {
		chrome.storage.sync.get(`${storagePrefix}${key}`, function (items) {
			return resolve(<T>items[`${storagePrefix}${key}`]);
		});
	});
}

function set(key: string, value) {
	console.log(key, value);
	chrome.storage.sync.set({ [`${storagePrefix}${key}`]: value });
}

function createObj<T>(key, defaultValue: T) {
	return {
		set: (value: T) => set(key, value),
		get: () => get<T>(key),
		defaultValue,
	};
}

export default {
	bankAutoVerifyGoogleWorkspace: createObj<boolean>(
		'bankAutoVerifyGoogleWorkspace',
		true
	),
	svbBillPayAddIndivHaveBank: createObj<boolean>(
		'svbBillPayAddIndivHaveBank',
		true
	),
	svbBillPayAddPayeeActivationCode: createObj<boolean>(
		'svbBillPayAddPayeeActivationCode',
		false
	),
};
