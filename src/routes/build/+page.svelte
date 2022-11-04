<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import GoldPot from '$lib/assets/illustrations/gold_pot.svg';
	import CodeImage from '$lib/assets/illustrations/code.svg';
	import TeachImage from '$lib/assets/illustrations/teach.svg';
	import EarnImage from '$lib/assets/illustrations/earn.svg';
	import { notification } from '$lib/stores';

	const pageTitle = 'Build';

	let isModalActive = false;

	let name = '';
	let skill = 'beginner';
	let reason = '';
	let discord = '';
	let email = '';

	async function submitContributorForm() {
		try {
			const res = await fetch('/api/v1/forms/contributor', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name,
					skill,
					reason,
					discord,
					email
				})
			});

			if (res.status === 200) {
				$notification = {
					msg: 'Thank you for your submission!',
					hasError: false,
					loading: false
				};
			} else {
				$notification = {
					msg: 'Failed to submit form',
					hasError: true,
					loading: false
				};
			}
		} catch (err) {
			$notification = {
				msg: 'Failed to submit form. Please try again soon.',
				hasError: true,
				loading: false
			};
		}
	}
</script>

<Head {pageTitle} />

<Modal active={isModalActive} on:hide={() => (isModalActive = false)}>
	<form class="grid grid-cols-1 text-white">
		<h2 class="mx-auto max-w-xs text-center text-2xl font-semibold">
			Become A Contributor for Secret University
		</h2>
		<p class="mx-auto mt-2 max-w-md text-center text-sm">
			Fill out the questions below and a leader of Secret University will process your request soon!
			Thank you for your interest in advancing private blockchain solutions and developer education!
		</p>

		<div class="my-4 flex-col">
			<label class="mb-1 block text-sm font-bold" for="name">Name (Pseudonym)</label>
			<input
				bind:value={name}
				class="w-full rounded-md border border-white bg-dark-4 outline-none placeholder:text-gray"
				type="text"
				id="name"
				name="name"
				placeholder="How people will see you on Secret University"
			/>
		</div>

		<div class="mb-4 flex-col">
			<label class="mb-1 block text-sm font-bold" for="skills"
				>How would you rate your skills as a developer?</label
			>
			<select
				bind:value={skill}
				class="w-full rounded-md border border-white bg-dark-4 text-white outline-none"
				name="skills"
				id="skills"
			>
				<option selected class="text-gray" value="beginner">Beginner (New to programming) </option>
				<option class="text-gray" value="intermediate"
					>Intermediate (Knows fundamental programming concepts)</option
				>
				<option class="text-gray" value="advanced"
					>Advanced (Can take a project from concept to production)</option
				>
			</select>
		</div>

		<div class="mb-4 flex-col">
			<label class="mb-1 block text-sm font-bold" for="reason"
				>Why do you want to join and contribute to Secret University?</label
			>
			<textarea
				bind:value={reason}
				id="reason"
				name="reason"
				class="h-40 w-full resize-none rounded-md border border-white bg-dark-4 outline-none placeholder:text-gray"
				type="text"
				placeholder="In a couple of sentences, please describe why or what you'd like to contribute to Secret University (Remember Secret University is actively looking for technical articles/guides, developer screencasts, courses, and templates projects that utilize Secret)"
			/>
		</div>

		<div class="mb-4 flex-col">
			<label class="mb-1 block text-sm font-bold" for="name">What's you Discord username?</label>
			<input
				bind:value={discord}
				class="w-full rounded-md border border-white bg-dark-4 outline-none placeholder:text-gray"
				type="text"
				id="discord"
				name="discord"
				placeholder="agent#1234"
			/>
		</div>

		<p class="text-center text-sm font-bold">OR</p>

		<div class="mb-4 flex-col">
			<label class="mb-1 block text-sm font-bold" for="name">What's your email address</label>
			<input
				bind:value={email}
				class="w-full rounded-md border border-white bg-dark-4 outline-none placeholder:text-gray"
				type="text"
				id="email"
				name="email"
				placeholder="agent@scrt.network"
			/>
		</div>

		<button
			on:click|preventDefault={submitContributorForm}
			class="w-20 justify-self-end rounded-md bg-dark-blue px-4 py-2 hover:bg-darker-blue"
			>Submit</button
		>
	</form>
</Modal>

<div class="mx-auto max-w-2xl pt-20 pb-10">
	<h1 class="text-center text-6xl font-bold text-white">Learn to Earn</h1>
	<p class="mt-2 text-center text-base text-gray">
		Secret University is an open platform for developers building on Secret Network. Builders of all
		skill levels are encouraged to become educators of the community and help guide others along a
		path towards privacy & security.
	</p>
</div>

<div class="flex justify-center gap-x-24">
	<div class="lg:max-w-xs">
		<img class="mx-auto h-56 w-56" src={CodeImage} alt="code your next project on secret" />
		<h2 class="mt-4 text-center text-lg font-semibold text-white">Code</h2>
		<p class="mt-2 text-center text-base text-gray">
			Build your next project on Secret and learn to build private decentralized applications.
		</p>
	</div>

	<div class="lg:max-w-xs">
		<img
			class="mx-auto h-56 w-56"
			src={TeachImage}
			alt="teach for the next generation of builders on secret"
		/>
		<h2 class="mt-4 text-center text-lg font-semibold text-white">Teach</h2>
		<p class="mt-2 text-center text-base text-gray">
			From video to courses, Secret University supports all kinds of educational material and wants
			your help creating it.
		</p>
	</div>

	<div class="lg:max-w-xs">
		<img
			class="mx-auto h-56 w-56"
			src={EarnImage}
			alt="earn SCRT for your contributions to secret university"
		/>
		<h2 class="mt-4 text-center text-lg font-semibold text-white">Earn</h2>
		<p class="mt-2 text-center text-base text-gray">
			Your work on Secret is valuable. Earn real crypto for educating the community and become a
			member of Secret University
		</p>
	</div>
</div>

<div class="mt-20 mb-36 flex justify-center">
	<button
		on:click={() => (isModalActive = true)}
		type="button"
		class="inline-flex items-center rounded-md border border-transparent bg-dark-blue px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-darker-blue"
		>Become A Contributor</button
	>
</div>

<div class="grid grid-cols-3 items-center justify-items-center bg-dark-2 py-32 text-white">
	<div class="col-span-2 grid gap-y-6">
		<p class="text-base font-semibold text-dark-turquoise-g">COMMUNITY CURATED BOUNTIES</p>
		<p class="text-4xl font-bold">Looking for your next project?</p>
		<p class="max-w-3xl">
			If you think you've got the skills, try building for the community today. The CCBL is a list
			of bounties requested to be developed by members of Secret Network. Complete the bounty, and
			earn your reward in SCRT
		</p>

		<div class="flex justify-start bg-dark-2">
			<a
				href="/bounties"
				type="button"
				class="inline-flex items-center rounded-md border border-transparent bg-light-cream px-6 py-3 text-base font-medium text-dark-2 shadow-sm hover:bg-darker-light-cream"
				>View Bounties</a
			>
		</div>
	</div>

	<img class="h-72 w-72 justify-self-start" src={GoldPot} alt="Pot of gold" />
</div>
