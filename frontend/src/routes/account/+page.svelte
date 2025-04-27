<script>
    import { goto } from '$app/navigation';
    import { user } from '$lib/stores/userStore';
    import { supabase } from '$lib/supabaseClient';

    /** @type {import('./$types').PageData} */
    let { data } = $props();
    
    let loading = $state(false);
    let error = $state(null);
    let editMode = $state(false);
    let fullName = $state(data.profile?.full_name || '');

    $effect(() => {
        if (data.error) {
            error = data.error;
        }
    });

    async function updateProfile() {
        try {
            loading = true;
            error = null;

            const { error: updateError } = await supabase
                .from('profiles')
                .update({ full_name: fullName })
                .eq('id', $user?.id);

            if (updateError) throw updateError;

            editMode = false;
            data.profile.full_name = fullName;
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    }

    let userData = $derived({
        email: data.session?.user?.email,
        created_at: data.session?.user?.created_at ? new Date(data.session.user.created_at).toLocaleDateString() : '',
        full_name: data.profile?.full_name || data.session?.user?.user_metadata?.full_name || 'Not set'
    });
</script>

<div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <!-- Header -->
            <div class="px-6 py-8 bg-indigo-600">
                <h1 class="text-2xl font-bold text-white">Account Settings</h1>
            </div>

            <div class="p-6 space-y-6">
                {#if error}
                    <div class="bg-red-50 border border-red-200 text-sm text-red-600 rounded-md p-4">
                        {error}
                    </div>
                {/if}

                <!-- Profile Section -->
                <div class="border-b border-gray-200 pb-6">
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">Profile Information</h2>
                    <div class="grid grid-cols-1 gap-4">
                        <div>
                            <div class="text-sm font-medium text-gray-600">Email Address</div>
                            <div class="mt-1 text-gray-900">{userData.email}</div>
                        </div>
                        <div>
                            <div class="text-sm font-medium text-gray-600">Full Name</div>
                            {#if editMode}
                                <div class="mt-1 flex items-center gap-2">
                                    <input
                                        type="text"
                                        bind:value={fullName}
                                        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    <button
                                        onclick={updateProfile}
                                        disabled={loading}
                                        class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        {#if loading}
                                            <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            Saving...
                                        {:else}
                                            Save
                                        {/if}
                                    </button>
                                    <button
                                        onclick={() => editMode = false}
                                        class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            {:else}
                                <div class="mt-1 flex items-center justify-between">
                                    <span class="text-gray-900">{userData.full_name}</span>
                                    <button
                                        onclick={() => editMode = true}
                                        class="text-sm text-indigo-600 hover:text-indigo-500"
                                    >
                                        Edit
                                    </button>
                                </div>
                            {/if}
                        </div>
                        <div>
                            <div class="text-sm font-medium text-gray-600">Member Since</div>
                            <div class="mt-1 text-gray-900">{userData.created_at}</div>
                        </div>
                    </div>
                </div>

                <!-- Account Stats -->
                <div>
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">Account Statistics</h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <p class="text-sm font-medium text-gray-600">Total Questions</p>
                            <p class="mt-1 text-2xl font-semibold text-indigo-600">0</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <p class="text-sm font-medium text-gray-600">Total Answers</p>
                            <p class="mt-1 text-2xl font-semibold text-indigo-600">0</p>
                        </div>
                    </div>
                </div>

                <!-- Actions -->
                <div class="flex justify-end space-x-3">
                    <button 
                        class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        onclick={() => goto('/')}
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>