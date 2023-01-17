import type { PageLoad } from './$types';

export const load: PageLoad<Page.Base> = async () => {
	return {
		title: 'Build',
		description:
			"Become a pro at building decentralized apps with Secret University's build page. Learn through hands-on experience and interactive tutorials."
	};
};
