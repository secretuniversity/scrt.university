<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import TipTap from '$lib/components/TipTap.svelte';
	import EditIcon from '$lib/assets/edit_icon.svg';
	import TrashIcon from '$lib/assets/trash_icon.svg';
	import { pathwayRequest, userStore, notificationsStore } from '$lib/stores';
	import type { LessonRequest, QuizOptionRequest, QuizRequest } from '$lib/models';
	import { getNotification, getBaseAPIUrl, getLessonBaseContent, loadJWT } from '$lib/helpers';
	import { goto } from '$app/navigation';

	const pageTitle = 'Submit A Pathway';
	const pageDescription =
		'Pathways are courses that teach the technicals of development on Secret. Read our standards and guidelines for submitting a pathway to craft the perfect course.';
	const breadcrumbRoutes = [
		{
			name: 'Dashboard',
			path: '/dashboard'
		},
		{
			name: 'Submit',
			path: '/submit'
		},
		{
			name: 'Pathway',
			path: '/submit/pathway'
		}
	];

	const maxAnswers = 5;

	let currentLessonIndex = -1;
	let currentQuizIndex = -1;

	let menu = 'pathway';

	const editorOffset = 16; // 1rem
	let formHeight = 0;
	let scrollY = 0;
	let editorHeight = 0;
	let editor: HTMLElement | null = null;

	$: {
		if (scrollY > editorHeight - editorOffset) {
			if (editor && editor.style.paddingTop === '') {
				editor.style.paddingTop = '1rem';
			}
		} else {
			if (editor && editor.style.paddingTop === '1rem') {
				editor.style.paddingTop = '';
			}
		}
	}

	async function submit() {
		const token = loadJWT('user');

		if (!token || !$userStore) {
			$notificationsStore = [
				...$notificationsStore,
				getNotification('You must be logged in to submit a pathway.', 'error')
			];
			return;
		}

		$pathwayRequest.contributor = $userStore.val.id;

		try {
			const url = getBaseAPIUrl() + '/v1/pathways';
			const res = await fetch(url, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify($pathwayRequest)
			});

			if (res.status === 200) {
				$notificationsStore = [
					...$notificationsStore,
					getNotification('Pathway submitted successfully!', 'success')
				];

				goto('/dashboard');
			} else {
				$notificationsStore = [
					...$notificationsStore,
					getNotification('There was an error submitting your pathway.', 'error')
				];
			}
		} catch (err) {
			$notificationsStore = [...$notificationsStore, getNotification(err as string, 'error')];
		}
	}

	function loadDraft() {
		console.log('load draft');
	}

	function saveDraft() {
		console.log('save draft');
	}

	function addNewLesson() {
		const l: LessonRequest = {
			name: 'New Lesson',
			content: '',
			quizzes: []
		};

		$pathwayRequest.lessons = [...$pathwayRequest.lessons, l];
	}

	function addNewQuiz() {
		const q: QuizRequest = {
			question: '',
			answer: -1,
			hint: '',
			options: []
		};

		let quizzes = $pathwayRequest.lessons[currentLessonIndex].quizzes;

		$pathwayRequest.lessons[currentLessonIndex].quizzes = [...quizzes, q];
	}

	function addNewAnswer() {
		const options = $pathwayRequest.lessons[currentLessonIndex].quizzes[currentQuizIndex].options;

		if (options.length > maxAnswers) {
			$notificationsStore = [
				...$notificationsStore,
				getNotification('You cannot have more than 5 answers.', 'error')
			];
			return;
		}

		const o: QuizOptionRequest = {
			content: ''
		};

		$pathwayRequest.lessons[currentLessonIndex].quizzes[currentQuizIndex].options = [...options, o];
	}

	function changeMenu(str: string) {
		if (str !== 'pathway' && str !== 'lesson' && str !== 'quiz') {
			return;
		}

		menu = str;
		scrollY = Math.abs(scrollY - formHeight / 6);
	}

	function getIndexAsLetter(n: number) {
		switch (n) {
			case 0:
				return 'A';
			case 1:
				return 'B';
			case 2:
				return 'C';
			case 3:
				return 'D';
			case 4:
				return 'E';
			default:
				return 'A';
		}
	}

	function handleQuizOptionContentChange(content: string, i: number) {
		$pathwayRequest.lessons[currentLessonIndex].quizzes[currentQuizIndex].options[i].content =
			content;
	}

	function handleLessonContentChange(e: CustomEvent<{ content: string }>) {
		$pathwayRequest.lessons[currentLessonIndex].content = e.detail.content;
	}
</script>

<svelte:window bind:scrollY />

<Head {pageTitle} />

<section class="mx-auto w-11/12 py-8">
	<Breadcrumb routes={breadcrumbRoutes} />
	<PageHeader title={pageTitle} description={pageDescription} />
</section>

<section
	bind:clientHeight={formHeight}
	class="mx-auto grid min-h-screen w-11/12 grid-cols-3 gap-x-6 gap-y-4 pt-8 pb-32"
>
	<div class="h-fit flex-col space-y-4">
		{#if menu === 'pathway'}
			<h2 class="mb-8 w-full rounded-t-md bg-dark-4 px-6 py-4 text-lg font-semibold text-white">
				Create Your Pathway
			</h2>
			<label for="title" class="block text-sm font-medium text-white">Title</label>
			<div>
				<input
					bind:value={$pathwayRequest.title}
					type="text"
					name="title"
					id="title"
					class="block w-full rounded-md border-white bg-dark-3 text-white shadow-sm"
					placeholder="(e.g. 'Building Private Oracle Smart Contracts)'"
				/>
			</div>

			<label for="description" class="block text-sm font-medium text-white">Description</label>
			<div>
				<textarea
					name="description"
					id="description"
					bind:value={$pathwayRequest.description}
					class="block h-28 w-full resize-none rounded-md border-white bg-dark-3 text-white shadow-sm"
					placeholder="Tell your students what they can expect to learn from your pathway..."
				/>
			</div>

			<label for="difficulty" class="block text-sm font-medium text-white">Difficulty</label>
			<select
				bind:value={$pathwayRequest.difficulty}
				id="difficulty"
				name="difficulty"
				class="mt-1 block w-full rounded-md border-2 border-white bg-dark-3 py-2 pl-3 pr-10 text-base text-white focus:border-dark-blue focus:outline-none focus:ring-dark-blue"
			>
				<option value="introductory" selected>Introductory</option>
				<option value="intermediate">Intermediate</option>
				<option value="Advanced">Advanced</option>
			</select>

			<label for="lessons" class="block text-sm font-medium text-white">Lessons</label>

			<div class="grid h-max justify-items-center">
				<button
					on:click={() => addNewLesson()}
					class="w-max rounded-md bg-dark-5 px-16 py-2 text-white">Add a New Lesson +</button
				>
			</div>

			<div id="lessons" class="grid min-h-[24rem]">
				{#if $pathwayRequest.lessons.length === 0}
					<p for="lessons" class="block self-center text-center text-sm font-medium text-dark-5">
						Your pathway currently has no lessons.
					</p>
				{/if}

				<div class="h-full w-full flex-col">
					{#each $pathwayRequest.lessons as l, i}
						<div
							class="mb-2 grid h-max w-full grid-cols-2 grid-rows-1 items-center rounded-md bg-dark-4 py-4 px-6 text-white"
						>
							<p class="inline-block">
								<span class="mr-2 inline-block text-off-white">{i + 1}</span>
								<span class="font-semibold">{l.name}</span>
							</p>

							<div class="flex justify-self-end">
								<button
									class="mr-2 rounded-md bg-dark-3 p-1.5"
									on:click={() => {
										currentLessonIndex = i;
										changeMenu('lesson');
									}}
								>
									<div class="flex items-center">
										<span>Edit</span>
										<img class="ml-2 inline-block h-5 w-5" src={EditIcon} alt="Edit lesson" />
									</div>
								</button>
								<button
									class="rounded-md bg-dark-red p-1.5"
									on:click={() => {
										$pathwayRequest.lessons = $pathwayRequest.lessons.filter((_, j) => j !== i);
									}}
								>
									<img class="h-5 w-5" src={TrashIcon} alt="Remove lesson" />
								</button>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{:else if menu === 'lesson'}
			<div
				class="mb-8 grid w-full auto-cols-max grid-cols-2 items-center rounded-t-md bg-dark-4 px-4 py-4 text-white"
			>
				<h2 class="text-lg font-semibold">Create Your Lesson</h2>
				<button
					on:click={() => changeMenu('pathway')}
					class="justify-self-end rounded-md bg-dark-5 py-2 px-3">Back</button
				>
			</div>
			<label for="name" class="block text-sm font-medium text-white">Name</label>
			<div>
				<input
					type="text"
					name="name"
					id="name"
					bind:value={$pathwayRequest.lessons[currentLessonIndex].name}
					class="block w-full rounded-md border-white bg-dark-3 text-white shadow-sm"
					placeholder="Enter the name of your lesson..."
				/>
			</div>

			<label for="quizzes" class="block text-sm font-medium text-white">Quizzes (optional)</label>

			<div class="grid h-max justify-items-center">
				<button
					on:click={() => addNewQuiz()}
					class="w-max rounded-md bg-dark-5 px-16 py-2 text-white">Add a New Quiz +</button
				>
			</div>

			<div id="quizzes" class="grid min-h-[24rem]">
				{#if $pathwayRequest.lessons[currentLessonIndex].quizzes.length === 0}
					<p for="lessons" class="block self-center text-center text-sm font-medium text-dark-5">
						Your lesson currently has no quizzes.
					</p>
				{/if}

				<div class="h-full w-full flex-col">
					{#each $pathwayRequest.lessons[currentLessonIndex].quizzes as q, i}
						<div
							class="mb-2 grid h-max w-full grid-cols-2 grid-rows-1 items-center rounded-md bg-dark-4 py-4 px-6 text-white"
						>
							<p class="inline-block">
								<span class="mr-2 inline-block text-off-white">{i + 1}</span>
								<span class="font-semibold">New Quiz</span>
							</p>

							<div class="flex justify-self-end">
								<button
									class="mr-2 rounded-md bg-dark-3 p-1.5"
									on:click={() => {
										currentQuizIndex = i;
										changeMenu('quiz');
									}}
								>
									<div class="flex items-center">
										<span>Edit</span>
										<img class="ml-2 inline-block h-5 w-5" src={EditIcon} alt="Edit quiz" />
									</div>
								</button>
								<button
									class="rounded-md bg-dark-red p-1.5"
									on:click={() => {
										let quizzes = $pathwayRequest.lessons[currentLessonIndex].quizzes;
										$pathwayRequest.lessons[currentLessonIndex].quizzes = quizzes.filter(
											(_, j) => j !== i
										);
									}}
								>
									<img class="h-5 w-5" src={TrashIcon} alt="Remove lesson" />
								</button>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{:else if menu === 'quiz'}
			<div
				class="mb-8 grid w-full auto-cols-max grid-cols-2 items-center rounded-t-md bg-dark-4 px-4 py-4 text-white"
			>
				<h2 class="text-lg font-semibold">Create Your Quiz</h2>
				<button
					on:click={() => changeMenu('lesson')}
					class="justify-self-end rounded-md bg-dark-5 py-2 px-3">Back</button
				>
			</div>
			<label for="question" class="block text-sm font-medium text-white">Question</label>
			<div>
				<input
					type="text"
					name="question"
					id="question"
					bind:value={$pathwayRequest.lessons[currentLessonIndex].quizzes[currentQuizIndex]
						.question}
					class="block w-full rounded-md border-white bg-dark-3 text-white shadow-sm"
					placeholder="Enter your quiz question..."
				/>
			</div>

			<label for="hint" class="block text-sm font-medium text-white">Hint (optional)</label>
			<div>
				<input
					type="text"
					name="hint"
					id="hint"
					bind:value={$pathwayRequest.lessons[currentLessonIndex].quizzes[currentQuizIndex].hint}
					class="block w-full rounded-md border-white bg-dark-3 text-white shadow-sm"
					placeholder="Enter a hint for your quiz..."
				/>
			</div>

			<label for="answer" class="block text-sm font-medium text-white">Correct Answer</label>

			<select
				bind:value={$pathwayRequest.lessons[currentLessonIndex].quizzes[currentQuizIndex].answer}
				id="answer"
				name="answer"
				class="mt-1 block w-full rounded-md border-2 border-white bg-dark-3 py-2 pl-3 pr-10 text-base text-white focus:border-dark-blue focus:outline-none focus:ring-dark-blue"
			>
				{#each $pathwayRequest.lessons[currentLessonIndex].quizzes[currentQuizIndex].options as o, i}
					<option value={i}>{getIndexAsLetter(i)}</option>
				{/each}
			</select>

			<label for="options" class="block text-sm font-medium text-white">Answers</label>

			<div class="grid h-max justify-items-center">
				<button
					on:click={() => addNewAnswer()}
					class="w-max rounded-md bg-dark-5 px-16 py-2 text-white">Add a New Answer +</button
				>
			</div>

			<div id="quiz-options" class="grid min-h-[24rem]">
				{#if $pathwayRequest.lessons[currentLessonIndex].quizzes[currentQuizIndex].options.length === 0}
					<p for="options" class="block self-center text-center text-sm font-medium text-dark-5">
						Your quiz currently has no possible answers.
					</p>
				{/if}

				<div class="h-full w-full flex-col">
					{#each $pathwayRequest.lessons[currentLessonIndex].quizzes[currentQuizIndex].options as _, i}
						<div
							class="mb-2 grid h-max w-full grid-cols-2 grid-rows-1 items-center rounded-md bg-dark-4 py-4 px-6 text-white"
						>
							<p class="inline-block">
								<span>Option</span>
								<span class="mr-2 inline-block font-semibold text-off-white"
									>{getIndexAsLetter(i)}</span
								>
							</p>

							<div class="flex justify-self-end">
								<button
									class="rounded-md bg-dark-red p-1.5"
									on:click={() => {
										const options =
											$pathwayRequest.lessons[currentLessonIndex].quizzes[currentQuizIndex].options;
										$pathwayRequest.lessons[currentLessonIndex].quizzes[currentQuizIndex].options =
											options.filter((_, j) => j !== i);
									}}
								>
									<img class="h-5 w-5" src={TrashIcon} alt="Remove lesson" />
								</button>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<div class="grid w-full grid-cols-3 gap-x-2">
			<button
				on:click={submit}
				class="w-full rounded-md bg-dark-blue py-2 text-white hover:bg-darker-blue">Submit</button
			>
			<button
				on:click={saveDraft}
				class="w-full rounded-md bg-dark-5 py-2 text-white hover:bg-dark-4">Save Draft</button
			>
			<button
				on:click={loadDraft}
				class="w-full rounded-md bg-dark-5 py-2 text-white hover:bg-dark-4">Load Draft</button
			>
		</div>
	</div>

	<div
		id="editor-wrapper"
		bind:clientHeight={editorHeight}
		bind:this={editor}
		class="sticky top-0 col-span-full col-start-2 {menu === 'quiz' ? 'h-full' : 'h-[800px]'}"
	>
		{#if menu === 'pathway'}
			<div class="grid h-full w-full items-center justify-items-center rounded-md bg-dark-5">
				<p class="text-white">Create and edit a lesson to begin writing your pathway.</p>
			</div>
		{/if}
		{#if menu === 'lesson'}
			<div class="h-full overflow-hidden rounded-md border border-solid border-white text-white">
				<TipTap value={getLessonBaseContent()} on:update={handleLessonContentChange} />
			</div>
		{/if}

		{#if menu === 'quiz'}
			{#if $pathwayRequest.lessons[currentLessonIndex].quizzes[currentQuizIndex].options.length === 0}
				<div class="grid h-full w-full items-center justify-items-center rounded-md bg-dark-5">
					<p class="text-white">Add a possible answer for your question to edit your quiz.</p>
				</div>
			{/if}

			{#each $pathwayRequest.lessons[currentLessonIndex].quizzes[currentQuizIndex].options as _, i}
				<h3 class="mb-2 font-semibold text-white">Answer {getIndexAsLetter(i)}</h3>
				<div
					class="mb-4 h-[250px] overflow-hidden rounded-md border border-solid border-white text-white"
				>
					<TipTap
						value={'Enter your answer option here as <i>markdown</i>.'}
						on:update={(e) => {
							handleQuizOptionContentChange(e.detail.content, i);
						}}
					/>
				</div>
			{/each}
		{/if}
	</div>
</section>
