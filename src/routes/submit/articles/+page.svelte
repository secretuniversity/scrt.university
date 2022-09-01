<script lang="ts">
	import TipTap from '$lib/components/TipTap.svelte';
	import { secret } from '$lib/stores';
	import { onDestroy } from 'svelte';

	let addr = '';
	let title = '';
	let content = { html: '', text: '' };

	const options = {};

	const unsub = secret.subscribe((val) => {
		if (val.client) {
			addr = val.client.address;
		}
	});

	onDestroy(() => {
		unsub();
	});
</script>

<form>
	<div>
		<label for="title" class="block text-sm font-medium text-white">Author</label>
		<div class="mt-1">
			<input
				type="text"
				name="title"
				id="title"
				value={title}
				class="block w-full rounded-md border-dark-2 bg-dark-3 shadow-sm"
				placeholder="My Secret Article"
			/>
		</div>
	</div>

	<div>
		<label for="author" class="block text-sm font-medium text-white">Author</label>
		<div class="mt-1">
			<input
				type="text"
				name="author"
				id="author"
				value={addr}
				disabled
				class="block w-full rounded-md border-dark-2 bg-dark-3 shadow-sm disabled:cursor-not-allowed"
				placeholder="Secret Professor"
			/>
		</div>
	</div>
	<TipTap />
</form>
