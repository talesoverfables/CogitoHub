<script>
    import { updatePassword, updateUserProfile } from '$lib/auth';
    import { user } from '$lib/stores/userStore';

    let loading = false;
    let error = null;
    let success = null;
    let currentPassword = '';
    let newPassword = '';
    let confirmPassword = '';

    // Profile fields
    let profile = {
        full_name: $user?.user_metadata?.full_name || '',
        avatar_url: $user?.user_metadata?.avatar_url || '',
        bio: $user?.user_metadata?.bio || ''
    };

    async function handleProfileUpdate() {
        loading = true;
        error = null;
        success = null;

        try {
            const { error: updateError } = await updateUserProfile(profile);
            if (updateError) throw updateError;
            success = 'Profile updated successfully';
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    }

    async function handlePasswordChange() {
        loading = true;
        error = null;
        success = null;

        try {
            if (newPassword !== confirmPassword) {
                throw new Error("Passwords don't match");
            }

            const { error: updateError } = await updatePassword(newPassword);
            if (updateError) throw updateError;
            
            success = 'Password updated successfully';
            currentPassword = '';
            newPassword = '';
            confirmPassword = '';
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    }
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="space-y-8 divide-y divide-gray-200">
        <!-- Profile section -->
        <div>
            <div>
                <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                    Profile
                </h3>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Update your personal information
                </p>
            </div>

            <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div class="sm:col-span-4">
                    <label for="full_name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Full name
                    </label>
                    <div class="mt-1">
                        <input
                            type="text"
                            name="full_name"
                            id="full_name"
                            bind:value={profile.full_name}
                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                </div>

                <div class="sm:col-span-6">
                    <label for="bio" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Bio
                    </label>
                    <div class="mt-1">
                        <textarea
                            id="bio"
                            name="bio"
                            rows="3"
                            bind:value={profile.bio}
                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        ></textarea>
                    </div>
                    <p class="mt-2 text-sm text-gray-500">
                        Write a few sentences about yourself.
                    </p>
                </div>

                <div class="sm:col-span-6">
                    <label for="avatar_url" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Avatar URL
                    </label>
                    <div class="mt-1">
                        <input
                            type="text"
                            name="avatar_url"
                            id="avatar_url"
                            bind:value={profile.avatar_url}
                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                </div>
            </div>

            <div class="pt-5">
                <div class="flex justify-end">
                    <button
                        type="button"
                        on:click={handleProfileUpdate}
                        disabled={loading}
                        class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>

        <!-- Change password section -->
        <div class="pt-8">
            <div>
                <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                    Change password
                </h3>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Update your password
                </p>
            </div>

            <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div class="sm:col-span-4">
                    <label for="new_password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        New password
                    </label>
                    <div class="mt-1">
                        <input
                            type="password"
                            name="new_password"
                            id="new_password"
                            bind:value={newPassword}
                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                </div>

                <div class="sm:col-span-4">
                    <label for="confirm_password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Confirm new password
                    </label>
                    <div class="mt-1">
                        <input
                            type="password"
                            name="confirm_password"
                            id="confirm_password"
                            bind:value={confirmPassword}
                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                </div>
            </div>

            <div class="pt-5">
                <div class="flex justify-end">
                    <button
                        type="button"
                        on:click={handlePasswordChange}
                        disabled={loading}
                        class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        {loading ? 'Updating...' : 'Update password'}
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Notifications -->
    {#if error || success}
        <div class="fixed bottom-0 right-0 m-6">
            <div class="rounded-md {error ? 'bg-red-50' : 'bg-green-50'} p-4">
                <div class="flex">
                    <div class="flex-shrink-0">
                        {#if error}
                            <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                            </svg>
                        {:else}
                            <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                            </svg>
                        {/if}
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium {error ? 'text-red-800' : 'text-green-800'}">
                            {error || success}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>