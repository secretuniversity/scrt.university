import type { PageLoad } from './$types';

export const load: PageLoad<PageData> = async () => {
	return {
		title: 'Pathways',
		description:
			"Achieve your goals and become a decentralized app expert on Secret University's pathways page. Follow curated paths to success."
	};
};
