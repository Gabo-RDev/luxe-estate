import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { defaultLocale, locales } from '@/lib/i18n/config';
import { Locale } from '@/types/I18n';
import { SearchHeroForm } from './SearchHeroForm';

export default async function SearchHero() {
	const cookieStore = await cookies();
	const localeCookie = cookieStore.get('NEXT_LOCALE')?.value as Locale;
	const locale = locales.includes(localeCookie) ? localeCookie : defaultLocale;
	const dictionary = await getDictionary(locale);

	return (
		<section className='py-8 md:py-16'>
			<div className='text-center space-y-6 md:space-y-8'>
				<h1 className='text-4xl md:text-5xl lg:text-6xl font-light text-nordic leading-tight'>
					{dictionary.search_hero.find_your}
					<span className='relative inline-block'>
						<span className='relative z-10 font-medium'>
							{dictionary.search_hero.sanctuary}
						</span>
						<span className='absolute bottom-2 left-0 w-full h-3 bg-mosque/20 -rotate-1 z-0'></span>
					</span>
					.
				</h1>

				<Suspense
					fallback={
						<div className='max-w-2xl mx-auto w-full space-y-8 animate-pulse'>
							<div className='h-16 bg-white rounded-xl shadow-sm w-full'></div>
							<div className='flex justify-center gap-3'>
								{[1, 2, 3, 4].map((i) => (
									<div
										key={i}
										className='h-9 w-24 bg-white border border-nordic/10 rounded-full'
									></div>
								))}
							</div>
						</div>
					}
				>
					<SearchHeroForm />
				</Suspense>
			</div>
		</section>
	);
}
