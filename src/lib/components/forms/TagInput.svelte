<script lang="ts">
	import Tag from '$lib/components/page/Tag.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ update: { tags: string[] } }>();

	export let artifact = '';

	let commonTags: string[] = ['gaming', 'defi', 'smart-contract', 'secret-box', 'privacy'];
	let tag = '';
	export let tags: string[] = [];

	function handleTagInput(e: KeyboardEvent) {
		if (e.key === ' ' || e.key === 'Enter') {
			e.preventDefault();

			tags = [...tags, tag];
			tag = '';

			dispatch('update', { tags });
		}
	}

	function addCommonTag(tag: string) {
		tags = tags.filter((t) => t !== tag);

		tags = [...tags, tag];
		dispatch('update', { tags });
	}

	function removeTag(index: number) {
		let temp = [...tags];
		temp.splice(index, 1);

		tags = temp;

		dispatch('update', { tags });
	}
</script>

<label for="tags" class="block text-sm font-medium text-white">Tags</label>

{#if tags.length === 0}
	<p class="block self-center text-center text-sm font-medium text-dark-5">
		Your {artifact} has no tags.
	</p>
{/if}

{#each tags as tag, i}
	<div
		class="mr-2 inline-block cursor-pointer"
		on:click={() => removeTag(i)}
		on:keydown={(e) => {
			if (e.key === 'Backspace') {
				removeTag(i);
			}
		}}
	>
		<Tag {tag} />
	</div>
{/each}

<input
	type="text"
	name="tag"
	id="tag"
	bind:value={tag}
	on:keydown={handleTagInput}
	class="block w-full rounded-md border-white bg-dark-3 text-white shadow-sm"
	placeholder="Type tag name and hit [space] to add it."
/>

<p class="block text-sm font-medium text-white">Useful Tags (click to add)</p>
<div class="flex gap-x-2">
	{#each commonTags as str}
		<div
			class="inline-block cursor-pointer"
			on:click={() => {
				addCommonTag(str);
			}}
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					addCommonTag(str);
				}
			}}
		>
			<Tag tag={str} />
		</div>
	{/each}
</div>
