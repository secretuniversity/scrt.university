import type { PageLoad } from './$types';

export const load: PageLoad<PageData> = async () => {
	return {
		title: 'Home',
		description:
			'Welcome to Secret University, your destination for learning how to develop decentralized applications on Secret Network.'
	};
};
