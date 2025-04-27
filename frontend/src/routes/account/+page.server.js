import { redirect, error } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    const session = await locals.getSession();
    
    if (!session) {
        throw redirect(303, '/login');
    }

    try {
        const { data: profile, error: profileError } = await locals.supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

        if (profileError) {
            console.error('Profile fetch error:', profileError);
            // Return session even if profile fetch fails
            return {
                session,
                profile: null
            };
        }

        return {
            session,
            profile
        };
    } catch (e) {
        console.error('Unexpected error:', e);
        throw error(500, 'An unexpected error occurred');
    }
};