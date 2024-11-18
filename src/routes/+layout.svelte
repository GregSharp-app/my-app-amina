<script lang="ts">
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import Navbar from '$lib/my-app/Navbar.svelte';
	import PageSignIn from '$lib/my-app/PageSignIn.svelte';
	import { auth, firestore ,storage} from '$lib/rencode/firebase/firebase';
	import { ModeWatcher } from 'mode-watcher';
	import { FirebaseApp, SignedIn, SignedOut } from 'sveltefire';
	import '../app.css';
	import '../global.css';
	let { children } = $props();
</script>

<PageSignIn />
<!-- <FirebaseApp {auth} {firestore} {storage}>
	<SignedOut>
		<PageSignIn />
	</SignedOut>

	<SignedIn>
		<main class="min-h-screen">
			{@render children?.()}
		</main>
		<Navbar />
	</SignedIn>

	<Toaster position="top-center" />
	<ModeWatcher />
</FirebaseApp> -->
