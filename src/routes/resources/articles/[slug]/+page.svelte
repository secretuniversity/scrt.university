<script lang="ts">
	import { onMount } from 'svelte';
	import { article } from '$lib/stores';
	import { goto } from '$app/navigation';
	import hljs from 'highlight.js/lib/core';
	import javascript from 'highlight.js/lib/languages/javascript';
	import html from 'highlight.js/lib/languages/xml';
	import css from 'highlight.js/lib/languages/css';
	import ts from 'highlight.js/lib/languages/typescript';
	import rust from 'highlight.js/lib/languages/rust';
	import bash from 'highlight.js/lib/languages/bash';
	import python from 'highlight.js/lib/languages/python';

	import 'highlight.js/styles/tokyo-night-dark.css';

	onMount(() => {
		if (!$article) {
			goto('/resources');
		}

		hljs.registerLanguage('js', javascript);
		hljs.registerLanguage('html', html);
		hljs.registerLanguage('css', css);
		hljs.registerLanguage('ts', ts);
		hljs.registerLanguage('rust', rust);
		hljs.registerLanguage('sh', bash);
		hljs.registerLanguage('py', python);

		hljs.highlightAll();
	});
</script>

<section class="min-h-screen py-16 text-white">
	{#if $article}
		<div class="flex flex-col items-center justify-center w-full h-full">
			<p class="text-5xl font-bold text-center">{$article.title}</p>
			<div id="content" class="w-full max-w-4xl mt-8">
				{@html $article.content}
			</div>
		</div>
	{:else}
		<div class="flex flex-col items-center justify-center w-full h-full">
			<h1 class="text-4xl font-bold text-center">Article not found</h1>
			<p class="mt-4 text-center">The article you are looking for does not exist.</p>
		</div>
	{/if}
</section>

<style>
	#content :global(h1) {
		@apply text-4xl mb-2;
	}

	#content :global(pre) {
		@apply bg-dark-4 p-2 my-2 rounded;
	}
</style>
