<script lang="ts">
	export let title = 'Title';
	export let description = 'Description';
	export let langs: string[] = [];
	export let url = '';

	interface Language {
		name: string;
		color: string;
	}

	$: getLanguages = (): Array<Language> => {
		return langs.map((lang) => {
			let color = '';

			switch (lang.toLowerCase()) {
				case 'javascript':
					color = 'bg-dark-yellow text-black';
					break;
				case 'typescript':
					color = 'bg-[#3178C6]';
					break;
				case 'rust':
					color = 'bg-dark-orange';
					break;
				case 'python':
					color = 'bg-dark-blue';
					break;
				default:
					'';
			}

			const language: Language = {
				name: lang,
				color: color
			};

			return language;
		});
	};
</script>

<div class="h-full w-60 overflow-hidden rounded-lg border-2 border-dark-4 bg-dark-2">
	<div class="grid h-full gap-y-2 px-10 py-8">
		<h2 class="text-center text-lg font-semibold leading-6 text-white">{title}</h2>
		<div class="flex flex-wrap gap-x-2 gap-y-2 justify-self-center">
			{#each getLanguages() as lang}
				<!-- content here -->
				<p class="inline-flex self-center rounded-xl px-4 py-1 text-white {lang.color} text-xs">
					{lang.name}
				</p>
			{/each}
		</div>

		<p class="mt-2 text-center text-sm text-gray">{description}</p>
		<a
			href={url}
			class="mt-4 inline-flex w-fit self-center justify-self-center rounded-md border px-4 py-2 text-sm font-medium text-white shadow-sm hover:text-dark-5"
			>View</a
		>
	</div>
</div>
