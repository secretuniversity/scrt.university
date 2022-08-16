<script lang="ts">
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import Head from '$lib/components/Head.svelte';

	const pageTitle = 'Pathways';

	const breadcrumbRoutes = [
		{
			name: 'Learn',
			path: '/learn'
		},
		{
			name: 'Secret Pathways',
			path: '/pathways'
		}
	];
</script>

<Head {pageTitle} />

<section class="mx-24 py-8">
	<Breadcrumb routes={breadcrumbRoutes} />
	<div class="mt-8 max-w-3xl">
		<h1 class="mb-4 text-5xl font-bold text-white">Secret Pathways</h1>
		<p class="mb-16 text-base text-gray">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque facilisis felis ut neque
			fermentum eleifend. Integer ultricies tortor augue, id scelerisque justo varius vitae.
			Vestibulum molestie at nisl ac cursus.
		</p>
	</div>

	<div class="mx-auto grid w-10/12 grid-cols-3 gap-12">
		<a href="/pathways/welcome-to-secret-network">
			<div
				class="max-w-lg overflow-hidden rounded-2xl bg-dark-4 px-6 py-6 shadow-lg lg:px-8 lg:py-8"
			>
				<div class="grid auto-rows-min">
					<p
						class="mb-4 inline-block justify-self-end rounded-full bg-blue-400 px-3 py-1 text-white"
					>
						Beginner
					</p>
					<!-- <img src="" alt=""> -->
					<div class="mx-auto mb-6 h-36 w-36 bg-slate-400" />
					<h2 class="mb-2 text-center text-lg font-semibold text-white">
						Welcome To Secret Network
					</h2>
					<p class="text-center text-base text-gray">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed dapibus libero. Mauris
						et orci vel nibh accumsan suscipit sit amet sit amet diam.
					</p>
				</div>
			</div>
		</a>

		<div class="max-w-lg overflow-hidden rounded-2xl bg-dark-4 px-6 py-6 shadow-lg lg:px-8 lg:py-8">
			<div class="grid auto-rows-min">
				<p class="mb-4 inline-block justify-self-end rounded-full bg-blue-400 px-3 py-1 text-white">
					Beginner
				</p>
				<!-- <img src="" alt=""> -->
				<div class="mx-auto mb-6 h-36 w-36 bg-slate-400" />
				<h2 class="mb-2 text-center text-lg font-semibold text-white">
					Your First Secret Smart Contract
				</h2>
				<p class="text-center text-base text-gray">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed dapibus libero. Mauris et
					orci vel nibh accumsan suscipit sit amet sit amet diam.
				</p>
			</div>
		</div>

		<div class="max-w-lg overflow-hidden rounded-2xl bg-dark-4 px-6 py-6 shadow-lg lg:px-8 lg:py-8">
			<div class="grid auto-rows-min">
				<p class="mb-4 inline-block justify-self-end rounded-full bg-blue-400 px-3 py-1 text-white">
					Beginner
				</p>
				<!-- <img src="" alt=""> -->
				<div class="mx-auto mb-6 h-36 w-36 bg-slate-400" />
				<h2 class="mb-2 text-center text-lg font-semibold text-white">Your First Secret dApp</h2>
				<p class="text-center text-base text-gray">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed dapibus libero. Mauris et
					orci vel nibh accumsan suscipit sit amet sit amet diam.
				</p>
			</div>
		</div>
	</div>
</section>

<div class="mx-auto w-9/12 py-16" />
