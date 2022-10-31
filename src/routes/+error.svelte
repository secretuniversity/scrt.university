<script lang="ts">
	import { page } from '$app/stores';
	import Image from '$lib/assets/illustrations/404.svg';
</script>

<section class="h-home-hero">
	<div class="grid h-full w-full justify-items-center">
		<div class="self-center text-center text-white">
			<img class="mx-auto block h-3/4 w-3/4" src={Image} alt="We could not find that page" />
			<p class="text-lg font-semibold">Page Not Found</p>
			<p>Sorry about that, but we can't seem to find {$page.url}</p>
		</div>
	</div>
</section>
