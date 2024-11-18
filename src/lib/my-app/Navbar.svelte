<script lang="ts">
	import HomeIcon from 'lucide-svelte/icons/house';
	import PlusIcon from 'lucide-svelte/icons/plus';
	import SettingsIcon from 'lucide-svelte/icons/settings';
	import UserIcon from 'lucide-svelte/icons/user';

	import { page } from '$app/stores';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { slide } from 'svelte/transition';
	import { Package2Icon, Settings2Icon } from 'lucide-svelte';

	const listNavItems = [
		{
			title: `Products`,
			href: `/`,
			icon: HomeIcon
		},
		{
			title: `Add`,
			href: `/add`,
			icon: PlusIcon
		},
		{
			title: `My Products`,
			href: `/my-products`,
			icon: Package2Icon
		},
		{
			title: `Account`,
			href: `/account`,
			icon: UserIcon
		},
		{
			title: `Settings`,
			href: `/settings`,
			icon: Settings2Icon
		}
	];

</script>

<div class="sticky  bottom-0 left-0 right-0 backdrop-blur-lg text-slate-500">
	<Separator/>
	<div class="max-w-screen-xs mx-auto max-w-screen-sm flex items-center justify-evenly ">
		{#each listNavItems as navItem}
			<a
				class="flex grow flex-col items-center py-4 duration-300 {$page.url.pathname ===
				navItem.href
					? 'text-primary'
					: 'text-secondary-inactive'} active:text-primary"
				href={navItem.href}
			>
				<navItem.icon size="1.5rem" />
			</a>
			<span class="h-7 w-px rounded-full bg-slate-500/15 last:hidden"></span>
		{/each}
	</div>
</div>
