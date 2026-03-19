import { getDictionary } from '@/lib/i18n/getDictionary';

export type Locale = 'es' | 'en' | 'fr';
export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
