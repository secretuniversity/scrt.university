import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const notes: Writable<Note[]> = writable([]);
export const secretClient: Writable<Stores.SecretClient | null> = writable(null);
export const bounties: Writable<Stores.Bounties | null> = writable(null);

export const user: Writable<Stores.User | null> = writable(null);
// export const bookmarksStore: Writable<Stores.Bookmarks | null> = writable(null);
export const contributions: Writable<Stores.Contributions | null> = writable(null);
// export const contributorStore: Writable<ContributorStore | null> = writable(null);

export const videos: Writable<Stores.Videos | null> = writable(null);
export const articles: Writable<Stores.Articles | null> = writable(null);
export const resourceTags: Writable<Stores.ResourceTags | null> = writable(null);

export const repos: Writable<Stores.Repos | null> = writable(null);
export const boxes: Writable<Stores.Boxes | null> = writable(null);

export const selectedArticle: Writable<Contributions.Article.Self | null> = writable(null);
export const selectedVideo: Writable<Contributions.Video.Self | null> = writable(null);
export const selectedSecretBox: Writable<Contributions.SecretBox.Self | null> = writable(null);
export const selectedPathway: Writable<Contributions.Pathway.Self | null> = writable(null);

export const pathwayRequest: Writable<Contributions.Pathway.PathwayRequest> = writable({
	title: '',
	contributor: -1,
	description: '',
	difficulty: '',
	lessons: []
});

export const articleRequest: Writable<Contributions.Article.ArticleRequest> = writable({
	title: '',
	contributor: -1,
	description: '',
	content: '',
	tags: []
});

export const contributorModal: Writable<boolean> = writable(false);
