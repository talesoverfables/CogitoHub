import { supabase } from '$lib/supabaseClient';
import { user } from '$lib/stores/userStore';

export async function signUpWithEmail(email, password, metadata = {}) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: metadata
            }
        });

        if (error) throw error;

        // Create initial profile
        if (data.user) {
            const { error: profileError } = await supabase
                .from('profiles')
                .insert([{ id: data.user.id, ...metadata }]);

            if (profileError) throw profileError;
        }

        return { data, error: null };
    } catch (error) {
        console.error('Error signing up:', error.message);
        return { data: null, error };
    }
}

export async function signInWithEmail(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error signing in:', error.message);
        return { data: null, error };
    }
}

export async function signOut() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        user.set(null);
        return { error: null };
    } catch (error) {
        console.error('Error signing out:', error.message);
        return { error };
    }
}

export async function resetPassword(email) {
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/reset-password`
        });

        if (error) throw error;
        return { error: null };
    } catch (error) {
        console.error('Error resetting password:', error.message);
        return { error };
    }
}

export async function updatePassword(new_password) {
    try {
        const { error } = await supabase.auth.updateUser({
            password: new_password
        });

        if (error) throw error;
        return { error: null };
    } catch (error) {
        console.error('Error updating password:', error.message);
        return { error };
    }
}

export async function getSession() {
    try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        return { session, error: null };
    } catch (error) {
        console.error('Error getting session:', error.message);
        return { session: null, error };
    }
}

export async function updateUserProfile(profile) {
    try {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (!currentUser) throw new Error('No user logged in');

        const { error } = await supabase
            .from('profiles')
            .update(profile)
            .eq('id', currentUser.id);

        if (error) throw error;
        return { error: null };
    } catch (error) {
        console.error('Error updating profile:', error.message);
        return { error };
    }
}

// Subscribe to auth changes
if (typeof window !== 'undefined') {
    supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN') {
            user.set(session?.user ?? null);
        } else if (event === 'SIGNED_OUT') {
            user.set(null);
        }
    });
}