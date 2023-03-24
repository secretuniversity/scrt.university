import { getBaseAPIUrl } from '$lib/helpers';
import type { PageLoad } from './$types';

export const load: PageLoad<Page.Video> = async ({ params, fetch }) => {
	const video = await fetchVideo(params.id, fetch);
	video.kind = 'video';

	return {
		title: video.title,
		description: video.description,
		video
	};
};

async function fetchVideo(id: string, fetch: FetchFn): Promise<Contributions.Video.Self> {
	const res = await fetch(getBaseAPIUrl() + `/v1/videos/${id}`);
	const json = await res.json();

	return json as Contributions.Video.Self;
}
