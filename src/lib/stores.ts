import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { SecretNetworkClient } from 'secretjs';
import type { Bookmark } from './models/index'

interface UserStore {
	pubAddress: string | null,
	profileImgUrl: string | null,
	bookmarks: Array<Bookmark> | null
}


interface SecretClientStore {
	client: SecretNetworkClient | null;
}


export const secret: Writable<SecretClientStore> = writable({ client: null });
export const user: Writable<UserStore> = writable({ 
	pubAddress: null, 
	profileImgUrl: null, 
	bookmarks: null 
})