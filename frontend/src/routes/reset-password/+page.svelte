<script>
    import { goto } from '$app/navigation';
    import { resetPassword, updatePassword } from '$lib/auth';
    
    let email = '';
    let newPassword = '';
    let confirmPassword = '';
    let loading = false;
    let error = null;
    let success = null;
    let isResetMode = true;

    // Check if we have a token in the URL (user clicked reset link in email)
    if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.hash.substring(1));
        if (params.get('type') === 'recovery') {
            isResetMode = false;
        }
    }

    async function handleSubmit() {
        loading = true;
        error = null;
        success = null;

        try {
            if (isResetMode) {
                const { error: resetError } = await resetPassword(email);
                if (resetError) throw resetError;
                success = 'Password reset instructions have been sent to your email';
            } else {
                if (newPassword !== confirmPassword) {
                    throw new Error("Passwords don't match");
                }
                const { error: updateError } = await updatePassword(newPassword);
                if (updateError) throw updateError;
                await goto('/login?message=Password has been reset successfully');
            }
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
        <div>
            <img class="mx-auto h-12 w-auto" src="/src/lib/Images/cogitohub-icon.png" alt="CogitoHub" />
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {isResetMode ? 'Reset your password' : 'Set new password'}
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
                Or
                <a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
                    return to sign in
                </a>
            </p>
        </div>
        <form class="mt-8 space-y-6" on:submit|preventDefault={handleSubmit}>
            {#if isResetMode}
                <div>
                    <label for="email-address" class="block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <div class="mt-1">
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            required
                            bind:value={email}
                            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
            {:else}
                <div class="space-y-4">
                    <div>
                        <label for="new-password" class="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <div class="mt-1">
                            <input
                                id="new-password"
                                name="new-password"
                                type="password"
                                required
                                bind:value={newPassword}
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label for="confirm-password" class="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <div class="mt-1">
                            <input
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                required
                                bind:value={confirmPassword}
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                </div>
            {/if}

            {#if error}
                <div class="rounded-md bg-red-50 p-4">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <h3 class="text-sm font-medium text-red-800">{error}</h3>
                        </div>
                    </div>
                </div>
            {/if}

            {#if success}
                <div class="rounded-md bg-green-50 p-4">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <h3 class="text-sm font-medium text-green-800">{success}</h3>
                        </div>
                    </div>
                </div>
            {/if}

            <div>
                <button
                    type="submit"
                    disabled={loading}
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {#if loading}
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                    {:else}
                        {isResetMode ? 'Send reset instructions' : 'Update password'}
                    {/if}
                </button>
            </div>
        </form>
    </div>
</div>