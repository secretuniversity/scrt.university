<script lang="ts">
	import { page } from '$app/stores';
</script>

<!-- TODO: This will render a second head tag, which is not good. We should probably move the head tag to the layout component. -->
<svelte:head>
	<title>Page Not Found</title>
	<meta
		name="description"
		content="Secret University couldn't find this page, but we'd love for you to check out our learning materials."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
	<link
		href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<section class="h-home-hero">
	<div class="grid h-full w-full justify-items-center">
		<div class="self-center text-center text-white">
			<img
				class="mx-auto block h-3/4 w-3/4"
				src="/images/illustrations/404.svg"
				alt="We could not find that page"
			/>
			<p class="text-lg font-semibold">Page Not Found</p>
			<p>Sorry about that, but we can't seem to find {$page.url}</p>
		</div>
	</div>
</section>
