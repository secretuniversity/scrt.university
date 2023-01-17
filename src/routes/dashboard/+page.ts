import type { PageLoad } from './$types';

export const load: PageLoad<Page.Base> = async () => {
	return {
		title: 'Dashboard',
		description:
			"Stay organized and on track with your decentralized app development journey on Secret University's dashboard page."
	};
};
