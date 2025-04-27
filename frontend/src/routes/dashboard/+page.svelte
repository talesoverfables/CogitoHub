<script>
    import { user } from '$lib/stores/userStore';

    /** @type {import('./$types').PageData} */
    let { data } = $props();

    let stats = {
        totalNotes: 0,
        totalProjects: 0,
        totalResources: 0,
        recentActivity: []
    };
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Welcome Section -->
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Welcome{#if $user?.email}, {$user.email.split('@')[0]}{/if}! 👋
            </h1>
            <p class="mt-2 text-gray-600 dark:text-gray-400">
                Here's what's happening in your workspace
            </p>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <!-- Notes Stats -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div class="flex items-center justify-between">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Notes</h3>
                    <span class="text-2xl text-indigo-600 dark:text-indigo-400">{stats.totalNotes}</span>
                </div>
                <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Total notes created</p>
            </div>

            <!-- Projects Stats -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div class="flex items-center justify-between">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Projects</h3>
                    <span class="text-2xl text-indigo-600 dark:text-indigo-400">{stats.totalProjects}</span>
                </div>
                <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Active projects</p>
            </div>

            <!-- Resources Stats -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div class="flex items-center justify-between">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Resources</h3>
                    <span class="text-2xl text-indigo-600 dark:text-indigo-400">{stats.totalResources}</span>
                </div>
                <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Saved resources</p>
            </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div class="p-6">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent Activity</h2>
                {#if stats.recentActivity.length === 0}
                    <div class="text-center py-8">
                        <p class="text-gray-500 dark:text-gray-400">No recent activity to show</p>
                        <a href="/notes" class="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400">
                            Create your first note
                            <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                {:else}
                    <div class="divide-y divide-gray-200 dark:divide-gray-700">
                        {#each stats.recentActivity as activity}
                            <div class="py-4">
                                <!-- Activity item content -->
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>