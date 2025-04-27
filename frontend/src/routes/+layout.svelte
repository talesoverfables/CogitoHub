<script>
	import '../app.css';
	import User from '$lib/components/user.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { user } from '$lib/stores/userStore';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	// Props for SvelteKit layouts
	let { children } = $props();

	onMount(async () => {
		if (browser) {
			// Get initial session
			const { data: { session } } = await supabase.auth.getSession();
			if (session) {
				user.set(session.user);
			}

			// Listen for auth changes
			const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
				user.set(session?.user ?? null);
			});

			// Cleanup subscription on unmount
			return () => subscription.unsubscribe();
		}
	});
</script>

<div class="min-h-screen flex flex-col bg-gray-100 font-sans">
	<!-- Navigation Bar -->
	<nav class="sticky top-0 bg-white shadow-md z-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center h-16">
				<!-- Left side: Links -->
				<div class="flex space-x-6">
					<a href="/" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-semibold">Home</a>
					<a href="/coursito" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-semibold">Coursito</a>
					<a href="/querito" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-semibold">Querito</a>
					<a href="/coachpilot" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-semibold">Coachpilot AI</a>
					<a href="/resources" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-semibold">Resources</a>
				</div>

				<!-- Right side: User Profile -->
				<div class="flex items-center">
					<User />
				</div>
			</div>
		</div>
	</nav>

	<!-- Main Content -->
	<main class="flex-grow">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="bg-gray-200">
		<div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				
				<div>
					<h3 class="text-gray-700 font-semibold mb-4">About</h3>
					<ul class="space-y-2">
						<li><a href="/about" class="text-gray-600 hover:text-gray-800">Our Story</a></li>
						<li><a href="/team" class="text-gray-600 hover:text-gray-800">Team</a></li>
						<li><a href="/careers" class="text-gray-600 hover:text-gray-800">Careers</a></li>
					</ul>
				</div>

				<div>
					<h3 class="text-gray-700 font-semibold mb-4">Resources</h3>
					<ul class="space-y-2">
						<li><a href="/docs" class="text-gray-600 hover:text-gray-800">Documentation</a></li>
						<li><a href="/tutorials" class="text-gray-600 hover:text-gray-800">Tutorials</a></li>
						<li><a href="/blog" class="text-gray-600 hover:text-gray-800">Blog</a></li>
					</ul>
				</div>

				<div>
					<h3 class="text-gray-700 font-semibold mb-4">Contact</h3>
					<ul class="space-y-2">
						<li><a href="/contact" class="text-gray-600 hover:text-gray-800">Contact Us</a></li>
						<li><a href="/support" class="text-gray-600 hover:text-gray-800">Support</a></li>
						<li><a href="/faq" class="text-gray-600 hover:text-gray-800">FAQ</a></li>
					</ul>
				</div>

			</div>
		</div>
	</footer>

</div>
