import { getBaseAPIUrl } from '$lib/helpers';
import type { PageLoad } from './$types';

export const load: PageLoad<Page.Repositories> = async ({ fetch }) => {
	const repos = await fetchRepos(fetch);
	const secretBoxes = await fetchSecretBoxes(fetch);
	return {
		title: 'Repositories',
		description:
			"Find and contribute to decentralized app development projects on Secret University's repositories page.",
		repos,
		secretBoxes
	};
};

async function fetchRepos(fetch: FetchFn): Promise<Contributions.Repo.Self[]> {
	const response = await fetch(getBaseAPIUrl() + `/v1/repos?limit=100&offset=0`);
	const repos = await response.json();

	return repos as Contributions.Repo.Self[];
}

async function fetchSecretBoxes(fetch: FetchFn): Promise<Contributions.SecretBox.Self[]> {
	const response = await fetch(getBaseAPIUrl() + `/v1/secret-boxes?limit=100&offset=0`);
	const boxes = await response.json();

	boxes.forEach((box: Contributions.SecretBox.Self) => {
		box.kind = 'secret-box';
	});

	return boxes as Contributions.SecretBox.Self[];
}

// async function getRepoTags(): Promise<Array<Tag>> {
// 	return new Promise((res, rej) => {
// 		fetch('/api/v1/tags/kind/repo/offset/0')
// 			.then((response) => response.json())
// 			.then((data) => res(data as Array<Tag>));
// 	});
// }

// async function getBoxesTags(): Promise<Array<Tag>> {
// 	return new Promise((res, rej) => {
// 		fetch('/api/v1/tags/kind/secret_box/offset/0')
// 			.then((response) => response.json())
// 			.then((data) => res(data as Array<Tag>));
// 	});
// }
