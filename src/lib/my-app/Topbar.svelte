<script>
	import { cn } from '$lib/utils';
	import Logo from './Logo.svelte';

	let { children,class : klass="" } = $props();
</script>

<section class={cn("flex items-center my-3",klass)}>
	{@render children?.()}
	<!-- <Logo /> -->
</section>
