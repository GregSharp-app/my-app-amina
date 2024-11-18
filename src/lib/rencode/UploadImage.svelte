<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { AlertCircle, ImagePlus } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import PreviewImage from './PreviewImage.svelte';
	interface TypeProps {
		listFile: File[];
		classPreviwImage?: string;
	}
	let { listFiles = $bindable(), classPreviwImage = '' } = $props();

	function AddFiles(e: any) {
		let _files: File[] = e.target?.files ?? undefined;
		if (!_files) {
			toast.info('No image was selected');
			return;
		}
		for (let index = 0; index < _files.length; index++) {
			const element = _files[index];
			addToList(element);
		}
	}

	function addToList(_f: File) {
		for (let i = 0; i < listFiles.length; i++) {
			const element = listFiles[i];
			if (element?.name === _f.name) {
				return;
			}
		}

		listFiles = [...listFiles, _f];
	}

	function removeFromList(_f: File) {
		listFiles = listFiles.filter((e: File) => e.name !== _f.name);
	}
</script>

<div>
	<Button variant="ghost" class="text-primary">
		<label class="text-14 flex cursor-pointer items-center gap-2 p-2">
			<ImagePlus />
			<span>Add</span>
			<input class="hidden" type="file" multiple accept="image/*" onchange={AddFiles} />
		</label>
	</Button>

	<!-- display Images -->
	<div>
		{#if listFiles.length}
			<div class="flex items-center justify-between gap-2">
				<span>Selected : {listFiles.length}</span>
				<Button
					onclick={() => {
						toast.info('Press an image to remove it.', {
							action: {
								label: 'ok',
								onClick: () => {}
							}
						});
					}}
					variant="ghost"
				>
					<AlertCircle />
				</Button>
			</div>
		{/if}
		<div class="mt-2 flex flex-wrap gap-1">
			{#each listFiles as element}
				<PreviewImage
					class={classPreviwImage}
					delete={() => {
						removeFromList(element);
					}}
					image={element}
				/>
			{/each}
		</div>
	</div>
</div>
