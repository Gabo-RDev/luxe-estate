'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { LanguageSelector } from '../ui/LanguageSelector';
import { useI18n } from '@/lib/i18n/i18n-context';

export default function Navigation() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { dictionary } = useI18n();

	const handleLogoClick = (e: React.MouseEvent) => {
		// If we are already on the home page AND there are no search params, scroll to top smoothly
		// If there ARE search params (like ?page=2), we want the default Link behavior to navigate to / (resetting params)
		if (pathname === '/' && !searchParams.toString()) {
			e.preventDefault();
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	return (
		<nav className='sticky top-0 z-50 bg-clear-day/95 backdrop-blur-md border-b border-nordic/10'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-20'>
					<Link
						href='/'
						onClick={handleLogoClick}
						className='shrink-0 flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80'
					>
						<div className='w-8 h-8 rounded-lg bg-nordic flex items-center justify-center'>
							<span className='material-icons text-white text-lg'>apartment</span>
						</div>
						<span className='text-xl font-semibold tracking-tight text-nordic'>
							LuxeEstate
						</span>
					</Link>

					<div className='hidden md:flex items-center space-x-8'>
						<Link
							className={`font-medium text-sm px-1 py-1 transition-all ${
								pathname.startsWith('/properties')
									? 'text-mosque border-b-2 border-mosque'
									: 'text-nordic/70 hover:text-nordic hover:border-b-2 hover:border-nordic/20 border-b-2 border-transparent'
							}`}
							href='/properties'
						>
							{dictionary.nav.buy}
						</Link>
						<Link
							className='text-nordic/70 hover:text-nordic font-medium text-sm hover:border-b-2 hover:border-nordic/20 px-1 py-1 transition-all'
							href='#'
						>
							{dictionary.nav.rent}
						</Link>
						<Link
							className='text-nordic/70 hover:text-nordic font-medium text-sm hover:border-b-2 hover:border-nordic/20 px-1 py-1 transition-all'
							href='#'
						>
							{dictionary.nav.sell}
						</Link>
						<Link
							className='text-nordic/70 hover:text-nordic font-medium text-sm hover:border-b-2 hover:border-nordic/20 px-1 py-1 transition-all'
							href='#'
						>
							{dictionary.nav.saved}
						</Link>
					</div>

					<div className='flex items-center space-x-2 md:space-x-4'>
						<button className='w-10 h-10 flex items-center justify-center text-nordic hover:text-mosque hover:bg-nordic/5 rounded-full transition-colors' title={dictionary.common.search}>
							<span className='material-icons'>search</span>
						</button>
						
						<button className='w-10 h-10 flex items-center justify-center text-nordic hover:text-mosque hover:bg-nordic/5 rounded-full transition-colors relative'>
							<span className='material-icons'>notifications_none</span>
							<span className='absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-clear-day'></span>
						</button>
						
						<div className='h-6 w-px bg-nordic/10 mx-2 md:mx-4'></div>
						
						<button className='flex items-center justify-center'>
							<div className='w-9 h-9 rounded-full bg-gray-200 overflow-hidden ring-2 ring-transparent hover:ring-mosque transition-all'>
								<img
									alt='Profile'
									className='w-full h-full object-cover'
									src='https://lh3.googleusercontent.com/aida-public/AB6AXuCAWhQZ663Bd08kmzjbOPmUk4UIxYooNONShMEFXLR-DtmVi6Oz-TiaY77SPwFk7g0OobkeZEOMvt6v29mSOD0Xm2g95WbBG3ZjWXmiABOUwGU0LOySRfVDo-JTXQ0-gtwjWxbmue0qDm91m-zEOEZwAW6iRFB1qC1bAU-wkjxm67Sbztq8w7srHkFT9bVEC86qG-FzhOBTomhAurNRmx9l8Yfqabk328NfdKuVLckgCdaPsNFE3yN65MeoRi05GA_gXIMwG4YDIeA'
								/>
							</div>
						</button>

						<LanguageSelector />
					</div>
				</div>
			</div>
		</nav>
	);
}
