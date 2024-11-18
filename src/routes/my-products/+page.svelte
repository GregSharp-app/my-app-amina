<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import CardProduct from '$lib/my-app/page-list-products/CardProduct.svelte';
	import Topbar from '$lib/my-app/Topbar.svelte';
	import { auth, collection_products, firestore } from '$lib/rencode/firebase/firebase';
	import { DeleteProduct } from '$lib/rencode/utility';
	import { query, where } from 'firebase/firestore';
	import { Trash } from 'lucide-svelte';
	import { Collection, collectionStore } from 'sveltefire';

	async function deleteProduct(id?: string) {
		if (!id) return;

		// delete product
		if (confirm('Are you sure ?')) {
			await DeleteProduct(id);
		}
	}
</script>

<Topbar>
	<div class="flex gap-2 text-primary dark:text-purple-200">
		<h3>My Products</h3>
	</div>

</Topbar>

<Collection
	let:data={listMyProducts}
	ref={query(collection_products, where('ownerID', '==', auth.currentUser?.uid))}
>
	<!-- dispay products -->
	{#each listMyProducts as product (product.id)}
		<CardProduct {product}>
			<Button
				size="icon"
				class="ms-2"
				variant="destructive"
				onclick={async () => await deleteProduct(product.id)}
			>
				<Trash />
			</Button>
		</CardProduct>
	{/each}
</Collection>
