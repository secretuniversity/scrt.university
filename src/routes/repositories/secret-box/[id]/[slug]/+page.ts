import { getBaseAPIUrl } from '$lib/helpers';
import type { PageLoad } from './$types';
import { selectedSecretBox } from '$lib/stores';

export const load: PageLoad<Page.SecretBox> = async ({ params, fetch }) => {
	const box = await loadSecretBox(params.id, fetch);

	return {
		title: box.title,
		description: box.description,
		box
	};
};

async function loadSecretBox(id: string, fetch: FetchFn): Promise<Contributions.SecretBox.Self> {
	selectedSecretBox.subscribe((box) => {
		if (box) {
			return {
				title: box.title,
				description: box.description,
				box
			};
		}
	});

	const res = await fetch(getBaseAPIUrl() + '/v1/secret-boxes/' + id);
	const json = await res.json();

	selectedSecretBox.set(json);

	return json as Contributions.SecretBox.Self;
}
