<script lang="ts">
	import Image from '$lib/assets/illustrations/secret_box.svg';
	import Image2 from '$lib/assets/illustrations/counter_box.svg';
	import Image3 from '$lib/assets/illustrations/hello_box.svg';
</script>

<div class="flex justify-center items-center">
	<div class="text-left max-w-2xl">
		<h1>
			<span class="block text-4xl font-extrabold tracking-tight xl:text-8xl">
				<span class="block text-white">Explore</span>
				<span
					class="block bg-gradient-to-r from-light-blue to-dark-blue bg-clip-text text-transparent"
					>Secret Boxes</span
				>
			</span>
		</h1>
		<p class="mt-3 text-base text-gray lg:text-lg xl:text-xl">
			Secret Boxes are prebuilt starter application ready to use with the push of a button. Expand a
			Secret Box to fit your application and learn without setup. Explore our catalogue of Secret
			Boxes to jumpstart your development on Secret.
		</p>
	</div>
	<div class="relative">
		<div class="relative mx-auto w-max">
			<img class="w-full h-full" src={Image} alt="Explore Secret Boxes" />
			<img class="ml-16 w-full h-full" src={Image2} alt="Explore Secret Boxes" />
			<img class="w-full h-full" src={Image3} alt="Explore Secret Boxes" />
		</div>
	</div>
</div>
