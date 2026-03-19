import { Locale } from '@/types/I18n';

export const defaultLocale: Locale = 'es';

export const locales: Locale[] = ['es', 'en', 'fr'];

export const localeNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  fr: 'Français'
};

export const localeFlags: Record<Locale, string> = {
  es: '🇪🇸',
  en: '🇺🇸',
  fr: '🇫🇷',
};

