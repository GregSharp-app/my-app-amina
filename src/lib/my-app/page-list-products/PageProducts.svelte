<!-- firebase -->
<!-- https://www.npmjs.com/package/@capacitor-firebase/authentication -->
<!-- SHA key -->
<!-- https://github.com/capawesome-team/capacitor-firebase/blob/main/packages/authentication/docs/setup-google.md -->
<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import { collection_products, type TypeProduct } from '$lib/rencode/firebase/firebase';
	import {
		CalendarClockIcon,
		CircleDollarSign,
		GanttChartSquareIcon,
		HeartIcon,
		LayoutListIcon,
		Loader2Icon,
		SearchIcon,
		SortAsc,
		SortDesc
	} from 'lucide-svelte';
	import { Collection } from 'sveltefire';
	import CardProduct from './CardProduct.svelte';
	import { SortByDate, SortByLikes, SortByName, SortByPrice } from '$lib/rencode/utility';
	import Button from '$lib/components/ui/button/button.svelte';
	import { cn } from '$lib/utils';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	let searchTerm = $state('');

	// sorting
	const listSortBy = [
		{
			title: 'Likes',
			icon: HeartIcon,
			compareFn: SortByLikes
		},
		{
			title: 'Date',
			icon: CalendarClockIcon,
			compareFn: SortByDate
		},
		{
			title: 'Price',
			icon: CircleDollarSign,
			compareFn: SortByPrice
		},
		{
			title: 'Name',
			icon: GanttChartSquareIcon,
			compareFn: SortByName
		}
	];
	let selectedSort = $state(listSortBy[0]);
	let isAscending = $state(true);

	function SortListProducts(a: TypeProduct, b: TypeProduct): number {
		return isAscending ? selectedSort.compareFn(a, b) : -selectedSort.compareFn(a, b);
	}
</script>

<div class="flex items-center gap-2 rounded-b-sm p-4 text-primary dark:text-purple-200">
	<LayoutListIcon />
	<h3>products</h3>
</div>
<!-- Seraching -->
<section class="mb-4">
	<div class="flex items-center gap-2">
		<SearchIcon class="text-slate-500" />
		<Input placeholder="Search here ..." bind:value={searchTerm} />
	</div>
</section>
<!-- Sorting -->
<div class="mb-4">
	<div class="ms-4 flex items-center">
		<Button class="grow" onclick={() => (isAscending = !isAscending)} variant="ghost">
			<SortAsc class={cn(isAscending && 'rotate-180', 'duration-300')} />
		</Button>
		<ScrollArea orientation="horizontal" class="py-2">
			<div class="flex items-center gap-2">
				{#each listSortBy as element (element.title)}
					<Button
						class={element.title === selectedSort.title ? 'text-primary' : 'text-slate-500'}
						variant="link"
						onclick={() => (selectedSort = element)}
					>
						<element.icon />
						{element.title}
					</Button>
				{/each}
			</div>
		</ScrollArea>
	</div>
</div>

<section>
	<Collection ref={collection_products} let:data={listProducts}>
		<span slot="loading">
			<Loader2Icon class="mx-auto animate-spin" />
		</span>

		<!-- dispay products -->
		{#each listProducts
			.filter((pr) => pr.name.toLowerCase().includes(searchTerm.toLowerCase()))
			.sort(SortListProducts) as product (product.id)}
			<CardProduct {product} />
		{/each}
	</Collection>
</section>
