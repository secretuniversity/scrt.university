import { getBaseAPIUrl } from '$lib/helpers';
import { pathwayCursor } from '$lib/stores';
import type { PageLoad } from './$types';

export const load: PageLoad<Page.Pathway> = async ({ params, fetch }) => {
	const pathway = await loadPathway(params.id, fetch);
	pathway.kind = 'pathway';

	return {
		title: 'Update Your Pathway',
		description:
			'Welcome to Secret University, your destination for learning how to develop decentralized applications on Secret Network.',
		pathway
	};
};

async function loadPathway(id: string, fetch: FetchFn): Promise<Contributions.Pathway.Self> {
	pathwayCursor.subscribe((p) => {
		if (p && p.lessons) {
			p.lessons.forEach((lesson: Contributions.Pathway.Lesson) => {
				if (!lesson.quizzes) {
					lesson.quizzes = [];
				}
			});

			return {
				title: p.title,
				description: p.description,
				pathway: p
			};
		}
	});

	const res = await fetch(getBaseAPIUrl() + '/v1/pathways/' + id);
	const json = await res.json();
	const pathway = json as Contributions.Pathway.Self;

	if (pathway.lessons) {
		pathway.lessons.forEach((lesson: Contributions.Pathway.Lesson) => {
			if (!lesson.quizzes) {
				lesson.quizzes = [];
			}
		});
	}

	pathwayCursor.set(json);

	return json as Contributions.Pathway.Self;
}
