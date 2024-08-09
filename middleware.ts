import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import createMiddleware from 'next-intl/middleware';
import { locales } from '@/lib/navigation';
import {
    IS_ADMIN_LOGGED_IN_REDIRECT,
    LOGIN_ROUTE,
    apiAuthPrefix,
    authRoutes,
    privateRoutes,
} from '@/routes';

// Middleware pour les locales
const intlMiddleware = createMiddleware({
    locales,
    defaultLocale: 'ar',
});

// Exporte la configuration d'authentification
export const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const pathParts = nextUrl.pathname.split('/');
    const pathname = `/${pathParts.slice(2).join('/')}`;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isAuthRoute = authRoutes.includes(pathname);
    const isPrivateRoute = privateRoutes.includes(pathname);

    if (isApiAuthRoute) return;

    if (isLoggedIn && isAuthRoute) {
        return Response.redirect(new URL(IS_ADMIN_LOGGED_IN_REDIRECT, nextUrl));
    }

    if (!isLoggedIn && isPrivateRoute) {
        return Response.redirect(new URL(LOGIN_ROUTE, nextUrl));
    }

    return intlMiddleware(req);
});

// Configuration des chemins que le middleware doit matcher
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
