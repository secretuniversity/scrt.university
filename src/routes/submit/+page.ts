import type { PageLoad } from './$types';

export const load: PageLoad<Page.Base> = async () => {
	return {
		title: 'Submit',
		description:
			"Submit your decentralized app projects for feedback and recognition on Secret University's submit page"
	};
};
