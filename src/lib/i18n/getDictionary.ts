import 'server-only';
import { cache } from 'react';
import { Locale } from '@/types/I18n';

const dictionaries = {
	es: () => import('./dictionaries/es.json').then((module) => module.default),
	en: () => import('./dictionaries/en.json').then((module) => module.default),
	fr: () => import('./dictionaries/fr.json').then((module) => module.default),
};

// React.cache() deduplicates calls within the same request — layout.tsx and
// Navigation.tsx both call getDictionary, so this prevents a duplicate JSON read.
export const getDictionary = cache(async (locale: Locale) => {
	return (dictionaries[locale] || dictionaries.es)();
});
