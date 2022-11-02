<script lang="ts">
	import Image from '$lib/assets/illustrations/main_professor.svg';
</script>

<div class="flex justify-center">
	<div class="text-left max-w-2xl">
		<h1>
			<span class="block text-4xl font-extrabold tracking-tight xl:text-8xl">
				<span class="block text-white">Build a more</span>
				<span
					class="block bg-gradient-to-r from-light-blue to-dark-blue bg-clip-text text-transparent"
					>private web</span
				>
			</span>
		</h1>
		<p class="mt-3 text-base text-gray lg:text-lg xl:text-xl">
			Welcome to Secret University— home of developer education on Secret Network. Learn to build
			private dApps, discover how you can contribute to the university, and begin your developer
			journey on Secret.
		</p>
	</div>
	<div class="relative">
		<div class="relative mx-auto w-max">
			<img class="w-full h-full" src={Image} alt="Welcome to Secret University" />
		</div>
	</div>
</div>
