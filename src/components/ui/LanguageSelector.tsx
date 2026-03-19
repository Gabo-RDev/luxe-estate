'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { locales, localeNames, Locale } from '@/lib/i18n/config';
import { setLocaleAction } from '@/lib/i18n/actions';
import { useI18n } from '@/lib/i18n/i18n-context';

export function LanguageSelector() {
	const router = useRouter();
	const { locale } = useI18n();
	const [isOpen, setIsOpen] = useState(false);
	const [isPending, setIsPending] = useState(false);

	const handleLanguageChange = async (newLocale: Locale) => {
		if (newLocale === locale) {
			setIsOpen(false);
			return;
		}
		setIsPending(true);
		await setLocaleAction(newLocale);
		setIsOpen(false);
		setIsPending(false);
		// Refresh to apply the new locale cookie in server components
		router.refresh();
	};

	const flags: Record<Locale, string> = {
		en: '🇺🇸',
		es: '🇪🇸',
		fr: '🇫🇷',
	};

	return (
		<div className='relative flex items-center cursor-pointer'>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className='flex items-center gap-1.5 text-[13px] text-gray-700 hover:text-mosque transition-colors py-1.5 px-2 rounded-md hover:bg-gray-50 cursor-pointer'
				disabled={isPending}
			>
				<span className='text-base leading-none'>{flags[locale]}</span>
				<span className='font-medium'>{locale.toUpperCase()}</span>
				<span className='material-icons text-[16px] text-gray-400'>expand_more</span>
			</button>

			{isOpen && (
				<>
					<div
						className='fixed inset-0 z-40'
						onClick={() => setIsOpen(false)}
						aria-hidden='true'
					/>
					<div className='absolute right-0 top-full mt-1 w-36 bg-white rounded-xl shadow-lg border border-nordic/5 py-1.5 z-50 transform origin-top'>
						{locales.map((l) => (
							<button
								key={l}
								onClick={() => handleLanguageChange(l)}
								disabled={isPending}
								className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-gray-50 transition-colors cursor-pointer ${
									locale === l
										? 'font-semibold text-mosque bg-gray-50/50'
										: 'text-gray-700'
								}`}
							>
								<span className='text-base'>{flags[l]}</span>
								<span>{localeNames[l]}</span>
							</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}
