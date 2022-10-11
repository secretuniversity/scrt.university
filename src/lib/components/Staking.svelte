<script lang="ts">
	import Toast from '$lib/components/Toast.svelte';
	import { secret } from '$lib/stores';

	// Secret University validator address
	const validatorAddress = 'secret1dc6lhau0gnqh9rup2zv7z2jj4q9wwtkc2khskf';

	let disabled = $secret.client === null;
	let scrtAmount: number | null = null;

	let toastIsVisible = false;
	let toastKind = 'fail';
	let toastMsg = '';

	async function handleStake() {
		try {
			console.log($secret);
			console.log(scrtAmount);
			if ($secret.client && scrtAmount) {
				console.log('Staking amount and client found. simulating tx');
				const sim = await $secret.client.tx.staking.delegate.simulate({
					delegatorAddress: $secret.client.address,
					validatorAddress,
					amount: {
						amount: getSCRTasUSCRT(scrtAmount),
						denom: 'uscrt'
					}
				});

				console.log(sim);
			}
		} catch (err) {
			console.log(err);
			toastMsg = 'There was an error staking your SCRT';
			toastIsVisible = true;
		}
	}

	function getSCRTasUSCRT(scrt: number): string {
		return `${scrt * 1_000_000}`;
	}
</script>

{#if toastIsVisible}
	<Toast msg={toastMsg} kind={toastKind} />
{/if}

<div class="container mx-auto px-4 sm:px-6 lg:py-20 lg:px-16">
	<div class="overflow-hidden rounded-lg bg-dark-4 px-4 py-6 shadow-lg lg:px-16 lg:py-12">
		<!-- Content goes here -->
		<h2 class="text-2xl font-semibold leading-6 text-white">Stake With Us</h2>
		<p class="mt-2 text-base text-gray lg:max-w-xl">
			Secret University is committed to supporting developer growth and education on Secret Network.
			By staking your SCRT with us, you are supporting the university's operating costs as well as
			helping to fund developer, education-focused bounties.
		</p>

		<div class="my-4 max-w-lg">
			<label for="amount" class="block text-sm font-medium text-off-white">Amount</label>
			<div class="relative mt-1 rounded-md shadow-sm">
				<input
					type="number"
					name="amount"
					id="amount"
					class="border-gray-300 block w-full rounded-md pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					placeholder="0.00"
					bind:value={scrtAmount}
					aria-describedby="price-currency"
				/>
				<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
					<span class="text-dark-4 sm:text-sm" id="amount-currency"> SCRT </span>
				</div>
			</div>
		</div>

		<button
			on:click={handleStake}
			{disabled}
			class="inline-flex cursor-pointer items-center rounded-md border border-transparent bg-dark-blue px-4 py-2 text-base font-medium text-white hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>Stake</button
		>
	</div>
</div>
