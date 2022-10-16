import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { SecretNetworkClient } from 'secretjs';
import type { Bookmark, Contributor, Contribution, PathwayRequest, User } from './models/index';

export const secret: Writable<SecretNetworkClient | null> = writable(null);
export const user: Writable<User | null> = writable(null);
export const bookmarks: Writable<Bookmark[] | null> = writable(null);
export const contributions: Writable<Contribution[] | null> = writable(null);
export const contributor: Writable<Contributor | null> = writable(null);
export const pathwayRequest: Writable<PathwayRequest | null> = writable(null);
