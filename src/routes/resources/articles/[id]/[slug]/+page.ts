import { getBaseAPIUrl } from '$lib/helpers';
import type { PageLoad } from './$types';

export const load: PageLoad<Page.Article> = async ({ params, fetch }) => {
	const article = await loadArticle(params.id, fetch);

	return {
		title: article.title,
		description: article.description,
		article
	};
};

async function loadArticle(id: string, fetch: FetchFn): Promise<Contributions.Article.Self> {
	const res = await fetch(getBaseAPIUrl() + '/v1/articles/' + id);
	const json = await res.json();

	return json as Contributions.Article.Self;
}
