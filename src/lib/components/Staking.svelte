<script lang="ts">
	import Image from '$lib/assets/illustrations/staking.svg';
	import { getNotification } from '$lib/helpers';
	import { notificationsStore, secretStore } from '$lib/stores';

	const validatorAddress = 'secret1dc6lhau0gnqh9rup2zv7z2jj4q9wwtkc2khskf';

	let scrtAmount: number;

	async function handleStake() {
		try {
			if (!$secretStore) {
				$notificationsStore = [
					...$notificationsStore,
					getNotification('Please connect your Keplr wallet first', 'error')
				];
				return;
			}

			if (!scrtAmount || scrtAmount <= 0) {
				$notificationsStore = [
					...$notificationsStore,
					getNotification('Please enter a valid amount', 'error')
				];
				return;
			}

			if (process.env.APP_ENV === 'development') {
				await $secretStore.val.tx.staking.delegate.simulate({
					delegator_address: $secretStore.val.address,
					validator_address: validatorAddress,
					amount: {
						amount: getSCRTasUSCRT(scrtAmount),
						denom: 'uscrt'
					}
				});
			}

			if (process.env.APP_ENV === 'production') {
				await $secretStore.val.tx.staking.delegate({
					delegator_address: $secretStore.val.address,
					validator_address: validatorAddress,
					amount: {
						amount: getSCRTasUSCRT(scrtAmount),
						denom: 'uscrt'
					}
				});
			}

			$notificationsStore = [
				...$notificationsStore,
				getNotification('Succesfully staked with Secret University! Tyvm!', 'success')
			];
		} catch (err) {
			console.log(err);
			$notificationsStore = [
				...$notificationsStore,
				getNotification('Error staking with Secret University.', 'error')
			];
		}
	}

	function getSCRTasUSCRT(scrt: number): string {
		return `${scrt * 1_000_000}`;
	}
</script>

<div class="container relative mx-auto max-h-fit px-4 sm:px-6 lg:py-20 lg:px-16">
	<img
		class="absolute right-20 -top-4 h-auto w-2/6"
		src={Image}
		alt="stake your SCRT with Secret University"
	/>
	<div
		class="items-center overflow-hidden rounded-lg bg-dark-4 px-4 py-6 shadow-lg lg:px-16 lg:py-12"
	>
		<div class="max-w-2xl">
			<h2 class="text-2xl font-semibold leading-6 text-white">Stake With Us</h2>
			<p class="mt-2 text-base text-gray">
				Secret University is committed to supporting developer growth and education on Secret
				Network. By staking your SCRT with us, you are supporting the university's operating costs
				as well as helping to fund developer, education-focused bounties.
			</p>

			<div class="my-4">
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
				class="inline-flex cursor-pointer items-center rounded-md bg-dark-blue px-4 py-2 text-base font-medium text-white hover:bg-darker-blue"
				>Stake</button
			>
		</div>
	</div>
</div>
