<!-- firebase -->
<!-- https://www.npmjs.com/package/@capacitor-firebase/authentication -->
<!-- SHA key -->
<!-- https://github.com/capawesome-team/capacitor-firebase/blob/main/packages/authentication/docs/setup-google.md -->
<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { auth } from '$lib/rencode/firebase/firebase';
	import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
	import {
		GoogleAuthProvider,
		signInWithCredential,
		signInWithPopup,
	
	} from 'firebase/auth';
	import { LogInIcon } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import Logo from './Logo.svelte';

	const signInWithGoogle = async () => {
		toast.loading("wait ...")
		try {
			const result = await FirebaseAuthentication.signInWithGoogle();
			toast('Welcome ' + result.user?.displayName);

			if (result.credential?.idToken) {
				const credential = GoogleAuthProvider.credential(result.credential.idToken);

				// Update Firebase Auth state
				const userCredential = await signInWithCredential(auth, credential);
				toast(' ' + userCredential.user.displayName);
			}

			toast.success("Welcome!")
		} catch (error) {
			toast.error('' + error, {
				dismissable: true
			});
		}
	};

	// web deugging, remove later
	let isDebug = $state(true);
	const provider = new GoogleAuthProvider();
	function signin_web() {
		signInWithPopup(auth, provider);
	}
</script>

<section class="mt-[30%] mx-5 grid">
	<div class="flex gap-2 items-center justify-center">
		<Logo/>
		<span class="text-primary"><b>Agri</b>culture</span>
	</div>
	
	<div class="space-y-8 mt-7">
		<h3 class="font-semibold">Welcome,</h3>
		<span class="text-slate-600 mt-2">Please login with your Google Account</span>

		<div class="grid gap-5">
			<Button onclick={signInWithGoogle}><LogInIcon /> Sign in</Button>
			{#if isDebug}
				<Button onclick={signin_web}>sign in Web</Button>
			{/if}
		</div>
	</div>
</section>
