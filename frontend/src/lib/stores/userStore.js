import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { supabase } from '$lib/supabaseClient';

export const user = writable(null);

if (browser) {
    // Set initial user state from session
    supabase.auth.getSession().then(({ data: { session } }) => {
        user.set(session?.user ?? null);
    });

    // Listen for auth state changes
    supabase.auth.onAuthStateChange((event, session) => {
        user.set(session?.user ?? null);
    });
}

