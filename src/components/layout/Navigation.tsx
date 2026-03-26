import { User } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { defaultLocale, locales } from '@/lib/i18n/config';
import { Locale } from '@/types/I18n';
import Link from 'next/link';
import { Logo } from './Logo';
import { NavActions } from './NavActions';
import { MobileNav } from './MobileNav';

export default async function Navigation({ user }: { user: User | null }) {
	const cookieStore = await cookies();
	const localeCookie = cookieStore.get('NEXT_LOCALE')?.value as Locale;
	const locale = locales.includes(localeCookie) ? localeCookie : defaultLocale;
	const dictionary = await getDictionary(locale);

	const navLinks = [
		{ label: dictionary.nav.buy, href: '/properties' },
		{ label: dictionary.nav.rent, href: '#' },
		{ label: dictionary.nav.sell, href: '#' },
		{ label: dictionary.nav.saved, href: '#' },
	];

	return (
		<nav className='sticky top-0 z-50 bg-clear-day/95 backdrop-blur-md border-b border-nordic/10'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-20'>
					<Logo />

					{/* Desktop nav links - lg+ */}
					<div className='hidden lg:flex items-center space-x-8'>
						{navLinks.map((link) => (
							<Link
								key={link.href + link.label}
								className='font-medium text-sm px-1 py-1 transition-all text-nordic/70 hover:text-nordic hover:border-b-2 hover:border-nordic/20 border-b-2 border-transparent'
								href={link.href}
							>
								{link.label}
							</Link>
						))}
					</div>

					{/* Right-side actions */}
					<NavActions
						user={user}
						dictionary={dictionary}
					/>

					{/* Mobile toggle & menu */}
					<MobileNav
						user={user}
						dictionary={dictionary}
						navLinks={navLinks}
					/>
				</div>
			</div>
		</nav>
	);
}
