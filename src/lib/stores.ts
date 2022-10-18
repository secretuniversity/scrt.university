import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { SecretNetworkClient } from 'secretjs';
import type {
	Bookmark,
	Bounty,
	Contributor,
	Contribution,
	PathwayRequest,
	User
} from './models/index';

interface SecretStore {
	val: SecretNetworkClient;
	exp: number;
}

interface UserStore {
	val: User;
	exp: number;
}

interface BookmarksStore {
	val: Bookmark[];
	exp: number;
}

interface ContributionsStore {
	val: Contribution[];
	exp: number;
}

interface BountiesStore {
	val: Bounty[];
	exp: number;
}

interface ContributorStore {
	val: Contributor;
	exp: number;
}

export const secret: Writable<SecretStore | null> = writable(null);
export const user: Writable<UserStore | null> = writable(null);
export const bookmarks: Writable<BookmarksStore | null> = writable(null);
export const contributions: Writable<ContributionsStore | null> = writable(null);
export const bounties: Writable<BountiesStore | null> = writable(null);
export const contributor: Writable<ContributorStore | null> = writable(null);
export const pathwayRequest: Writable<PathwayRequest> = writable({
	title: '',
	contributor: -1,
	description: '',
	difficulty: '',
	lessons: []
});
