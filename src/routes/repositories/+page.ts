import type { PageLoad } from './$types';

export const load: PageLoad<PageData> = async () => {
	return {
		title: 'Repositories',
		description:
			"Find and contribute to decentralized app development projects on Secret University's repositories page."
	};
};
