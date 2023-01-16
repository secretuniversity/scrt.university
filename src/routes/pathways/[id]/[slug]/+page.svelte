<script lang="ts">
	import LeftArrowIcon from '$lib/assets/left_arrow.svg';
	import RightArrowIcon from '$lib/assets/right_arrow.svg';
	import { afterUpdate, onMount, tick } from 'svelte';
	import { notes, selectedPathway } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { getBaseAPIUrl, getNotification } from '$lib/helpers';
	import { page } from '$app/stores';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/tokyo-night-dark.css';
	import '$lib/styles/markdown.scss';

	type Module = Contributions.Pathway.Lesson | Contributions.Pathway.Quiz;

	let modules = [] as Module[];
	let moduleIndex = 0;
	$: currentModule = modules[moduleIndex];

	async function handleFetch() {
		const api = getBaseAPIUrl() + '/v1/pathways/' + $page.params.id;
		const res = await fetch(api);
		const json = await res.json();

		if (Object.keys(json).length === 0) {
			$notes = [...$notes, getNotification('Unable to find article', 'error')];

			goto('/pathways');

			return;
		} else {
			$selectedPathway = json;
		}
	}

	function makeModules() {
		if (!$selectedPathway) return;

		$selectedPathway.lessons.forEach((lesson: Contributions.Pathway.Lesson) => {
			lesson.kind = 'lesson';
			modules = [...modules, lesson];

			if (lesson.quizzes) {
				lesson.quizzes.forEach((quiz: Module) => {
					quiz.kind = 'quiz';
					modules = [...modules, quiz];
				});
			}
		});
	}

	afterUpdate(async () => {
		await tick();
		hljs.highlightAll();
	});

	onMount(async () => {
		if (!$selectedPathway) {
			await handleFetch();

			if (!$selectedPathway) return;
		}

		if ($selectedPathway.lessons) {
			$selectedPathway.lessons.forEach((lesson: Contributions.Pathway.Lesson) => {
				if (!lesson.quizzes) {
					lesson.quizzes = [];
				}
			});
		}

		makeModules();

		await tick();
		hljs.highlightAll();
	});

	function goBack() {
		if (!$selectedPathway) return;

		if (moduleIndex > 0) {
			moduleIndex--;
		} else {
			$notes = [...$notes, getNotification('You are at the beginning of the pathway', 'info')];
		}

		scrollTo(0, 0);
	}

	async function goForward() {
		if (!$selectedPathway) return;

		if (moduleIndex < modules.length - 1) {
			moduleIndex++;
		} else {
			$notes = [...$notes, getNotification('You have completed the pathway!', 'success')];
		}

		scrollTo(0, 0);
	}

	function checkAnswer(i: number) {
		if (currentModule.kind === 'quiz') {
			if (i === currentModule.answer) {
				$notes = [...$notes, getNotification("That's correct!", 'success')];
				goForward();
			} else {
				$notes = [
					...$notes,
					getNotification("Sorry! That's not quite right! Please try again.", 'error')
				];
			}
		}
	}

	function getQuizNumber(n: number) {
		const quizIndexes = modules.map((m, i) => {
			if (m.kind === 'quiz') return i;
			return null;
		});

		const clean = quizIndexes.filter((i) => i !== null);
		return clean.indexOf(n) + 1;
	}

	function getLessonNumber(n: number) {
		const lessonIndexes = modules.map((m, i) => {
			if (m.kind === 'lesson') return i;
			return null;
		});

		const clean = lessonIndexes.filter((i) => i !== null);
		return clean.indexOf(n) + 1;
	}
</script>

<section class="mx-4 grid min-h-screen pb-36">
	<div class="mt-8 grid grid-cols-12 gap-x-4">
		<div class="col-span-3 pl-2">
			<!-- <Review /> -->
			<!-- Pathway Map Header  -->
			<div class="mt-4 flex rounded-t-xl bg-dark-4 px-8 py-4">
				<h2 class="text-lg font-bold text-white">Pathway Map</h2>
				<!-- <p class="grow self-center text-right text-off-white">
					<span class="text-gray">{progressCount}</span> / {totalObjectives}
				</p> -->
			</div>

			{#each modules as m, i}
				{#if m.kind === 'lesson'}
					<div
						on:keypress={(e) => {
							if (e.key === 'Enter') {
								moduleIndex = i;
								scrollTo(0, 0);
							}
						}}
						on:click={() => {
							moduleIndex = i;
							scrollTo(0, 0);
						}}
						class="min-h-22 mt-1 grid grid-cols-5 grid-rows-2 p-4 {i === moduleIndex
							? 'border-l-8 border-dark-blue bg-dark-5'
							: 'bg-dark-4'} cursor-pointer hover:bg-dark-5"
					>
						<p
							class="col-span-full col-start-1 row-span-1 self-center text-sm italic text-off-white"
						>
							Lesson {getLessonNumber(i)}
						</p>
						<p class="col-span-full col-start-1 self-center font-semibold text-white">
							{m.name}
						</p>
					</div>
				{:else if m.kind === 'quiz'}
					<div
						on:keypress={(e) => {
							if (e.key === 'Enter') {
								moduleIndex = i;
								scrollTo(0, 0);
							}
						}}
						on:click={() => {
							moduleIndex = i;
							scrollTo(0, 0);
						}}
						class="min-h-22 mt-1 grid grid-cols-5 {i === moduleIndex
							? 'border-l-8 border-dark-blue bg-dark-5'
							: 'bg-dark-4'} cursor-pointer p-4 hover:bg-dark-5"
					>
						<p class="col-span-full col-start-1 self-center font-semibold text-white">
							Quiz {getQuizNumber(i)}
						</p>
					</div>
				{/if}
			{/each}

			<!-- Pathway Map Footer -->
			<div
				class="mt-1 h-10 rounded-b-xl bg-dark-4 px-8 py-4 text-center text-off-white underline"
			/>
		</div>

		<div class="col-span-full col-start-4">
			<div class="max-h-content grid grid-cols-10 rounded-lg pb-24">
				<div
					class="sticky top-0 flex h-home-hero cursor-pointer items-center justify-self-center p-4"
					on:keypress={(e) => {
						if (e.key === 'Enter') {
							goBack();
						}
					}}
					on:click={() => goBack()}
				>
					<img class="h-8 w-auto" src={LeftArrowIcon} alt="Left reading arrow" />
				</div>
				<div class="col-span-8 col-start-2">
					{#if modules.length !== 0}
						{#if currentModule.kind === 'lesson'}
							<h1 class="my-12 text-4xl font-bold text-white">
								{currentModule.name}
							</h1>

							<div class="markdown text-white">
								{@html currentModule.content}
							</div>
						{/if}

						{#if currentModule.kind === 'quiz'}
							<h1 class="my-8 p-4 text-3xl font-bold text-white">Quiz</h1>
							<p class="mx-auto mb-32 max-w-xl p-4 text-center text-xl text-white">
								{currentModule.question}
							</p>

							<div class="justify-content-center grid grid-cols-2 gap-4">
								{#each currentModule.options as o, k}
									<div
										on:keypress={(e) => {
											if (e.key === 'Enter') {
												checkAnswer(k);
											}
										}}
										on:click={() => checkAnswer(k)}
										class="markdown cursor-pointer rounded-md bg-dark-4 py-8 px-12 text-center text-white shadow-lg hover:bg-dark-5"
									>
										<p class="mb-6 text-left text-sm font-semibold">Option {k + 1}</p>
										{@html o.content}
									</div>
								{/each}
							</div>
						{/if}
					{/if}
				</div>

				<div
					on:keypress={(e) => {
						if (e.key === 'Enter') {
							goForward();
						}
					}}
					class="sticky top-0 flex h-home-hero cursor-pointer items-center justify-self-center p-4"
					on:click={() => goForward()}
				>
					<img class="h-8 w-auto" src={RightArrowIcon} alt="Right reading arrow" />
				</div>
			</div>
		</div>
	</div>
</section>
