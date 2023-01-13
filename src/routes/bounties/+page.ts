import type { PageLoad } from './$types';

export const load: PageLoad<PageData> = async () => {
	return {
		title: 'Bounties',
		description:
			"Learn how to build decentralized applications on Secret University's bounty page. Find and complete bounties to earn rewards."
	};
};
