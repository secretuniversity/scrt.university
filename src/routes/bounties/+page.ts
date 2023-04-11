import { getBaseAPIUrl } from '$lib/helpers';
import type { PageLoad } from './$types';

export const load: PageLoad<Page.Bounties> = async ({ fetch }) => {
	const communityBounties = await fetchCommunityBounties(fetch);
	const slabsBounties = await fetchSlabsBounties(fetch);

	return {
		title: 'Bounties',
		description:
			"Learn how to build decentralized applications on Secret University's bounty page. Find and complete bounties to earn rewards.",
		communityBounties,
		slabsBounties
	};
};

async function fetchCommunityBounties(fetch: FetchFn): Promise<Contributions.Bounty.Community[]> {
	const res = await fetch(getBaseAPIUrl() + `/v1/bounties`);
	const bounties = await res.json();

	return bounties as Contributions.Bounty.Community[];
}

async function fetchSlabsBounties(fetch: FetchFn): Promise<Contributions.Bounty.Slabs[]> {
	const res = await fetch(getBaseAPIUrl() + `/v1/slabs-bounties`);
	const bounties = await res.json();

	return bounties as Contributions.Bounty.Slabs[];
}
