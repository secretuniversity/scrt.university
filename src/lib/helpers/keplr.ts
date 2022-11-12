// eslint-disable-next-line
import { secretStore } from '$lib/stores';
import { SecretNetworkClient } from 'secretjs';
import { env } from '$env/dynamic/public';

export async function connect() {
	try {
		const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

		while (!window.keplr || !window.getEnigmaUtils || !window.getOfflineSignerOnlyAmino) {
			await sleep(100);
		}

		const CHAIN_ID = env.PUBLIC_SECRET_NETWORK_CHAIN_ID;

		await window.keplr.enable(CHAIN_ID);

		const keplrOfflineSigner = window.getOfflineSignerOnlyAmino(CHAIN_ID);
		const [{ address: myAddress }] = await keplrOfflineSigner.getAccounts();

		const grpcWebUrl = env.PUBLIC_SECRET_NETWORK_GRPC_URL;

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
		console.log(err);
		return Promise.reject();
	}
}
