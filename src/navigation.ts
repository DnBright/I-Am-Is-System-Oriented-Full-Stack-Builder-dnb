import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['en', 'id'],

    // Used when no locale matches
    defaultLocale: 'en'
});

// Typed navigation utilities
export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);
