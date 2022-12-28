// eslint-disable-next-line
import { secretStore } from '$lib/stores';
import { SecretNetworkClient } from 'secretjs';

export async function connect() {
	if (!window.keplr || !window.getEnigmaUtils || !window.getOfflineSignerOnlyAmino) {
		return Promise.reject(
			'Wallet not found. Please install <a class="underline" href="https://www.keplr.app/">Keplr</a>'
		);
	}

	try {
		const CHAIN_ID = process.env.PUBLIC_SECRET_NETWORK_CHAIN_ID;
		const grpcWebUrl = process.env.PUBLIC_SECRET_NETWORK_GRPC_URL;

		if (CHAIN_ID === undefined || grpcWebUrl === undefined) {
			return Promise.reject('Could not create secretjs client. Chain ID or GRPC URL not set.');
		}

		await window.keplr.enable(CHAIN_ID);

		const keplrOfflineSigner = window.getOfflineSignerOnlyAmino(CHAIN_ID);
		const [{ address: myAddress }] = await keplrOfflineSigner.getAccounts();

		const secretjs = await SecretNetworkClient.create({
			grpcWebUrl,
			chainId: CHAIN_ID,
			wallet: keplrOfflineSigner,
			walletAddress: myAddress,
			encryptionUtils: window.getEnigmaUtils(CHAIN_ID)
		});

		const exp = new Date();
		exp.setDate(exp.getDate() + 1);

		secretStore.set({ val: secretjs, exp: exp.getTime() });
		sessionStorage.setItem('keplr-connected', 'true');

		return Promise.resolve();
	} catch (err) {
		return Promise.reject();
	}
}
