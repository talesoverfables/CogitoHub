<script>
	import '../app.css';
	
	let { children } = $props();
	import UserIcon from '/src/lib/Images/user1.png'; // or whatever your user icon is
</script>

<nav class="flex justify-between items-center h-16 px-6 bg-white  font-sans relative">
	<div class="absolute top-0 right-0 flex items-center space-x-2 p-4">
		<img src={UserIcon} alt="User Icon" class="w-8 h-8 rounded-full" />
		<span>/user</span>
	</div>
</nav>

{@render children()}
