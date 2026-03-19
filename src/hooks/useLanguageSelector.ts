import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { localeFlags } from '@/lib/i18n/config';
import { Locale } from '@/types/I18n';
import { setLocaleAction } from '@/lib/i18n/actions';
import { useI18n } from '@/lib/i18n/i18n-context';

export function useLanguageSelector() {
	const router = useRouter();
	const { locale } = useI18n();
	const [isOpen, setIsOpen] = useState(false);
	const [isPending, startTransition] = useTransition();

	const handleLanguageChange = (newLocale: Locale) => {
		if (newLocale === locale) {
			setIsOpen(false);
			return;
		}
		startTransition(async () => {
			await setLocaleAction(newLocale);
			setIsOpen(false);
			router.refresh();
		});
	};

	return { locale, isOpen, setIsOpen, isPending, handleLanguageChange, flags: localeFlags };
}
