import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getBaseAPIUrl } from '$lib/helpers';
import { json } from 'stream/consumers';

export const load: PageLoad<PageData> = async ({ params, fetch }) => {
	try {
		const res = await fetch(getBaseAPIUrl() + '/v1/pathways/' + params.id);
		const json = await res.json();
	} catch (e) {
		throw error(404);
	}

	return {
		title: 'Home',
		description:
			'Welcome to Secret University, your destination for learning how to develop decentralized applications on Secret Network.'
	};
};
