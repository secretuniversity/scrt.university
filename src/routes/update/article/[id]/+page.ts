import { getBaseAPIUrl } from '$lib/helpers';
import type { PageLoad } from './$types';

export const load: PageLoad<Page.Article> = async ({ params, fetch }) => {
	const article = await loadArticle(params.id, fetch);
	return {
		title: 'Update Your Article',
		description:
			'Welcome to Secret University, your destination for learning how to develop decentralized applications on Secret Network.',
		article
	};
};

async function loadArticle(id: string, fetch: FetchFn): Promise<Contributions.Article.Self> {
	const res = await fetch(getBaseAPIUrl() + '/v1/articles/' + id);
	const json = await res.json();

	return json as Contributions.Article.Self;
}
