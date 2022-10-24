<script lang="ts">
	interface Route {
		name: string;
		path: string;
	}

	export let routes: Array<Route> = [];
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<nav class="shadown-xl flex w-fit rounded-lg" aria-label="Breadcrumb">
	<ol class="flex max-w-screen-xl px-4 sm:px-6 lg:px-2">
		<li class="flex space-x-2">
			<div class="flex items-center">
				<a href="/" class="hover:text-dark-4 text-gray">
					<!-- Heroicon name: solid/home -->
					<svg
						class="h-5 w-5 flex-shrink-0"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
						/>
					</svg>
					<span class="sr-only">Home</span>
				</a>
			</div>

			<p class="text-bold text-gray">/</p>
		</li>

		{#each routes as route, index}
			<li class="flex space-x-2">
				<!-- <svg
					class="text-gray-200 h-full w-6 flex-shrink-0"
					viewBox="0 0 24 44"
					preserveAspectRatio="none"
					fill="white"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
				</svg> -->

				<div class="flex items-center">
					<a href={route.path} class="hover:text-dark-5 ml-4 text-sm font-medium text-gray">
						{route.name}
					</a>
				</div>
				{#if index < routes.length - 1}
					<p class="text-bold text-gray">/</p>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
