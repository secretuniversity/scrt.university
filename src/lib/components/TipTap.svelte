<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Typography from '@tiptap/extension-typography';
	import Underline from '@tiptap/extension-underline';
	import BubbleMenu from '@tiptap/extension-bubble-menu';
	import ClearIcon from '$lib/assets/clear-icon.svg';

	export let baseContent = `
		<h1>Hello Agent 👋</h1>
		<p>This text box will auto magically render your text as markdown, so you can preview your styled content before submitting it.</p>
		<p>From Secret University, we thank you for your contribution and hope to see you around the agency.</p>
	`;

	let mainMenu: HTMLElement | null;
	let bubbleMenuElement: HTMLElement | null;
	let editorElement: HTMLElement;
	let editor: Editor;

	onMount(() => {
		editor = new Editor({
			element: editorElement,
			extensions: [
				StarterKit,
				Underline,
				Typography,
				BubbleMenu.configure({
					element: bubbleMenuElement
				})
			],
			content: baseContent,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div class="h-full">
	{#if editor}
		<div
			class="editor-menu flex space-x-2 border-b border-white bg-dark-4 px-2"
			bind:this={mainMenu}
		>
			<button class="bold" on:click={() => editor.chain().focus().toggleBold().run()}> B </button>
			<button class="italic" on:click={() => editor.chain().focus().toggleItalic().run()}>
				I
			</button>
			<button class="underline" on:click={() => editor.chain().focus().toggleUnderline().run()}>
				U
			</button>
			<button class="line-through" on:click={() => editor.chain().focus().toggleStrike().run()}>
				S
			</button>
			<button on:click={() => editor.chain().focus().unsetAllMarks().run()}>
				<img class="h-4 w-4" src={ClearIcon} alt="Clear text styles" />
			</button>
		</div>
	{/if}
	<div bind:this={editorElement} />

	<div bind:this={bubbleMenuElement}>
		<div class="editor-menu flex space-x-2 rounded-lg bg-dark-4 px-2" bind:this={mainMenu}>
			<button class="bold" on:click={() => editor.chain().focus().toggleBold().run()}> B </button>
			<button class="italic" on:click={() => editor.chain().focus().toggleItalic().run()}>
				I
			</button>
			<button class="underline" on:click={() => editor.chain().focus().toggleUnderline().run()}>
				U
			</button>
			<button class="line-through" on:click={() => editor.chain().focus().toggleStrike().run()}>
				S
			</button>
			<button on:click={() => editor.chain().focus().unsetAllMarks().run()}>
				<img class="h-4 w-4" src={ClearIcon} alt="Clear text styles" />
			</button>
		</div>
	</div>
</div>

<style>
	.editor-menu button {
		@apply p-1.5;
	}
</style>
