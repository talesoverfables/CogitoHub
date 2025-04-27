<script>
    import { user } from '$lib/stores/userStore';
    import { signOut } from '$lib/auth';
    import { goto } from '$app/navigation';

    let showDropdown = false;
    let loading = false;

    async function handleLogout() {
        loading = true;
        const { error } = await signOut();
        if (!error) {
            await goto('/');
        }
        loading = false;
        showDropdown = false;
    }
</script>

{#if $user}
    <div class="relative">
        <button
            on:click={() => showDropdown = !showDropdown}
            class="flex items-center space-x-3 focus:outline-none"
        >
            <div class="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span class="text-sm font-medium text-gray-500">
                    {$user.email[0].toUpperCase()}
                </span>
            </div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                {$user.email.split('@')[0]}
            </span>
            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
        </button>

        {#if showDropdown}
            <div
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:divide-gray-700"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
            >
                <div class="py-1" role="none">
                    <a
                        href="/account"
                        class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        role="menuitem"
                    >
                        Account settings
                    </a>
                </div>
                <div class="py-1" role="none">
                    <button
                        on:click={handleLogout}
                        disabled={loading}
                        class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                        role="menuitem"
                    >
                        {#if loading}
                            <span class="flex items-center">
                                <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-gray-700 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing out...
                            </span>
                        {:else}
                            Sign out
                        {/if}
                    </button>
                </div>
            </div>
        {/if}
    </div>
{:else}
    <div class="flex space-x-4">
        <a
            href="/login"
            class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >
            Sign in
        </a>
        <a
            href="/register"
            class="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
        >
            Sign up
        </a>
    </div>
{/if}

<svelte:window on:click={(e) => {
    if (showDropdown && !e.target.closest('.relative')) {
        showDropdown = false;
    }
}} />