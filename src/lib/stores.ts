import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { SecretNetworkClient } from 'secretjs';

interface SecretClientWrapper {
	client: SecretNetworkClient | null;
}

export const secret: Writable<SecretClientWrapper> = writable({ client: null });
