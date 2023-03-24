import { getBaseAPIUrl } from '$lib/helpers';
import type { PageLoad } from './$types';

export const load: PageLoad<Page.Base> = async ({ params, fetch }) => {
	const box = await loadSecretBox(params.id, fetch);
	box.kind = 'secret-box';

	return {
		title: 'Update Your Secret Box',
		description:
			'Welcome to Secret University, your destination for learning how to develop decentralized applications on Secret Network.',
		box
	};
};

async function loadSecretBox(id: string, fetch: FetchFn): Promise<Contributions.SecretBox.Self> {
	const res = await fetch(getBaseAPIUrl() + '/v1/secret-boxes/' + id);
	const json = await res.json();

	return json as Contributions.SecretBox.Self;
}
