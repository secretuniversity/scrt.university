// eslint-disable-next-line
// @ts-nocheck
export async function connect() {
	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	while (!window.keplr || !window.getEnigmaUtils || !window.getOfflineSignerOnlyAmino) {
		await sleep(100);
	}

	const CHAIN_ID = 'secret-4';

	await window.keplr.enable(CHAIN_ID);

	const keplrOfflineSigner = window.getOfflineSignerOnlyAmino(CHAIN_ID);
	const [{ address: myAddress }] = await keplrOfflineSigner.getAccounts();

	const grpcWebUrl = 'TODO get from https://github.com/scrtlabs/api-registry';

	const secretjs = await SecretNetworkClient.create({
		grpcWebUrl,
		chainId: CHAIN_ID,
		wallet: keplrOfflineSigner,
		walletAddress: myAddress,
		encryptionUtils: window.getEnigmaUtils(CHAIN_ID)
	});

	return secretjs;
}
