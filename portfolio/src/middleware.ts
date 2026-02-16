import createMiddleware from 'next-intl/middleware';
import { routing } from './navigation';

export default createMiddleware(routing);

export const config = {
    // Matcher excluding common static files and API routes
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
