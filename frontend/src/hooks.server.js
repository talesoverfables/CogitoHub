import { redirect } from '@sveltejs/kit';
import { getSession } from '$lib/auth';

const unprotectedRoutes = [
    '/',
    '/login',
    '/register',
    '/reset-password',
    '/about',
    '/contact',
    '/privacy',
    '/faq',
    '/help'
];

export const handle = async ({ event, resolve }) => {
    // Check if the route needs authentication
    const routeRequiresAuth = !unprotectedRoutes.some(route => 
        event.url.pathname === route || event.url.pathname.startsWith(route + '/')
    );

    if (routeRequiresAuth) {
        const { session } = await getSession();
        
        if (!session) {
            throw redirect(303, '/login?redirectTo=' + event.url.pathname);
        }

        // Add user to event.locals if needed
        event.locals.user = session.user;
    }

    const response = await resolve(event);
    return response;
};