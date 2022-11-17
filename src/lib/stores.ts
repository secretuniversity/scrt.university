import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { SecretNetworkClient } from 'secretjs';
import type {
	Article,
	ArticleRequest,
	Bookmark,
	Bounty,
	Contributor,
	Contribution,
	Pathway,
	PathwayRequest,
	User,
	Repo,
	Tag,
	SecretBox,
	Video
} from './models/index';

export interface Notification {
	id: number;
	message: string;
	status: 'success' | 'error' | 'info';
	loading: boolean;
	close: boolean;
}

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

interface ArticlesStore {
	val: Article[];
	exp: number;
}

interface VideosStore {
	val: Video[];
	exp: number;
}

interface ResourceTagsStore {
	val: Tag[];
	exp: number;
}

interface ReposStore {
	val: Repo[];
	exp: number;
}

interface BoxesStore {
	val: SecretBox[];
	exp: number;
}

export const notificationsStore: Writable<Notification[]> = writable([]);
export const secretStore: Writable<SecretStore | null> = writable(null);
export const bountiesStore: Writable<BountiesStore | null> = writable(null);

// Dashboard stores
export const userStore: Writable<UserStore | null> = writable(null);
export const bookmarksStore: Writable<BookmarksStore | null> = writable(null);
export const contributionsStore: Writable<ContributionsStore | null> = writable(null);
export const contributorStore: Writable<ContributorStore | null> = writable(null);

// Resources stores
export const videosStore: Writable<VideosStore | null> = writable(null);
export const articlesStore: Writable<ArticlesStore | null> = writable(null);
export const resourceTagsStore: Writable<ResourceTagsStore | null> = writable(null);

// Repos stores
export const reposStore: Writable<ReposStore | null> = writable(null);
export const boxesStore: Writable<BoxesStore | null> = writable(null);

// Page state stores
export const selectedArticle: Writable<Article | null> = writable(null);
export const selectedVideo: Writable<Video | null> = writable(null);
export const selectedSecretBox: Writable<SecretBox | null> = writable(null);
export const selectedPathway: Writable<Pathway | null> = writable(null);

export const pathwayRequest: Writable<PathwayRequest> = writable({
	title: '',
	contributor: -1,
	description: '',
	difficulty: '',
	lessons: []
});

export const articleRequest: Writable<ArticleRequest> = writable({
	title: '',
	contributor: -1,
	description: '',
	content: '',
	tags: []
});
