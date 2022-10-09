<script lang="ts">
	import type { Tag } from '$lib/models/index';
	export let tag: Tag;
</script>

<span
	class="inline-flex items-center rounded-full bg-dark-blue px-3 py-1 text-sm font-medium text-white"
>
	{tag.name}
</span>
