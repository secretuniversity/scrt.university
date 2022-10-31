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

interface Notification {
	msg: string;
	hasError: boolean;
	loading: boolean;
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

export const notification: Writable<Notification | null> = writable(null);
export const secret: Writable<SecretStore | null> = writable(null);
export const user: Writable<UserStore | null> = writable(null);
export const bookmarks: Writable<BookmarksStore | null> = writable(null);
export const contributions: Writable<ContributionsStore | null> = writable(null);
export const bounties: Writable<BountiesStore | null> = writable(null);
export const articles: Writable<ArticlesStore | null> = writable(null);
export const repos: Writable<ReposStore | null> = writable(null);
export const boxes: Writable<BoxesStore | null> = writable(null);
export const videos: Writable<VideosStore | null> = writable(null);
export const contributor: Writable<ContributorStore | null> = writable(null);
export const resourceTags: Writable<ResourceTagsStore | null> = writable(null);
export const article: Writable<Article | null> = writable(null);
export const video: Writable<Video | null> = writable(null);
export const secretBox: Writable<SecretBox | null> = writable(null);
export const pathway: Writable<Pathway | null> = writable(null);
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
