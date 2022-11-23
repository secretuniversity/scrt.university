<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import { getBaseAPIUrl, getNotification } from '$lib/helpers';
	import { notificationsStore, userStore } from '$lib/stores';
	import { number, object, string } from 'yup';
	import type { InferType, ValidationError } from 'yup';

	const contributorFormSchema = object({
		id: number().positive().integer().required('id is required'),
		name: string().required('Name is required'),
		skill: string().required('Skill is required'),
		reason: string().required('Reason is required'),
		email: string().test((val) => {
			const { discord } = this.parent;
			if (!discord) return val != null;
			return true;
		}),
		discord: string().test((val) => {
			const { email } = this.parent;
			if (!email) return val != null;
			return true;
		})
	});

	interface ContributorForm extends InferType<typeof contributorFormSchema> {
		id: number;
		name: string;
		skill: string;
		reason: string;
		email: string;
		discord: string;
	}

	const contributorForm: ContributorForm = {
		id: -1,
		name: '',
		skill: '',
		reason: '',
		email: '',
		discord: ''
	};

	export let active = false;

	let hasNameError = false;
	let hasSkillError = false;
	let hasReasonError = false;
	let hasEmailError = false;
	let hasDiscordError = false;

	async function validateContributorForm() {
		try {
			await contributorFormSchema.validate(contributorForm, { abortEarly: false });
		} catch (err) {
			const e = err as ValidationError;

			for (const error of e.inner) {
				switch (error.path) {
					case 'name':
						hasNameError = true;
						break;
					case 'skill':
						hasSkillError = true;
						break;
					case 'reason':
						hasReasonError = true;
						break;
					case 'email':
						hasEmailError = true;
						break;
					case 'discord':
						hasDiscordError = true;
						break;
				}
			}

			Promise.reject(err);
		}
	}

	async function submitContributorForm() {
		try {
			if (!$userStore) {
				$notificationsStore = [
					...$notificationsStore,
					getNotification('Please connect your wallet to submit the contributor form.', 'error')
				];
				return;
			}

			await validateContributorForm();

			contributorForm.id = $userStore.val.id;

			const form = new FormData();
			form.append('id', contributorForm.id.toString());
			form.append('name', contributorForm.name);
			form.append('reason', contributorForm.reason);
			form.append('skill_rating', contributorForm.skill);
			form.append('discord', contributorForm.discord);
			form.append('email', contributorForm.email);
			const url = getBaseAPIUrl() + '/v1/users/register';
			const res = await fetch(url, {
				method: 'POST',
				body: form
			});

			if (res.status === 200) {
				$notificationsStore = [
					...$notificationsStore,
					getNotification('Successfully submitted contributor form.', 'success')
				];
			}
		} catch (err) {
			$notificationsStore = [
				...$notificationsStore,
				getNotification('There was a problem submitting your form.', 'error')
			];
		}
	}
</script>

<Modal {active} on:hide={() => (active = false)}>
	<form class="grid grid-cols-1 text-white">
		<h2 class="mx-auto max-w-xs text-center text-2xl font-semibold">
			Become A Contributor for Secret University
		</h2>
		<p class="mx-auto mt-2 max-w-md text-center text-sm">
			Fill out the questions below and a leader of Secret University will process your request soon!
			Thank you for your interest in advancing private blockchain solutions and developer education!
		</p>

		<div class="my-4 flex-col">
			{#if hasNameError}
				<p class="italic text-dark-red">Name is required</p>
			{/if}
			<label class="mb-1 block text-sm font-bold" for="name">Name (Pseudonym)</label>
			<input
				bind:value={contributorForm.name}
				class="w-full rounded-md border border-white bg-dark-4 outline-none placeholder:text-gray"
				type="text"
				id="name"
				name="name"
				placeholder="How people will see you on Secret University"
			/>
		</div>

		<div class="mb-4 flex-col">
			{#if hasSkillError}
				<p class="italic text-dark-red">Skill is required</p>
			{/if}

			<label class="mb-1 block text-sm font-bold" for="skills"
				>How would you rate your skills as a developer?</label
			>
			<select
				bind:value={contributorForm.skill}
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
			{#if hasReasonError}
				<p class="italic text-dark-red">Reason is required</p>
			{/if}

			<label class="mb-1 block text-sm font-bold" for="reason"
				>Why do you want to join and contribute to Secret University?</label
			>
			<textarea
				bind:value={contributorForm.reason}
				id="reason"
				name="reason"
				class="h-40 w-full resize-none rounded-md border border-white bg-dark-4 outline-none placeholder:text-gray"
				type="text"
				placeholder="In a couple of sentences, please describe why or what you'd like to contribute to Secret University (Remember Secret University is actively looking for technical articles/guides, developer screencasts, courses, and templates projects that utilize Secret)"
			/>
		</div>

		<div class="mb-4 flex-col">
			{#if hasDiscordError}
				<p class="italic text-dark-red">Discord is required when email is blank.</p>
			{/if}

			<label class="mb-1 block text-sm font-bold" for="name">What's you Discord username?</label>
			<input
				bind:value={contributorForm.discord}
				class="w-full rounded-md border border-white bg-dark-4 outline-none placeholder:text-gray"
				type="text"
				id="discord"
				name="discord"
				placeholder="agent#1234"
			/>
		</div>

		<p class="text-center text-sm font-bold">OR</p>

		<div class="mb-4 flex-col">
			{#if hasEmailError}
				<p class="italic text-dark-red">Email is required when discord is blank.</p>
			{/if}

			<label class="mb-1 block text-sm font-bold" for="name">What's your email address</label>
			<input
				bind:value={contributorForm.email}
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
