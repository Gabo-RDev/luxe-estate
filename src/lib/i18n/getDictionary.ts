import 'server-only';
import { Locale } from '@/types/I18n';

const dictionaries = {
	es: () => import('./dictionaries/es.json').then((module) => module.default),
	en: () => import('./dictionaries/en.json').then((module) => module.default),
	fr: () => import('./dictionaries/fr.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
	return (dictionaries[locale] || dictionaries.es)();
};
