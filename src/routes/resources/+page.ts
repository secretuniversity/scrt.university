import { getBaseAPIUrl } from '$lib/helpers';
import type { PageLoad } from './$types';

export const load: PageLoad<Page.Resources> = async ({ fetch }) => {
	const articles = await fetchArticles(fetch);
	const videos = await fetchVideos(fetch);

	return {
		title: 'Resources',
		description:
			'Welcome to Secret University, your destination for learning how to develop decentralized applications on Secret Network.',
		resources: {
			articles,
			videos
		}
	};
};

async function fetchArticles(fetch: FetchFn): Promise<Contributions.Article.Self[]> {
	const res = await fetch(getBaseAPIUrl() + `/v1/articles?limit=25?offset=0`);
	const articles = await res.json();

	return articles as Contributions.Article.Self[];
}

async function fetchVideos(fetch: FetchFn): Promise<Contributions.Video.Self[]> {
	const res = await fetch(getBaseAPIUrl() + `/v1/videos?limit=25?offset=0`);
	const videos = await res.json();

	return videos as Contributions.Video.Self[];
}

// async function getArticleTags(): Promise<Tag[]> {
// 	return Promise.reject();
// }

// async function getVideoTags(): Promise<Tag[] | null> {
// 	return Promise.reject();
// }
