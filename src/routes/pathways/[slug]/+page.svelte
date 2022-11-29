<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import Review from '$lib/components/Review.svelte';
	import LeftArrowIcon from '$lib/assets/left_arrow.svg';
	import RightArrowIcon from '$lib/assets/right_arrow.svg';
	import { afterUpdate, onMount, tick } from 'svelte';
	import { notificationsStore, selectedPathway } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { getNotification } from '$lib/helpers';
	import hljs from 'highlight.js';
	import type { Lesson, Quiz } from '$lib/models/index';
	import 'highlight.js/styles/tokyo-night-dark.css';
	import '$lib/styles/markdown.scss';

	type View = 'lesson' | 'quiz';
	let view: View = 'lesson';

	let currentLesson: Lesson | null = null;
	let currentQuiz: Quiz | null = null;

	let lessonIndex = 0;
	let quizIndex = 0;
	let progressCount = 0;
	let totalObjectives = 0;
	let hasMounted = false;

	$: pageTitle = '' + ' | Pathways';

	$: selected = (l: number, q: number, v: string) => {
		if (v === 'lesson') {
			return l === lessonIndex && q === quizIndex && v === view;
		} else {
			return l + 1 === lessonIndex && q + 1 === quizIndex && v === view;
		}
	};

	afterUpdate(async () => {
		await tick();
		hljs.highlightAll();
	});

	onMount(() => {
		if (!$selectedPathway) {
			$notificationsStore = [
				...$notificationsStore,
				getNotification('Problem loading that pathway. Report it if you see this message.', 'error')
			];
			goto('/pathways');
			return;
		}

		$selectedPathway.lessons.forEach((lesson) => {
			if (!lesson.quizzes) {
				lesson.quizzes = [];
			}
		});

		console.log($selectedPathway);

		pageTitle = $selectedPathway.title + ' | Pathways';
		currentLesson = $selectedPathway.lessons[0];
		progressCount = 1;

		totalObjectives = $selectedPathway.lessons.length;
		for (const lesson of $selectedPathway.lessons) {
			totalObjectives += lesson.quizzes.length;
		}

		hljs.highlightAll();
		hasMounted = true;
	});

	function goBack() {
		if (!$selectedPathway) return;

		if (lessonIndex === 0 && quizIndex === 0) {
			return;
		}

		let hasChangedViews = false;

		if (view === 'lesson') {
			if (lessonIndex !== 0 && quizIndex === 0) {
				lessonIndex = lessonIndex - 1;
				currentLesson = $selectedPathway.lessons[lessonIndex];

				quizIndex = currentLesson.quizzes.length - 1;
				view = 'quiz';
				hasChangedViews = true;
			}
		}

		if (view === 'quiz' && !hasChangedViews) {
			if (quizIndex !== 0 && currentLesson) {
				quizIndex = quizIndex - 1;
				currentQuiz = currentLesson.quizzes[quizIndex];
			}

			if (quizIndex === 0) {
				view = 'lesson';
				lessonIndex = lessonIndex - 1;
			}
		}

		progressCount = progressCount - 1;
		hasChangedViews = false;
	}

	async function goForward() {
		if (!$selectedPathway) return;

		const hasLessons = $selectedPathway.lessons.length > lessonIndex;
		let hasQuizzes = false;

		if (!hasLessons) {
			hasQuizzes = $selectedPathway.lessons[lessonIndex - 1].quizzes.length > quizIndex;
		} else {
			hasQuizzes = $selectedPathway.lessons[lessonIndex].quizzes.length > quizIndex;
		}

		if (!hasLessons && !hasQuizzes) {
			$notificationsStore = [
				...$notificationsStore,
				getNotification('You have completed this pathway! Congratulations!', 'success')
			];
			return;
		}

		const quizzes = $selectedPathway.lessons[lessonIndex].quizzes;
		let hasChangedViews = false;

		if (view === 'lesson') {
			if (hasQuizzes) {
				currentQuiz = quizzes[quizIndex];

				lessonIndex = lessonIndex + 1;
				quizIndex = quizIndex + 1;

				view = 'quiz';
				hasChangedViews = true;
			}

			if (!hasQuizzes && hasLessons) {
				quizIndex = 0;
				currentLesson = $selectedPathway.lessons[lessonIndex];

				view = 'lesson';
			}
		}

		if (view === 'quiz' && !hasChangedViews) {
			if (hasQuizzes) {
				quizIndex = quizIndex + 1;
				currentQuiz = quizzes[quizIndex];
			}

			if (!hasQuizzes && hasLessons) {
				lessonIndex = lessonIndex + 1;
				quizIndex = 0;

				currentLesson = $selectedPathway.lessons[lessonIndex];

				view = 'lesson';
			} else if (!hasQuizzes && !hasLessons) {
				lessonIndex = lessonIndex + 1;
			}
		}

		hasChangedViews = false;
		progressCount = progressCount + 1;

		await tick();
	}

	function setCurrentLesson(l: number, q: number, lesson: Lesson) {
		lessonIndex = l;
		quizIndex = q;
		currentLesson = lesson;
		view = 'lesson';
	}

	function setCurrentQuiz(l: number, q: number, quiz: Quiz) {
		lessonIndex = l + 1;
		quizIndex = q + 1;
		currentQuiz = quiz;
		view = 'quiz';
	}

	function checkAnswer(i: number) {
		if (!currentQuiz) return;

		if (i === currentQuiz.answer) {
			$notificationsStore = [...$notificationsStore, getNotification("That's correct!", 'success')];
			goForward();
		} else {
			$notificationsStore = [
				...$notificationsStore,
				getNotification("Sorry! That's not quite right! Please try again.", 'error')
			];
		}
	}
</script>

<Head {pageTitle} />

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

			{#if $selectedPathway && hasMounted}
				{#each $selectedPathway.lessons as l, j}
					<div
						class="min-h-22 mt-1 grid grid-cols-5 grid-rows-2 p-4 {selected(j, 0, 'lesson')
							? 'border-l-8 border-dark-blue bg-dark-5'
							: 'bg-dark-4'} cursor-pointer hover:bg-dark-5"
						on:click={(e) => setCurrentLesson(j, 0, l)}
					>
						<p
							class="col-span-full col-start-1 row-span-1 self-center text-sm italic text-off-white"
						>
							Lesson {j + 1}
						</p>
						<p class="col-span-full col-start-1 self-center font-semibold text-white">
							{l.name}
						</p>
					</div>

					{#each l.quizzes as q, i}
						<div
							class="min-h-22 mt-1 grid grid-cols-5 grid-rows-2 {selected(j, i, 'quiz')
								? 'border-l-8 border-dark-blue bg-dark-5'
								: 'bg-dark-4'} cursor-pointer p-4 hover:bg-dark-5"
							on:click={() => setCurrentQuiz(j, i, q)}
						>
							<p
								class="col-span-full col-start-1 row-span-1 self-center text-sm italic text-off-white"
							>
								Lesson {j + 1} Quiz {i + 1}
							</p>
							<p class="col-span-full col-start-1 self-center font-semibold text-white">
								Quiz {i + 1}
							</p>
						</div>
					{/each}
				{/each}
			{/if}

			<!-- Pathway Map Footer -->
			<div
				class="mt-1 h-10 rounded-b-xl bg-dark-4 px-8 py-4 text-center text-off-white underline"
			/>
		</div>

		<div class="col-span-full col-start-4">
			<div class="max-h-content grid grid-cols-10 rounded-lg pb-24">
				<div class="cursor-pointer self-center justify-self-center p-4" on:click={() => goBack()}>
					<img class="h-auto w-4" src={LeftArrowIcon} alt="Left reading arrow" />
				</div>
				<div class="col-span-8 col-start-2">
					{#if $selectedPathway}
						{#if view === 'lesson' && currentLesson}
							<!-- content here -->
							<h1 class="my-12 text-4xl font-bold text-white">
								{currentLesson.name}
							</h1>

							<div class="markdown text-white">
								{@html currentLesson.content}
							</div>
						{/if}

						{#if view === 'quiz' && currentQuiz}
							<h1 class="my-8 p-4 text-3xl font-bold text-white">Quiz #{quizIndex}</h1>
							<p class="mx-auto mb-32 max-w-xl p-4 text-center text-xl text-white">
								{currentQuiz.question}
							</p>

							<div class="justify-content-center grid grid-cols-2 gap-4">
								{#each currentQuiz.options as o, k}
									<div
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
					class="cursor-pointer self-center justify-self-center p-4"
					on:click={() => goForward()}
				>
					<img class="h-auto w-4" src={RightArrowIcon} alt="Right reading arrow" />
				</div>
			</div>
		</div>
	</div>
</section>
