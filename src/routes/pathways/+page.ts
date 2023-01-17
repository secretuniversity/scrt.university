import { getBaseAPIUrl } from '$lib/helpers';
import type { PageLoad } from './$types';

export const load: PageLoad<Page.Pathways> = async ({ fetch }) => {
	const pathways = await loadPathways(fetch);

	return {
		title: 'Pathways',
		description:
			"Learn to develop private smart contracts on Secret University by following along to Secret University's Pathways. Earn certification upon completion and collect your Secret NFT badges.",
		pathways
	};
};

async function loadPathways(fetch: FetchFn): Promise<Contributions.Pathway.Self[]> {
	const res = await fetch(getBaseAPIUrl() + '/v1/pathways');
	const json = await res.json();

	return json as Contributions.Pathway.Self[];
}
