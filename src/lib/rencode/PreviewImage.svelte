<script lang="ts">
	import { cn } from '$lib/utils';
	import { XIcon } from 'lucide-svelte';
	
	let { delete: deleteItem, class: klass,image } = $props();
	let src: string = $state('');
	const fileReader = new FileReader();
	fileReader.readAsDataURL(image);
	fileReader.onload = function () {
		src = `${this.result}`;
	};
</script>

<span class={cn('relative overflow-hidden rounded-sm', klass)}>
	<img class="size-10" {src} alt="" />
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<span
		class="absolute inset-0 grid cursor-pointer place-content-center text-red-400 opacity-0 duration-100 hover:bg-red-200 hover:opacity-100"
		onclick={deleteItem}
	>
		<XIcon />
	</span>
</span>
