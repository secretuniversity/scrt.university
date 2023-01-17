import type { PageLoad } from './$types';

export const load: PageLoad<Page.Base> = async () => {
	return {
		title: 'Learn',
		description:
			"Advance your blockchain development skills with Secret University's learn page. Access a wide range of resources and tutorials."
	};
};
