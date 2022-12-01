<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ update: { content: string } }>();

	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Typography from '@tiptap/extension-typography';
	import Underline from '@tiptap/extension-underline';
	import BubbleMenu from '@tiptap/extension-bubble-menu';
	import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
	import Image from '@tiptap/extension-image';
	import Link from '@tiptap/extension-link';

	import html from 'highlight.js/lib/languages/xml';
	import css from 'highlight.js/lib/languages/css';
	import js from 'highlight.js/lib/languages/javascript';
	import ts from 'highlight.js/lib/languages/typescript';
	import rust from 'highlight.js/lib/languages/rust';
	import bash from 'highlight.js/lib/languages/bash';
	import python from 'highlight.js/lib/languages/python';
	import { lowlight } from 'lowlight';

	import ClearIcon from '$lib/assets/clear-icon.svg';
	import ImageIcon from '$lib/assets/image_icon_white.svg';
	import LinkIcon from '$lib/assets/link-icon.svg';

	import '$lib/styles/tiptap.scss';

	export let value = '';

	let imageUrl = '';
	let isAddingImage = false;

	let linkUrl = '';
	let isAddingLink = false;

	let mainMenu: HTMLElement | null;
	let bubbleMenuElement: HTMLElement | null = null;
	let editorElement: HTMLElement;
	let editor: Editor;

	onMount(() => {
		lowlight.registerLanguage('html', html);
		lowlight.registerLanguage('css', css);
		lowlight.registerLanguage('js', js);
		lowlight.registerLanguage('ts', ts);
		lowlight.registerLanguage('rust', rust);
		lowlight.registerLanguage('bash', bash);
		lowlight.registerLanguage('sh', bash);
		lowlight.registerLanguage('py', python);

		editor = new Editor({
			element: editorElement,
			extensions: [
				Link.configure({
					autolink: true,
					openOnClick: true,
					linkOnPaste: true
				}),
				StarterKit,
				Underline,
				Image,
				Typography,
				BubbleMenu.configure({
					element: bubbleMenuElement
				}),
				CodeBlockLowlight.configure({ lowlight })
			],
			content: value,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			},
			onUpdate: () => {
				dispatch('update', { content: editor.getHTML() });
			}
		});
	});

	function addImage() {
		if (imageUrl) {
			editor.chain().focus().setImage({ src: imageUrl }).run();
			isAddingImage = false;
			imageUrl = '';
		}
	}

	function addLink() {
		if (linkUrl) {
			editor.commands.setLink({ href: linkUrl });
			isAddingLink = false;
			linkUrl = '';
		}
	}

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div class="h-full">
	{#if editor}
		<div
			class="editor-menu flex items-center space-x-2 border-b border-white bg-dark-4 px-2"
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

			{#if isAddingImage}
				<div class="flex h-full items-center">
					<input
						bind:value={imageUrl}
						type="text"
						class="h-7 w-72 rounded-md bg-dark-4"
						placeholder="Enter image url here"
					/>
					<button
						class="ml-2 h-6 rounded-sm border border-white text-xs leading-none hover:bg-dark-3"
						on:click={() => (isAddingImage = false)}>Cancel</button
					>
					<button
						class="ml-2 h-6 rounded-sm border border-white text-xs leading-none hover:bg-dark-3"
						on:click={() => addImage()}>Add Image</button
					>
				</div>
			{:else}
				<button on:click={() => (isAddingImage = true)}>
					<img class="h-4 w-4" src={ImageIcon} alt="Add screenshots" />
				</button>
			{/if}

			{#if isAddingLink}
				<input
					bind:value={linkUrl}
					type="text"
					class="h-7 w-72 rounded-md bg-dark-4"
					placeholder="Enter url here"
				/>
				<button
					class="ml-2 h-6 rounded-sm border border-white text-xs leading-none hover:bg-dark-3"
					on:click={() => (isAddingLink = false)}>Cancel</button
				>
				<button
					class="ml-2 h-6 rounded-sm border border-white text-xs leading-none hover:bg-dark-3"
					on:click={() => addLink()}>Add Link</button
				>
			{:else}
				<button on:click={() => (isAddingLink = true)}>
					<img class="h-4 w-4" src={LinkIcon} alt="Add link" />
				</button>
			{/if}
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

<style lang="scss">
	.editor-menu button {
		@apply p-1.5;
	}
</style>
