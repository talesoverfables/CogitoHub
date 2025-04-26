<script>
	import { onMount } from 'svelte';


	let cogees = Math.floor(Math.random() * 1000) + 1;
	let dropdownOpen = false;
	let modalOpen = false;
	let toastVisible = false;

	function toggleDropdown() {
		dropdownOpen = !dropdownOpen;
	}

	function openModal() {
		modalOpen = true;
	}

	function closeModal() {
		modalOpen = false;
	}

	function submitQuery() {
		modalOpen = false;
		toastVisible = true;
		setTimeout(() => {
			toastVisible = false;
		}, 3000);
	}

	let floatingButton; // this will be used as a reference

	onMount(() => {
		const interval = setInterval(() => {
			if (floatingButton) {
				floatingButton.classList.add('animate-bounce');
				setTimeout(() => {
					floatingButton.classList.remove('animate-bounce');
				}, 1000); // remove after 1s
			}
		}, 5000); // every 5 seconds

		return () => clearInterval(interval); // clear when component unmounts
	});
</script>

<!-- Floating Button (needs binding!) -->
<button 
	bind:this={floatingButton}
	class="fixed bottom-10 right-10 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700"
	on:click={openModal}>
	+
</button>


{#if modalOpen}
<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
	<div class="bg-white rounded-lg shadow-lg p-6 w-96">
		<h2 class="text-lg font-semibold text-gray-800 mb-4">New Query</h2>
		<form on:submit|preventDefault={submitQuery}>
			<div class="mb-4">
				<label for="title" class="block text-sm font-medium text-gray-700">Title</label>
				<input id="title" type="text" class="w-full p-2 border border-gray-300 rounded-lg" required />
			</div>
			<div class="mb-4">
				<label for="description" class="block text-sm font-medium text-gray-700">Short Description</label>
				<textarea id="description" class="w-full p-2 border border-gray-300 rounded-lg" rows="3" required></textarea>
			</div>
			<div class="mb-4">
				<label for="tags" class="block text-sm font-medium text-gray-700">Tags</label>
				<input id="tags" type="text" placeholder="Comma-separated tags" class="w-full p-2 border border-gray-300 rounded-lg" />
			</div>
			<div class="flex justify-end space-x-2">
				<button type="button" class="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400" on:click={closeModal}>
					Cancel
				</button>
				<button type="submit" class="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
					Submit
				</button>
			</div>
		</form>
	</div>
</div>
{/if}

{#if toastVisible}
<div class="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 z-50">
	<span class="material-icons">check_circle</span>
	<span>Query submitted successfully!</span>
</div>
{/if}


<style>
	@import url('https://fonts.googleapis.com/css2?family=Open+Sauce+Sans:wght@400;600;700&display=swap');
</style>

<nav class="flex justify-between items-center h-16 px-6 bg-white border-b border-gray-200 font-sans relative">
	<!-- Left: Logo -->
	<img 
		src="/src/lib/Images/querito.png" 
		alt="Querito Logo" 
		class="h-10 w-auto transform transition-transform duration-200 hover:scale-110" 
	/>

	<!-- Center: Page Title -->
	<h1 class="text-xl font-bold text-gray-800">
		Querito - Real-Time Knowledge Exchange
	</h1>

	<!-- Right: Button -->
	<div class="relative">
		<button 
			class="flex items-center space-x-2 transform transition-transform duration-200 hover:scale-105 hover:animate-pulse"
			on:click={toggleDropdown}
		>
			<img src="/src/lib/Images/Cogee-coin.png" alt="Cogee Coin" class="h-11 w-11" />
			<span class="text-black font-medium">{cogees}</span>
		</button>

		<!-- Dropdown -->
		{#if dropdownOpen}
			<div 
				class="absolute right-0 mt-2 w-48 bg-gray-100 shadow-xl rounded-xl p-4 transition ease-out duration-300 transform opacity-0 translate-y-2"
				class:opacity-100={dropdownOpen}
				class:translate-y-0={dropdownOpen}
			>
				<a 
					href="#" 
					class="block text-gray-800 bg-indigo-100 hover:bg-indigo-200 hover:text-indigo-700 mb-2 py-2 px-3 rounded-lg transition-colors"
				>
					View My Rewards
				</a>
				<a 
					href="#" 
					class="block text-gray-800 bg-indigo-100 hover:bg-indigo-200 hover:text-indigo-700 py-2 px-3 rounded-lg transition-colors"
				>
					Claim Bonuses
				</a>
			</div>
		{/if}
	</div>
</nav>

<!-- Responsive Page Layout -->
<div class="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-[#d9d9d9]">

	<!-- Filter Panel -->
	<div class="col-span-1 bg-white rounded-xl shadow-md p-4">
		<h2 class="text-lg font-semibold text-gray-800 mb-4">Filter Discussions</h2>
		
		<!-- Search Bar -->
		<input 
			type="text" 
			placeholder="Search queries" 
			class="w-full p-2 border border-gray-300 rounded-lg mb-4"
		/>

		<!-- Topic Badges -->
		<div class="flex space-x-2 mb-4">
			<span class="px-3 py-1 bg-gray-200 text-gray-800 rounded-full cursor-pointer hover:bg-gray-300">Math</span>
			<span class="px-3 py-1 bg-gray-200 text-gray-800 rounded-full cursor-pointer hover:bg-gray-300">AI</span>
			<span class="px-3 py-1 bg-gray-200 text-gray-800 rounded-full cursor-pointer hover:bg-gray-300">History</span>
		</div>

		<!-- Checkboxes -->
		<div class="space-y-2 mb-4">
			<label class="flex items-center space-x-2">
				<input type="checkbox" class="form-checkbox text-indigo-600" />
				<span class="text-gray-800">Show AI Answers</span>
			</label>
			<label class="flex items-center space-x-2">
				<input type="checkbox" class="form-checkbox text-indigo-600" />
				<span class="text-gray-800">Show Only Mentor-Verified</span>
			</label>
		</div>

		<!-- Apply Filters Button -->
		<button class="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
			Apply Filters
		</button>
	</div>


	<!-- Center Discussion Feed -->
	<main class="col-span-1 md:col-span-2 bg-white p-4 shadow rounded">
		<h2 class="text-lg font-semibold text-gray-800 mb-4">Discussion Feed</h2>
		
		<!-- Example Post 1 -->
		<div class="bg-white rounded-2xl shadow-md p-6 mb-4 hover:shadow-lg transition-all">
			<h3 class="text-xl font-bold text-gray-800 mb-2">What is the difference between AI and Machine Learning?</h3>
			<p class="text-sm text-gray-500 mb-4">Asked by John Doe</p>
			
			<!-- Tags -->
			<div class="flex space-x-2 mb-4">
				<span class="px-3 py-1 bg-gray-200 text-gray-800 rounded-full">AI</span>
				<span class="px-3 py-1 bg-gray-200 text-gray-800 rounded-full">Machine Learning</span>
			</div>
			
			<!-- Answer Type Badges -->
			<div class="flex space-x-2 mb-4 relative">
				<span 
					class="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-200 text-yellow-800 relative group"
				>
					AI Generated
					<div 
						class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-700 text-white text-xs p-2 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
					>
						This answer was generated by an AI system.
					</div>
				</span>
				<span 
					class="text-xs font-semibold px-2 py-1 rounded-full bg-green-200 text-green-800 relative group"
				>
					Mentor Verified
					<div 
						class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-700 text-white text-xs p-2 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
					>
						This answer has been verified by a mentor.
					</div>
				</span>
				<span 
					class="text-xs font-semibold px-2 py-1 rounded-full bg-blue-200 text-blue-800 relative group"
				>
					Peer Answer
					<div 
						class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-700 text-white text-xs p-2 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
					>
						This answer was provided by a peer.
					</div>
				</span>
			</div>
			
			<!-- Answers Section -->
			<div class="text-gray-600 mb-4">
				<p>3 Answers</p>
			</div>
			
			<!-- Answer Now Button -->
			<button class="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
				Answer Now
			</button>

			<!-- Cogees Reward -->
			<div class="flex items-center space-x-2 mt-2">
				<img src="/src/lib/Images/Cogee-coin.png" alt="Cogee Coin" class="h-4 w-4" />
				<p class="text-cyan-600 font-bold text-sm">+10 Cogees!</p>
			</div>
		</div>

		<!-- Example Post 2 -->
		<div class="bg-white rounded-2xl shadow-md p-6 mb-4 hover:shadow-lg transition-all">
			<h3 class="text-xl font-bold text-gray-800 mb-2">How does blockchain technology work?</h3>
			<p class="text-sm text-gray-500 mb-4">Asked by Jane Smith</p>
			
			<!-- Tags -->
			<div class="flex space-x-2 mb-4">
				<span class="px-3 py-1 bg-gray-200 text-gray-800 rounded-full">Blockchain</span>
				<span class="px-3 py-1 bg-gray-200 text-gray-800 rounded-full">Technology</span>
			</div>
			
			<!-- Answer Type Badges -->
			<div class="flex space-x-2 mb-4 relative">
				<span 
					class="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-200 text-yellow-800 relative group"
				>
					AI Generated
					<div 
						class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-700 text-white text-xs p-2 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
					>
						This answer was generated by an AI system.
					</div>
				</span>
				<span 
					class="text-xs font-semibold px-2 py-1 rounded-full bg-green-200 text-green-800 relative group"
				>
					Mentor Verified
					<div 
						class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-700 text-white text-xs p-2 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
					>
						This answer has been verified by a mentor.
					</div>
				</span>
				<span 
					class="text-xs font-semibold px-2 py-1 rounded-full bg-blue-200 text-blue-800 relative group"
				>
					Peer Answer
					<div 
						class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-700 text-white text-xs p-2 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
					>
						This answer was provided by a peer.
					</div>
				</span>
			</div>
			
			<!-- Answers Section -->
			<div class="text-gray-600 mb-4">
				<p>5 Answers</p>
			</div>
			
			<!-- Answer Now Button -->
			<button class="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
				Answer Now
			</button>

			<!-- Cogees Reward -->
			<div class="flex items-center space-x-2 mt-2">
				<img src="/src/lib/Images/Cogee-coin.png" alt="Cogee Coin" class="h-4 w-4" />
				<p class="text-cyan-600 font-bold text-sm">+10 Cogees!</p>
			</div>
		</div>
	</main>

	<!-- Right Sidebar -->
	<aside class="col-span-1 bg-white rounded-xl shadow-md p-4">
		<!-- Top Cogees Earners -->
		<h2 class="text-lg font-semibold text-gray-800 mb-4">Top Cogees Earners</h2>
		<ul class="space-y-6">
			<li class="space-y-2">
				<div class="flex items-center space-x-4">
					<img src="/src/lib/Images/avatar1.png" alt="Avatar 1" class="h-10 w-10 rounded-full" />
					<div>
						<p class="text-gray-800 font-medium">Alice Johnson</p>
						<p class="text-sm text-cyan-600 font-bold">+1200 Cogees</p>
					</div>
				</div>
				<!-- Progress Bar -->
				<div class="w-full bg-gray-200 rounded-full h-2">
					<div 
						class="bg-gradient-to-r from-indigo-400 to-pink-500 h-2 rounded-full transition-width duration-1000" 
						style="width: 90%;"
					></div>
				</div>
			</li>
			<li class="space-y-2">
				<div class="flex items-center space-x-4">
					<img src="/src/lib/Images/avatar2.png" alt="Avatar 2" class="h-10 w-10 rounded-full" />
					<div>
						<p class="text-gray-800 font-medium">Bob Smith</p>
						<p class="text-sm text-cyan-600 font-bold">+950 Cogees</p>
					</div>
				</div>
				<!-- Progress Bar -->
				<div class="w-full bg-gray-200 rounded-full h-2">
					<div 
						class="bg-gradient-to-r from-blue-400 to-green-400 h-2 rounded-full transition-width duration-1000" 
						style="width: 75%;"
					></div>
				</div>
			</li>
			<li class="space-y-2">
				<div class="flex items-center space-x-4">
					<img src="/src/lib/Images/avatar3.png" alt="Avatar 3" class="h-10 w-10 rounded-full" />
					<div>
						<p class="text-gray-800 font-medium">Charlie Brown</p>
						<p class="text-sm text-cyan-600 font-bold">+870 Cogees</p>
					</div>
				</div>
				<!-- Progress Bar -->
				<div class="w-full bg-gray-200 rounded-full h-2">
					<div 
						class="bg-gradient-to-r from-yellow-400 to-red-400 h-2 rounded-full transition-width duration-1000" 
						style="width: 65%;"
					></div>
				</div>
			</li>
		</ul>

		<!-- My Cogees -->
		<div class="mt-6">
			<h2 class="text-lg font-semibold text-gray-800 mb-2">My Cogees</h2>
			<div class="flex items-center space-x-2">
				<img src="/src/lib/Images/Cogee-coin.png" alt="Cogee Coin" class="h-6 w-6" />
				<span class="text-2xl font-bold text-indigo-600">{cogees}</span>
			</div>
		</div>

		<!-- Badges Earned -->
		<div class="mt-6">
			<h2 class="text-lg font-semibold text-gray-800 mb-2">Badges Earned</h2>
			<div class="flex flex-wrap gap-2">
				<span class="px-3 py-1 bg-yellow-200 text-yellow-800 text-sm font-semibold rounded-full">Top Contributor</span>
				<span class="px-3 py-1 bg-green-200 text-green-800 text-sm font-semibold rounded-full">Mentor</span>
				<span class="px-3 py-1 bg-blue-200 text-blue-800 text-sm font-semibold rounded-full">AI Expert</span>
				<span class="px-3 py-1 bg-purple-200 text-purple-800 text-sm font-semibold rounded-full">Early Adopter</span>
			</div>
		</div>
	</aside>
</div>
