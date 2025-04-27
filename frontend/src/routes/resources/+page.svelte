<script>
    import { user } from '$lib/stores/userStore';

    let resources = [];
    let showCreateModal = false;
    let searchQuery = '';

    let newResource = {
        title: '',
        url: '',
        description: '',
        type: 'article', // article, video, book, course
        tags: []
    };

    function createResource() {
        // TODO: Implement resource creation
        showCreateModal = false;
    }

    function deleteResource(id) {
        // TODO: Implement resource deletion
    }
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
            <div>
                <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Resources</h1>
                <p class="mt-1 text-gray-600 dark:text-gray-400">
                    Collect and organize learning materials
                </p>
            </div>
            <button
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onclick={() => showCreateModal = true}
            >
                <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
                Add Resource
            </button>
        </div>

        <!-- Search and Filters -->
        <div class="mb-6">
            <div class="flex flex-col sm:flex-row gap-4">
                <div class="flex-1">
                    <div class="relative rounded-md shadow-sm">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            bind:value={searchQuery}
                            class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                            placeholder="Search resources..."
                        />
                    </div>
                </div>
                <div class="flex gap-2">
                    <button class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        All Types
                    </button>
                    <button class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        Articles
                    </button>
                    <button class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        Videos
                    </button>
                </div>
            </div>
        </div>

        <!-- Resources Grid -->
        {#if resources.length === 0}
            <div class="text-center py-12">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No resources</h3>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by adding a new resource.</p>
                <div class="mt-6">
                    <button
                        type="button"
                        class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onclick={() => showCreateModal = true}
                    >
                        <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                        </svg>
                        Add Resource
                    </button>
                </div>
            </div>
        {:else}
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {#each resources as resource}
                    <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                        <div class="p-6">
                            <div class="flex items-center justify-between mb-4">
                                <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer" class="hover:text-indigo-600 dark:hover:text-indigo-400">
                                        {resource.title}
                                    </a>
                                </h3>
                                <div class="flex items-center space-x-2">
                                    <button
                                        class="text-gray-400 hover:text-gray-500"
                                        onclick={() => deleteResource(resource.id)}
                                    >
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                {resource.description}
                            </p>
                            <div class="flex items-center justify-between">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                    {resource.type === 'article' ? 'bg-blue-100 text-blue-800' :
                                    resource.type === 'video' ? 'bg-red-100 text-red-800' :
                                    resource.type === 'book' ? 'bg-green-100 text-green-800' :
                                    'bg-purple-100 text-purple-800'}"
                                >
                                    {resource.type}
                                </span>
                                {#if resource.tags?.length}
                                    <div class="flex flex-wrap gap-2">
                                        {#each resource.tags as tag}
                                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                                {tag}
                                            </span>
                                        {/each}
                                    </div>
                                {/if}
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>

<!-- Create Resource Modal -->
{#if showCreateModal}
    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div class="sm:flex sm:items-start">
                    <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                        <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100" id="modal-title">
                            Add New Resource
                        </h3>
                        <div class="mt-6 space-y-6">
                            <div>
                                <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Title
                                </label>
                                <div class="mt-1">
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        bind:value={newResource.title}
                                        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                            </div>
                            <div>
                                <label for="url" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    URL
                                </label>
                                <div class="mt-1">
                                    <input
                                        type="url"
                                        name="url"
                                        id="url"
                                        bind:value={newResource.url}
                                        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        placeholder="https://"
                                    />
                                </div>
                            </div>
                            <div>
                                <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Description
                                </label>
                                <div class="mt-1">
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows="3"
                                        bind:value={newResource.description}
                                        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    ></textarea>
                                </div>
                            </div>
                            <div>
                                <label for="type" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Type
                                </label>
                                <div class="mt-1">
                                    <select
                                        id="type"
                                        name="type"
                                        bind:value={newResource.type}
                                        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    >
                                        <option value="article">Article</option>
                                        <option value="video">Video</option>
                                        <option value="book">Book</option>
                                        <option value="course">Course</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label for="tags" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Tags (comma separated)
                                </label>
                                <div class="mt-1">
                                    <input
                                        type="text"
                                        name="tags"
                                        id="tags"
                                        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        placeholder="javascript, react, web"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                        type="button"
                        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onclick={createResource}
                    >
                        Add
                    </button>
                    <button
                        type="button"
                        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                        onclick={() => showCreateModal = false}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}