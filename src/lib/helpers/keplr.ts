// eslint-disable-next-line
import { secret } from '$lib/stores';
import { SecretNetworkClient } from 'secretjs';

interface Connection {
	address: string,
	client: SecretNetworkClient | null,
	err: string | null,
	msg: string | null,
}

// connect()
// Fires when user pushes the main connect button. If the user has requested,
// this will also fire when the nav.
// First it tries to see if 
export async function connect(): Promise<Connection> {
	try {
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

		secret.set({ client: secretjs });
		sessionStorage.setItem("keplr-connected", "true")
		return { address: myAddress, client: secretjs, err: null, msg: "Success"}
	} catch (err) {
		const address = ""
		return { address, client: null, err: "Couldn't connect to Keplr", msg: null };
	}
}