<script>
    import { user } from '$lib/stores/userStore';
    import { supabase } from '$lib/supabaseClient';
    import { goto } from '$app/navigation';
    import { fade, slide } from 'svelte/transition';

    // State
    let dropdownOpen = false;
    let isSigningOut = false;

    // Function to get initials from email
    function getInitials(email) {
        if (!email) return '?';
        const localPart = email.split('@')[0];
        return localPart.charAt(0).toUpperCase();
    }

    // Default image path
    const defaultUserImage = '/src/lib/Images/user1.png';
    
    // Handle click outside to close dropdown
    function handleClickOutside(event) {
        const userContainer = event.target.closest('.user-container');
        if (!userContainer && dropdownOpen) {
            dropdownOpen = false;
        }
    }

    // Toggle dropdown
    function toggleDropdown(event) {
        event.stopPropagation();
        dropdownOpen = !dropdownOpen;
    }

    // Sign out function
    async function handleSignOut() {
        try {
            isSigningOut = true;
            dropdownOpen = false;
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            goto('/');
        } catch (error) {
            console.error('Error signing out:', error.message);
        } finally {
            isSigningOut = false;
        }
    }

    function handleSettings() {
        console.log('Settings clicked');
        dropdownOpen = false;
    }
</script>

{#if isSigningOut}
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]" transition:fade>
        <div class="bg-white rounded-lg p-4 flex items-center gap-3 shadow-xl">
            <div class="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <span class="text-gray-800 font-medium">Signing you out...</span>
        </div>
    </div>
{/if}

<div class="user-container relative z-50">
    <button 
        on:click={toggleDropdown}
        class="flex items-center gap-2 focus:outline-none"
    >
        {#if $user}
            <div class="relative group">
                {#if $user.user_metadata?.avatar_url}
                    <img 
                        src={$user.user_metadata.avatar_url} 
                        alt="User avatar" 
                        class="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                    />
                {:else}
                    <div class="relative">
                        <img 
                            src={defaultUserImage}
                            alt="Default avatar" 
                            class="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                        />
                        <div class="absolute inset-0 flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 bg-opacity-80 text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                            {getInitials($user.email)}
                        </div>
                    </div>
                {/if}
            </div>
            <div class="text-sm">
                <p class="font-semibold text-gray-800">{$user.email?.split('@')[0] || 'User'}</p>
                <p class="text-gray-500 text-xs">{$user.email || ''}</p>
            </div>
        {:else}
            <div class="flex items-center gap-2">
                <img 
                    src={defaultUserImage}
                    alt="Guest user" 
                    class="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                />
                <div class="text-sm">
                    <p class="font-semibold text-gray-800">Guest</p>
                    <p class="text-gray-500 text-xs">Sign in</p>
                </div>
            </div>
        {/if}
    </button>

    {#if dropdownOpen}
        <div 
            class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100 transform transition-all duration-200 ease-out"
            transition:slide={{ duration: 200 }}
        >
            {#if $user}
                <ul class="py-1">
                    <li>
                        <a 
                            href="/account"
                            class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        >
                            <span class="flex-grow">Account</span>
                        </a>
                    </li>
                    <li>
                        <button 
                            on:click={handleSettings}
                            class="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        >
                            <span class="flex-grow">Settings</span>
                        </button>
                    </li>
                    <li class="border-t border-gray-100 my-1"></li>
                    <li>
                        <button 
                            on:click={handleSignOut}
                            class="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            disabled={isSigningOut}
                        >
                            <span class="flex-grow">Sign Out</span>
                        </button>
                    </li>
                </ul>
            {:else}
                <ul class="py-1">
                    <li>
                        <a 
                            href="/login"
                            class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        >
                            Sign In
                        </a>
                    </li>
                    <li>
                        <a 
                            href="/register"
                            class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        >
                            Register
                        </a>
                    </li>
                </ul>
            {/if}
        </div>
    {/if}
</div>

<style>
    .user-container {
        position: relative;
        padding: 1rem;
    }
</style>