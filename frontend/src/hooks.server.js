import { redirect } from '@sveltejs/kit';
import { createServerClient } from '@supabase/ssr';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const handle = async ({ event, resolve }) => {
    event.locals.supabase = createServerClient(
        PUBLIC_SUPABASE_URL,
        PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                get: (key) => event.cookies.get(key),
                set: (key, value, options) => {
                    event.cookies.set(key, value, {
                        ...options,
                        path: '/',
                        httpOnly: true,
                        secure: true,
                        sameSite: 'lax'
                    });
                },
                remove: (key, options) => {
                    event.cookies.delete(key, {
                        ...options,
                        path: '/'
                    });
                },
            },
        }
    );

    event.locals.getSession = async () => {
        const { data: { session }, error } = await event.locals.supabase.auth.getSession();
        if (error) {
            console.error('Session error:', error.message);
            return null;
        }
        return session;
    };

    // Protected routes
    if (event.url.pathname.startsWith('/account')) {
        const session = await event.locals.getSession();
        if (!session) {
            throw redirect(303, '/login');
        }
    }

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range';
        }
    });
};