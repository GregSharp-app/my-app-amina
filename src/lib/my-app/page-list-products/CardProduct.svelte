<script lang="ts">
	import { auth, listCollections, type TypeProduct } from '$lib/rencode/firebase/firebase';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { DownloadURL, StorageList, userStore } from 'sveltefire';
	import { HeartIcon, ImageOffIcon, Loader2Icon, MessageCircle, Phone } from 'lucide-svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { AddFavourite, getLinkWtspPhoneNumber, RemoveFavourite } from '$lib/rencode/utility';
	import {  draw } from 'svelte/transition';

	interface TypeProps {
		product: TypeProduct;
		children?: any;
	}

	let { product, children }: TypeProps = $props();
	const user = userStore(auth);
	let isFavourited = $derived($user && product.listFavouriteIDs?.includes($user.uid));
	let isLoading = $state(false);

	async function toggleFavourite() {
		if (!$user || !product.id) {
			return;
		}
		isLoading = true;

		if (isFavourited) {
			await RemoveFavourite(product.id, $user.uid);
		} else {
			await AddFavourite(product.id, $user.uid);
		}
		isLoading = false;
	}

</script>

<div class="mb-4 space-y-2 rounded-sm p-3 outline outline-1 outline-input">
	<!-- owner -->
	<div class="flex items-center gap-2 text-sm">
		<Avatar.Root>
			<Avatar.Image src={product.ownerImageUrl} alt="Avatar" />
			<Avatar.Fallback>{product.ownerUsername?.[0] ?? 'U'}</Avatar.Fallback>
		</Avatar.Root>
		<span>{product.ownerUsername ?? 'User'}</span>
	</div>
	<!-- content -->
	<div class="space-y-2">
		<h4>{product.name}</h4>
		<ScrollArea orientation="horizontal">
			<StorageList let:list={list_images} ref={`${listCollections.products}/${product.id}`}>
				{#if list_images && list_images.items}
					<div class="flex w-full gap-4 p-2">
						{#each list_images.items as _src}
							<DownloadURL let:link ref={_src}>
								<img
									class="rounded-[0.5rem] outline outline-1 outline-secondary"
									src={link}
									alt={product.name}
								/>
							</DownloadURL>
						{/each}
					</div>
				{:else}
					<ImageOffIcon class="ss" />
				{/if}
				<span slot="loading">
					<Loader2Icon class="animate-spin" />
				</span>
			</StorageList>
		</ScrollArea>
	</div>

	<!-- Footer -->
	<div class="flex items-center">
		<span class="rounded-full px-2 py-1 font-bold text-primary">{product.price} DH</span>
		<div class="ms-auto space-x-1">
			<Button
				loading={isLoading}
				onclick={toggleFavourite}
				size="icon"
				class="relative text-primary"
				variant="secondary"
			>
				{#if isFavourited}
					<HeartIcon fill="currentColor" />
				{:else}
					<HeartIcon  />
				{/if}
				{#if product.listFavouriteIDs?.length && product.listFavouriteIDs?.length >= 1}
					<span class="pointer-events-none absolute text-white rounded-full px-1 text-xs bg-primary -top-2 -right-1 z-[1]"
						>{product.listFavouriteIDs.length}</span
					>
				{/if}
			</Button>
			<Button
				href={getLinkWtspPhoneNumber(product.whatsappPhoneNumber)}
				target="_blank"
				size="icon"
				class="bg-green-400 hover:bg-green-600"
			>
				<MessageCircle />
			</Button>
		</div>

		{@render children?.()}
	</div>
</div>
