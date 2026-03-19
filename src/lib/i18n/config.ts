export type Locale = 'es' | 'en' | 'fr';

export const defaultLocale: Locale = 'es';

export const locales: Locale[] = ['es', 'en', 'fr'];

export const localeNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  fr: 'Français'
};
