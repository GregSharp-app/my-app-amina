<script lang="ts">
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';

	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Settings2Icon } from 'lucide-svelte';
	import Topbar from '$lib/my-app/Topbar.svelte';
</script>

<Topbar>
	<div class="flex gap-2 text-primary dark:text-purple-200">
		<Settings2Icon />
		<h3>Settings</h3>
	</div>
</Topbar>

<section class="mt-4 space-y-3">
	<div class=" flex items-center justify-between rounded-sm p-4 text-sm outline outline-1 outline-accent">
		<span>Change Theme</span>

		<Button onclick={toggleMode} variant="outline" size="icon">
			<Sun
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<Moon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</div>
</section>
