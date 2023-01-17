import { getBaseAPIUrl } from '$lib/helpers';
import type { PageLoad } from './$types';
import { selectedArticle } from '$lib/stores';

export const load: PageLoad<Page.Article> = async ({ params }) => {
	const article = await loadArticle(params.id, fetch);

	return {
		title: article.title,
		description: article.description,
		article
	};
};

async function loadArticle(id: string, fetch: FetchFn): Promise<Contributions.Article.Self> {
	selectedArticle.subscribe((article) => {
		if (article) {
			return {
				title: article.title,
				description: article.description,
				article: article
			};
		}
	});

	const res = await fetch(getBaseAPIUrl() + '/v1/articles/' + id);
	const json = await res.json();

	selectedArticle.set(json);

	return json as Contributions.Article.Self;
}
