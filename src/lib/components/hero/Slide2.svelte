<script lang="ts">
	import Image from '$lib/assets/illustrations/developer.svg';
</script>

<div class="flex justify-center space-x-6">
	<div class="relative">
		<div class="relative mx-auto w-full h-full">
			<img class="h-full w-full" src={Image} alt="Grow as a developer" />
		</div>
	</div>

	<div class="text-left max-w-2xl">
		<h1>
			<span class="block text-4xl font-extrabold tracking-tight xl:text-8xl">
				<span class="block text-white">Grow as a</span>
				<span
					class="block bg-gradient-to-r from-light-blue to-dark-blue bg-clip-text text-transparent"
					>developer</span
				>
			</span>
		</h1>
		<p class="mt-3 text-base text-gray lg:text-lg xl:text-xl">
			Integrate privacy powered by Secret into your next next project. Find a <a
				class="text-light-blue underline underline-offset-2"
				href="/pathways">course</a
			>
			that fits your developer background or explore the many
			<a class="text-light-blue underline underline-offset-2" href="/repos">projects</a> shared by members
			of the network and learn from our open source code.
		</p>
	</div>
</div>
