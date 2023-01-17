import { getBaseAPIUrl } from '$lib/helpers';
import type { PageLoad } from './$types';
import { selectedPathway } from '$lib/stores';

export const load: PageLoad<Page.Pathway> = async ({ params, fetch }) => {
	const pathway = await loadPathway(params.id, fetch);

	return {
		title: pathway.title,
		description: pathway.description,
		pathway
	};
};

async function loadPathway(id: string, fetch: FetchFn): Promise<Contributions.Pathway.Self> {
	selectedPathway.subscribe((p) => {
		if (p) {
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

	pathway.lessons.forEach((lesson: Contributions.Pathway.Lesson) => {
		if (!lesson.quizzes) {
			lesson.quizzes = [];
		}
	});

	selectedPathway.set(json);

	return json as Contributions.Pathway.Self;
}
