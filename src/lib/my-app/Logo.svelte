<script>
	import { LeafIcon } from 'lucide-svelte';
	let { ...rest } = $props();
</script>
<a href="/" class="rounded-full p-2 bg-accent">
    <LeafIcon class="text-primary" {...rest} />
</a>
