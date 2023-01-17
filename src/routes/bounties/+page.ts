import type { PageLoad } from './$types';
import { getBaseAPIUrl } from '$lib/helpers';

export const load: PageLoad<Page.Bounties> = async ({ fetch }) => {
	const bounties = await fetchBounties(fetch);

	return {
		title: 'Bounties',
		description:
			"Learn how to build decentralized applications on Secret University's bounty page. Find and complete bounties to earn rewards.",
		bounties
	};
};

async function fetchBounties(fetch: FetchFn): Promise<Contributions.Bounty.Self[]> {
	const res = await fetch(getBaseAPIUrl() + `/v1/bounties`);
	const bounties = await res.json();

	return bounties as Contributions.Bounty.Self[];
}
