<script>
    import { user } from '$lib/stores/userStore';
    import { supabase } from '$lib/supabaseClient';

    // Function to get initials from email
    function getInitials(email) {
        if (!email) return '?';
        const localPart = email.split('@')[0];
        return localPart.charAt(0).toUpperCase();
    }

    // Default image path
    const defaultUserImage = '/src/lib/Images/user1.png';
    
    // Dropdown state
    let dropdownOpen = false;

    // Toggle dropdown
    function toggleDropdown() {
        dropdownOpen = !dropdownOpen;
    }

    // Handle click outside to close dropdown
    function handleClickOutside(event) {
        const userContainer = event.target.closest('.user-container');
        if (!userContainer && dropdownOpen) {
            dropdownOpen = false;
        }
    }

    // Sign out function
    async function signOut() {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            dropdownOpen = false;
        }
    }
</script>

<svelte:window on:click={handleClickOutside}/>

<div class="user-container relative">
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
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-50"
            style="top: 100%;"
        >
            {#if $user}
                <a 
                    href="/account" 
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                    Account
                </a>
                <a 
                    href="/settings" 
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                    Settings
                </a>
                <hr class="my-1 border-gray-200" />
                <button 
                    on:click={signOut}
                    class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                    Sign Out
                </button>
            {:else}
                <a 
                    href="/login" 
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                    Sign In
                </a>
                <a 
                    href="/register" 
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                    Register
                </a>
            {/if}
        </div>
    {/if}
</div>

<style>
    .user-container {
        padding: 1rem;
    }
</style>