import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { SecretNetworkClient } from 'secretjs';
import type { Bookmark, Contribution, PathwayRequest, User } from './models/index';

interface ContributionStore {
	data: Array<Contribution>;
}

interface BookmarkStore {
	data: Array<Bookmark>;
}

interface SecretClientStore {
	client: SecretNetworkClient | null;
}

export const secret: Writable<SecretClientStore> = writable({ client: null });
export const user: Writable<User> = writable({ id: 0, address: '' });
export const bookmarks: Writable<BookmarkStore> = writable({ data: [] });
export const contributions: Writable<ContributionStore> = writable({ data: [] });
export const pathwayRequest: Writable<PathwayRequest> = writable({
	title: '',
	contributor: -1,
	description: '',
	difficulty: '',
	lessons: []
} as PathwayRequest)