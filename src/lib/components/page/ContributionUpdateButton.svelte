<!-- 
    ContributionUpdateButton.svelte

    This component is used to allow a user to update a specfic contribution.
    It is used on a particular contribution page (e.g video, article, secret box, or pathway).
    It is only visible to the user who created the contribution.
-->
<script lang="ts">
	import { goto } from '$app/navigation';
	import EditIcon from '$lib/assets/edit_white.svg';
	import { user } from '$lib/stores';

	export let contribution: Contributions.UserContribution;
	let isContributionOwner = false;

	$: {
		if ($user) {
			isContributionOwner = $user.val.id === contribution.contributor;
		}
	}
</script>

{#if isContributionOwner}
	<button
		on:click={() => {
			goto(`/update/${contribution.kind}/${contribution.id}`);
		}}
		class="rounded-full bg-dark-4 px-3 py-3 text-white"
		><img class="mx-auto h-4 w-4" src={EditIcon} alt="Edit your contribution" /></button
	>
{/if}
