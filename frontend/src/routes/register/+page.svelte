<script>
    import { signUpWithEmail } from '$lib/auth';
    import { goto } from '$app/navigation';

    let email = '';
    let password = '';
    let confirmPassword = '';
    let loading = false;
    let error = null;

    async function handleSubmit() {
        loading = true;
        error = null;

        if (password !== confirmPassword) {
            error = "Passwords don't match";
            loading = false;
            return;
        }

        const { data, error: signUpError } = await signUpWithEmail(email, password, {
            email,
            updated_at: new Date().toISOString()
        });
        
        if (signUpError) {
            error = signUpError.message;
            loading = false;
            return;
        }

        // If email confirmation is required, show success message
        if (data?.user?.confirmationSentAt) {
            await goto('/login?message=Please check your email to confirm your account');
        } else {
            await goto('/dashboard');
        }
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
        <div>
            <img class="mx-auto h-12 w-auto" src="/src/lib/Images/cogitohub-icon.png" alt="CogitoHub" />
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Create your account
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
                Or
                <a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
                    sign in to your existing account
                </a>
            </p>
        </div>
        <form class="mt-8 space-y-6" on:submit|preventDefault={handleSubmit}>
            <div class="rounded-md shadow-sm -space-y-px">
                <div>
                    <label for="email-address" class="sr-only">Email address</label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        required
                        bind:value={email}
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                    />
                </div>
                <div>
                    <label for="password" class="sr-only">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        bind:value={password}
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                    />
                </div>
                <div>
                    <label for="confirm-password" class="sr-only">Confirm Password</label>
                    <input
                        id="confirm-password"
                        name="confirm-password"
                        type="password"
                        required
                        bind:value={confirmPassword}
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Confirm Password"
                    />
                </div>
            </div>

            {#if error}
                <div class="rounded-md bg-red-50 p-4">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <h3 class="text-sm font-medium text-red-800">
                                {error}
                            </h3>
                        </div>
                    </div>
                </div>
            {/if}

            <div>
                <button
                    type="submit"
                    disabled={loading}
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {#if loading}
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    {:else}
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                            </svg>
                        </span>
                    {/if}
                    {loading ? 'Creating account...' : 'Create account'}
                </button>
            </div>
        </form>
    </div>
</div>