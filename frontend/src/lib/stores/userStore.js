import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { supabase } from '$lib/supabaseClient';

export const user = writable(null);
export const loading = writable(true);

if (browser) {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
            user.set(session.user);
        }
        loading.set(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
            user.set(null);
        } else if (event === 'SIGNED_IN' || event === 'USER_UPDATED' || event === 'TOKEN_REFRESHED') {
            if (session) {
                user.set(session.user);
            }
        }
    });
}

