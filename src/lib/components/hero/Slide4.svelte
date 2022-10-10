<script lang="ts">
	import ShockwaveImage from '$lib/assets/shockwave.png';
</script>

<div class="col-span-8 text-left">
	<h1>
		<span class="block text-8xl font-extrabold tracking-tight">
			<span class="block text-white">Contribute to</span>
			<span
				class="block bg-gradient-to-r from-light-blue to-dark-blue bg-clip-text text-transparent"
				>Secret University</span
			>
		</span>
	</h1>
	<p class="mt-3 text-base text-gray sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
		We cannot do this alone. To grow the adoption of private blockchain solutions, we need your
		help. Secret University is accepting contribution from writing to development. Connect to learn
		more, and reach out to us on Discord
	</p>
</div>
<div class="relative col-span-4 flex max-w-none items-center">
	<svg
		class="absolute top-0 left-1/2 origin-top -translate-x-1/2 -translate-y-8 scale-75 transform sm:scale-100 lg:hidden"
		width="640"
		height="784"
		fill="none"
		viewBox="0 0 640 784"
		aria-hidden="true"
	>
		<defs>
			<pattern
				id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e"
				x="118"
				y="0"
				width="20"
				height="20"
				patternUnits="userSpaceOnUse"
			>
				<rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="#60A0DC" />
			</pattern>
		</defs>
		<rect y="72" width="640" height="640" class="text-gray-50" fill="currentColor" />
		<rect x="118" width="404" height="784" fill="url(#4f4f415c-a0e9-44c2-9601-6ded5a34a13e)" />
	</svg>
	<div class="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
		<button
			type="button"
			class="relative block w-full overflow-hidden rounded-lg bg-dark-1 p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
		>
			<span class="sr-only">Watch our video to learn more</span>
			<img class="h-72 w-full" src={ShockwaveImage} alt="Shockwave illustration" />
			<span
				class="absolute inset-0 flex h-full w-full items-center justify-center"
				aria-hidden="true"
			>
				<svg class="h-20 w-20 text-indigo-500" fill="#60a0dc" viewBox="0 0 84 84">
					<circle opacity="0.9" cx="42" cy="42" r="42" fill="#f9fafb" />
					<path
						d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z"
					/>
				</svg>
			</span>
		</button>
	</div>
</div>
