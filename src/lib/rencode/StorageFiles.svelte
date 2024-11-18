<script lang="ts">
	import { type StorageReference, list, deleteObject, ref, getStorage } from 'firebase/storage';
	import { XIcon } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { StorageList } from 'sveltefire';
	import { toast } from "svelte-sonner";
	import { DownloadURL } from 'sveltefire';
	import { storage } from './firebase/firebase';
	let {path} = $props();

	async function deleteImageFromCloud(item: StorageReference) {
		if (confirm(`delete ${item.name} `)) {
			try {
				
				await deleteObject(ref(storage, item.fullPath));
				toast.success('Success : Image Deleted');
			} catch (error) {
				console.log(error);
				toast.error('Error : check console');
			}
		}
	}

	let listItems: StorageReference[] | undefined = $state(undefined);
	$effect(() => {
		getListItems();	
	});

	async function getListItems() {
		listItems = undefined;
		listItems = (await list(ref(storage, path))).items;
	}
</script>

<div class="flex flex-wrap gap-2">

	{#if listItems && listItems.length === 0}
		<li>No images yet.</li>
	{:else if listItems}
		<!-- Listing the objects in the given folder -->
		{#each listItems as item}
			<DownloadURL let:link ref={item.fullPath}>
				<class class="relative size-10 overflow-hidden rounded-sm">
					<div class="h-full w-full">
						<img class=" w-full" src={link} alt="" />
					</div>
					<!-- actions -->
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<span
						class="absolute inset-0 grid cursor-pointer place-content-center text-red-400 opacity-0 duration-100 hover:bg-red-200 hover:opacity-100"
						onclick={async () => {
							await deleteImageFromCloud(item);
							await getListItems();
						}}
					>
						<XIcon />
					</span>
				</class>
			</DownloadURL>
		{/each}
	{/if}

	{#if listItems == undefined }
		Loading
	{/if}
	
</div>
