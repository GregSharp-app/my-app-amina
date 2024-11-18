<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { auth, type TypeProduct } from '$lib/rencode/firebase/firebase';
	import UploadImage from '$lib/rencode/UploadImage.svelte';
	import { AddProduct } from '$lib/rencode/utility';
	import { BadgeAlertIcon, Package2, PlusCircleIcon } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import { userStore } from 'sveltefire';
	const user = userStore(auth);
	// data
	const product : TypeProduct = $state({
		name: '10kg ',
		price: 500,
		imageUrl: '',
		description: '',
		whatsappPhoneNumber: '0658061012',
		ownerID: ''
	}) 
	let listPictures = $state([]);


	let errorMessage: any = $state(undefined);
    let isLoading = $state(false)
    // functions
	async function add() {
		// reset errors
		errorMessage = '';
        isLoading=true;

		// try again
		product.ownerID = $user?.uid ?? '';
		product.ownerImageUrl = $user?.photoURL ?? '';
		product.ownerUsername = $user?.displayName ?? '';

        errorMessage = await AddProduct(product, listPictures);
        isLoading=false
	}
</script>

<div class="flex gap-2 rounded-b-sm p-4 text-primary dark:text-purple-200">
	<Package2 />
	<h3>Add product</h3>
</div>
<section class="mt-4 space-y-4">
	<div class="space-y-3 rounded-sm p-4 outline outline-1 outline-accent">
		<!-- name -->
		<div class="space-y-1">
			<span class="text-sm">Name :</span>
			<Input placeholder="5 checkens, 10KG Carrots ..." bind:value={product.name} />
		</div>

		<!-- price -->
		<div class="space-y-1">
			<span class="text-sm">Price (DH):</span>
			<Input min={0} type="number" placeholder="600" bind:value={product.price} />
		</div>

		<!-- phones -->
		<div class="space-y-1">
			<span class="text-sm">Whatsapp :</span>
			<Input maxlength={10} placeholder="0612345678" bind:value={product.whatsappPhoneNumber} />
		</div>

		<!-- description -->
		<div class="space-y-1">
			<span class="text-sm">Description :</span>
			<Textarea placeholder="Checkns breed, ..." bind:value={product.description} />
		</div>

		<Separator />
		<!-- pictures -->
		<div class="space-y-1">
			<span class="text-sm">Pictures :</span>
			<UploadImage bind:listFiles={listPictures} />
		</div>
		<Separator />

		{#if errorMessage}
			<span transition:slide class="flex items-center gap-2 text-sm text-red-600">
				<BadgeAlertIcon />
				{errorMessage}
			</span>
		{/if}

		<Button loading={isLoading} onclick={add} class="w-full">
			<PlusCircleIcon /> Add
		</Button>
	</div>
</section>
