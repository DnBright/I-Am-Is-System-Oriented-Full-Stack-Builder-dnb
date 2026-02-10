import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
const locales = ['en', 'id'];

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = await requestLocale;
    console.log('DEBUG: getRequestConfig locale:', locale);

    // Validate that the incoming `locale` parameter is valid
    if (!locale || !locales.includes(locale as any)) {
        console.log('DEBUG: Locale not valid, calling notFound()');
        notFound();
    }

    return {
        locale: locale as string,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});
