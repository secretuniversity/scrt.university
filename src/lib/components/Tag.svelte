<script lang="ts">
	import type { Tag } from '$lib/models/index';
	export let tag: Tag;
</script>

<span
	class="inline-flex items-center rounded-full bg-gray px-3 py-0.5 text-sm font-medium text-dark-4"
>
	{tag.name}
</span>
