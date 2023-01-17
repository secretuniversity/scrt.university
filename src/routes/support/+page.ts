import type { PageLoad } from './$types';

export const load: PageLoad<Page.Base> = async () => {
	return {
		title: 'Support',
		description:
			"Get the support you need to succeed in decentralized app development on Secret University's support page."
	};
};
