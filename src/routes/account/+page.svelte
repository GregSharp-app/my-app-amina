<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { auth } from '$lib/rencode/firebase/firebase';
	import { signOut, updateProfile } from 'firebase/auth';
	import { LogOutIcon } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { slide } from 'svelte/transition';
	import { userStore } from 'sveltefire';

	const user = userStore(auth);

	let userName = $state($user?.displayName);

	async function updateName() {
        if (!$user) {
            return;
        }
        // we are logged in
        toast.loading("Wait ...")
		try {
			await updateProfile($user, { displayName: userName });
			toast.success('Updated ');
            window.location.reload()
		} catch (error) {
			toast.error('Error Updating');
		}
	}

    function SignOut() {
        signOut(auth);
    }
    
</script>

<section class="my-4 flex h-screen flex-col gap-4">
	<h2 class="font-light">Hello 👋🏼,</h2>
	<div class="flex items-center gap-2">
		<Avatar.Root>
			<Avatar.Image src={$user?.photoURL} alt="@shadcn" />
			<Avatar.Fallback>{$user?.displayName?.[0]}</Avatar.Fallback>
		</Avatar.Root>
		<h5>{$user?.displayName}</h5>
	</div>

	<div class="space-y-3 rounded-sm p-4 text-sm outline outline-1 outline-accent">
		<span class="mb-4">Update Display Name</span>
		<Input placeholder={$user?.displayName} bind:value={userName} />
		<!-- if we have entered diffrent name -->
		{#if userName?.trim() != $user?.displayName}
			<Button onclick={updateName}>Update</Button>
		{/if}
	</div>

	<Button onclick={SignOut} variant="ghost" class="mt-6 text-red-600">
		<LogOutIcon /> Log out
	</Button>
</section>
