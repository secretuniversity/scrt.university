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

	import html from 'highlight.js/lib/languages/xml';
	import css from 'highlight.js/lib/languages/css';
	import js from 'highlight.js/lib/languages/javascript';
	import ts from 'highlight.js/lib/languages/typescript';
	import rust from 'highlight.js/lib/languages/rust';
	import bash from 'highlight.js/lib/languages/bash';
	import python from 'highlight.js/lib/languages/python';
	import { lowlight } from 'lowlight';

	import ClearIcon from '$lib/assets/clear-icon.svg';
	import '$lib/styles/tiptap.scss';

	export let value = `
		<h1>👋</h1>
		<p>This text box will auto-magically render your text as markdown, so you can preview your styled content before submitting it.</p>
		<p>Code will be syntax highlighted if supported. Here's some JavaScript.</p>
		<pre><code class="language-javascript">for (var i=1; i <= 20; i++)
{
  if (i % 15 == 0)
    console.log("FizzBuzz");
  else if (i % 3 == 0)
    console.log("Fizz");
  else if (i % 5 == 0)
    console.log("Buzz");
  else
    console.log(i);
}</code></pre>

		<p>From Secret University to you, we thank you for your contribution and hope to see you more around the university.</p>
	`;

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
		lowlight.registerLanguage('python', python);

		editor = new Editor({
			element: editorElement,
			extensions: [
				StarterKit,
				Underline,
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

<style lang="scss">
	.editor-menu button {
		@apply p-1.5;
	}
</style>
