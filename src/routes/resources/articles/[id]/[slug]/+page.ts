import type { PageLoad } from './$types';

export const load: PageLoad<PageData> = async () => {
	return {
		title: 'Resources',
		description:
			"Access a wealth of resources on decentralized app development on Secret University's resources page."
	};
};
