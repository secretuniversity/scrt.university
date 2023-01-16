<script lang="ts">
	import { notes } from '$lib/stores';
	import { object, string } from 'yup';
	import type { InferType, ValidationError } from 'yup';
	import { getBaseAPIUrl, getNotification } from '$lib/helpers';

	const supportTicketSchema = object({
		subject: string().required('Subject is required'),
		topic: string().required('Topic is required'),
		email: string().email().required('Email is required'),
		description: string().required('Description is required'),
		os: string().required('OS is required')
	});

	interface SupportTicket extends InferType<typeof supportTicketSchema> {
		subject: string;
		topic: string;
		email: string;
		description: string;
		os: string;
	}

	let supportTicket: SupportTicket = {
		subject: '',
		topic: '',
		email: '',
		description: '',
		os: ''
	};

	let hasSubjectError = false;
	let hasTopicError = false;
	let hasEmailError = false;
	let hasDescriptionError = false;
	let hasOsError = false;

	async function submit() {
		try {
			await supportTicketSchema.validate(supportTicket, { abortEarly: false });
		} catch (err) {
			$notes = [...$notes, getNotification('Please fill out all required fields.', 'error')];

			const e = err as ValidationError;

			for (const error of e.inner) {
				switch (error.path) {
					case 'subject':
						hasSubjectError = true;
						break;
					case 'topic':
						hasTopicError = true;
						break;
					case 'email':
						hasEmailError = true;
						break;
					case 'description':
						hasDescriptionError = true;
						break;
					case 'os':
						hasOsError = true;
						break;
				}
			}

			return;
		}

		// const url = getBaseAPIUrl() + '/v1/support-tickets';
		// await fetch(url, {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify(supportTicket)
		// });
	}
</script>

<form class="w-full space-y-8 divide-y divide-gray">
	<div class="space-y-8 divide-y divide-gray sm:space-y-5">
		<div>
			<div>
				<h3 class="text-lg font-semibold leading-6 text-white">Support Ticket</h3>
				<p class="mt-1 max-w-2xl text-sm text-gray">
					This ticket will be sent directly to the Secret University team.
				</p>
			</div>

			<div class="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
				<div
					class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray sm:pt-5"
				>
					<label for="subject" class="block text-sm font-medium text-off-white sm:mt-px sm:pt-2">
						Subject
						{#if hasSubjectError}
							<p class="italic text-dark-red">Subject is required</p>
						{/if}
					</label>
					<div class="mt-1 sm:col-span-2 sm:mt-0">
						<input
							bind:value={supportTicket.subject}
							on:focus={() => (hasSubjectError = false)}
							id="subject"
							name="subject"
							type="text"
							class="block w-full max-w-lg rounded-md border-none bg-dark-3 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
					</div>
				</div>

				<div
					class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray sm:pt-5"
				>
					<label for="topic" class="block text-sm font-medium text-off-white sm:mt-px sm:pt-2">
						Topic
						{#if hasTopicError}
							<p class="italic text-dark-red">Topic is required</p>
						{/if}
					</label>
					<div class="mt-1 sm:col-span-2 sm:mt-0">
						<div class="flex max-w-lg rounded-md shadow-sm">
							<span
								class="inline-flex items-center rounded-l-md border border-r-0 border-none bg-dark-2 px-3 text-gray sm:text-sm"
							>
								scrt.university/
							</span>
							<input
								bind:value={supportTicket.topic}
								on:focus={() => (hasTopicError = false)}
								type="text"
								name="topic"
								id="topic"
								class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-none bg-dark-3 text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							/>
						</div>
					</div>
				</div>

				<div
					class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray sm:pt-5"
				>
					<label for="email" class="block text-sm font-medium text-off-white sm:mt-px sm:pt-2">
						Email address
						{#if hasEmailError}
							<p class="italic text-dark-red">Email is required</p>
						{/if}
					</label>
					<div class="mt-1 sm:col-span-2 sm:mt-0">
						<input
							bind:value={supportTicket.email}
							on:focus={() => (hasEmailError = false)}
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							class="block w-full max-w-lg rounded-md border-none bg-dark-3 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
					</div>
				</div>

				<div
					class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray sm:pt-5"
				>
					<label
						for="description"
						class="block text-sm font-medium text-off-white sm:mt-px sm:pt-2"
					>
						Description

						{#if hasDescriptionError}
							<p class="italic text-dark-red">Description is required</p>
						{/if}
					</label>
					<div class="mt-1 sm:col-span-2 sm:mt-0">
						<textarea
							bind:value={supportTicket.description}
							on:focus={() => (hasDescriptionError = false)}
							id="description"
							name="description"
							rows="3"
							class="block w-full max-w-lg rounded-md border border-none bg-dark-3 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
						<p class="mt-2 text-sm text-gray">Describe your problem in a couple sentences.</p>
					</div>
				</div>

				<div
					class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray sm:pt-5"
				>
					<label for="os" class="block text-sm font-medium text-off-white">
						Operating System
						{#if hasOsError}
							<p class="italic text-dark-red">OS is required</p>
						{/if}
					</label>
					<div class="mt-1 sm:col-span-2 sm:mt-0">
						<select
							bind:value={supportTicket.os}
							on:focus={() => (hasOsError = false)}
							id="os"
							name="os"
							class="block w-full max-w-lg rounded-md border border-none bg-dark-3 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						>
							<option>Windows</option>
							<option>Mac OS</option>
							<option>Linux</option>
						</select>
					</div>
				</div>

				<div />
			</div>
		</div>
	</div>

	<div class="pt-5">
		<div class="flex justify-end">
			<button
				type="button"
				class="rounded-md bg-white py-2 px-4 text-sm font-medium text-dark-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>Clear</button
			>
			<button
				on:click|preventDefault={submit}
				type="submit"
				class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-dark-blue py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>Submit</button
			>
		</div>
	</div>
</form>
