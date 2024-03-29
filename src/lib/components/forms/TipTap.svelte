<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount, tick } from 'svelte';

	const dispatch = createEventDispatcher<{ update: { content: string } }>();

	import { Editor, Extension } from '@tiptap/core';
	import BubbleMenu from '@tiptap/extension-bubble-menu';
	import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
	import Image from '@tiptap/extension-image';
	import Link from '@tiptap/extension-link';
	import Table from '@tiptap/extension-table';
	import TableCell from '@tiptap/extension-table-cell';
	import TableHeader from '@tiptap/extension-table-header';
	import TableRow from '@tiptap/extension-table-row';
	import Typography from '@tiptap/extension-typography';
	import Underline from '@tiptap/extension-underline';
	import StarterKit from '@tiptap/starter-kit';
	import { Plugin } from 'prosemirror-state';

	import DOMPurify from 'isomorphic-dompurify';
	import { marked } from 'marked';

	import bash from 'highlight.js/lib/languages/bash';
	import csharp from 'highlight.js/lib/languages/csharp';
	import css from 'highlight.js/lib/languages/css';
	import js from 'highlight.js/lib/languages/javascript';
	import python from 'highlight.js/lib/languages/python';
	import rust from 'highlight.js/lib/languages/rust';
	import ts from 'highlight.js/lib/languages/typescript';
	import html from 'highlight.js/lib/languages/xml';
	import { lowlight } from 'lowlight';

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

	const PasteExtenstion = Extension.create({
		name: 'customExtension',

		addProseMirrorPlugins() {
			return [
				new Plugin({
					props: {
						handlePaste(view, event) {
							if (event.clipboardData) {
								const content = event.clipboardData.getData('text/plain');
								const clean = DOMPurify.sanitize(content);
								const parsed = marked.parse(content);

								editor.commands.insertContent(parsed, {
									parseOptions: {
										preserveWhitespace: false
									}
								});

								return true;
							}
						}
					}
				})
			];
		}
	});

	onMount(async () => {
		await tick();

		lowlight.registerLanguage('html', html);
		lowlight.registerLanguage('xml', html);
		lowlight.registerLanguage('css', css);
		lowlight.registerLanguage('js', js);
		lowlight.registerLanguage('ts', ts);
		lowlight.registerLanguage('rust', rust);
		lowlight.registerLanguage('bash', bash);
		lowlight.registerLanguage('sh', bash);
		lowlight.registerLanguage('py', python);
		lowlight.registerLanguage('csharp', csharp);

		editor = new Editor({
			element: editorElement,
			extensions: [
				Link.configure({
					autolink: true,
					openOnClick: true
				}),
				StarterKit,
				Underline,
				Image,
				Typography,
				Table.configure({
					resizable: true
				}),
				TableCell,
				TableHeader,
				TableRow,
				BubbleMenu.configure({
					element: bubbleMenuElement
				}),
				CodeBlockLowlight.configure({ lowlight }),
				PasteExtenstion
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
			class="editor-menu sticky top-0 z-10 flex items-center space-x-2 border-b border-white bg-dark-4 px-2"
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
				<img class="h-4 w-4" src="/images/icons/clear_icon.svg" alt="Clear text styles" />
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
					<img class="h-4 w-4" src="/images/icons/image_icon_white.svg" alt="Add screenshots" />
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
					<img class="h-4 w-4" src="/images/icons/link_icon.svg" alt="Add link" />
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
				<img class="h-4 w-4" src="/images/icons/clear_icon.svg" alt="Clear text styles" />
			</button>
		</div>
	</div>
</div>

<style lang="scss">
	.editor-menu button {
		@apply p-1.5;
	}
</style>
