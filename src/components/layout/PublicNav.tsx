import Link from 'next/link';
import { Logo } from './Logo';
import { NavActions } from './NavActions';
import { MobileNav } from './MobileNav';
import type { User } from '@supabase/supabase-js';
import type { Dictionary } from '@/types/I18n';

export function PublicNav({ user, userRole, dictionary }: { user: User | null, userRole?: string | null, dictionary: Dictionary }) {
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
					<div className='hidden lg:flex items-center justify-center space-x-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
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
						userRole={userRole}
						dictionary={dictionary}
					/>

					{/* Mobile toggle & menu */}
					<MobileNav
						user={user}
						userRole={userRole}
						dictionary={dictionary}
						navLinks={navLinks}
					/>
				</div>
			</div>
		</nav>
	);
}
