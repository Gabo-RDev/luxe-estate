'use server';

import { cookies } from 'next/headers';
import { Locale, locales, defaultLocale } from '@/lib/i18n/config';

export async function setLocaleAction(locale: Locale) {
  if (!locales.includes(locale)) {
    locale = defaultLocale;
  }
  // Store the language in a cookie
  const cookieStore = await cookies();
  cookieStore.set('NEXT_LOCALE', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
  });
}
