'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { LogoIcon } from '@/components/ui/icons/LogoIcon';

export function Logo() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const handleLogoClick = (e: React.MouseEvent) => {
		if (pathname === '/' && !searchParams.toString()) {
			e.preventDefault();
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	return (
		<Link
			href='/'
			onClick={handleLogoClick}
			className='shrink-0 flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80'
		>
			<div className='w-8 h-8 rounded-lg bg-nordic flex items-center justify-center'>
				<LogoIcon size={18} className='text-white' />
			</div>
			<span className='text-xl font-semibold tracking-tight text-nordic'>
				LuxeEstate
			</span>
		</Link>
	);
}
