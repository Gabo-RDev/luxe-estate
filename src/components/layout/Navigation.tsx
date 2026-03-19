'use client';

import Link from 'next/link';
import { LanguageSelector } from '../ui/LanguageSelector';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '@/hooks/useNavigation';

export default function Navigation() {
	const {
		pathname,
		dictionary,
		isMobileMenuOpen,
		setIsMobileMenuOpen,
		handleLogoClick,
		navLinks,
	} = useNavigation();

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
							<span className='material-icons text-white text-lg'>
								apartment
							</span>
						</div>
						<span className='text-xl font-semibold tracking-tight text-nordic'>
							LuxeEstate
						</span>
					</Link>

					{/* Desktop nav links - lg+ */}
					<div className='hidden lg:flex items-center space-x-8'>
						{navLinks.map((link) => (
							<Link
								key={link.href + link.label}
								className={`font-medium text-sm px-1 py-1 transition-all ${
									link.href !== '#' && pathname.startsWith(link.href)
										? 'text-mosque border-b-2 border-mosque'
										: 'text-nordic/70 hover:text-nordic hover:border-b-2 hover:border-nordic/20 border-b-2 border-transparent'
								}`}
								href={link.href}
							>
								{link.label}
							</Link>
						))}
					</div>

					{/* Right-side actions */}
					<div className='flex items-center space-x-1 md:space-x-3'>
						<button
							className='hidden md:flex w-10 h-10 items-center justify-center text-nordic hover:text-mosque hover:bg-nordic/5 rounded-full transition-colors'
							title={dictionary.common.search}
						>
							<span className='material-icons'>search</span>
						</button>

						<button className='hidden md:flex w-10 h-10 items-center justify-center text-nordic hover:text-mosque hover:bg-nordic/5 rounded-full transition-colors relative'>
							<span className='material-icons'>notifications_none</span>
							<span className='absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-clear-day'></span>
						</button>

						<div className='hidden md:block h-6 w-px bg-nordic/10 mx-1 md:mx-3'></div>

						<button className='hidden md:flex items-center justify-center'>
							<div className='w-9 h-9 rounded-full bg-gray-200 overflow-hidden ring-2 ring-transparent hover:ring-mosque transition-all'>
								<img
									alt='Profile'
									className='w-full h-full object-cover'
									src='https://lh3.googleusercontent.com/aida-public/AB6AXuCAWhQZ663Bd08kmzjbOPmUk4UIxYooNONShMEFXLR-DtmVi6Oz-TiaY77SPwFk7g0OobkeZEOMvt6v29mSOD0Xm2g95WbBG3ZjWXmiABOUwGU0LOySRfVDo-JTXQ0-gtwjWxbmue0qDm91m-zEOEZwAW6iRFB1qC1bAU-wkjxm67Sbztq8w7srHkFT9bVEC86qG-FzhOBTomhAurNRmx9l8Yfqabk328NfdKuVLckgCdaPsNFE3yN65MeoRi05GA_gXIMwG4YDIeA'
								/>
							</div>
						</button>

						<LanguageSelector />

						{/* Hamburger toggle — only on < lg */}
						<motion.button
							className='lg:hidden w-10 h-10 flex items-center justify-center text-nordic hover:text-mosque hover:bg-nordic/5 rounded-full transition-colors'
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							aria-label='Toggle menu'
							whileTap={{ scale: 0.85 }}
						>
							<AnimatePresence
								mode='wait'
								initial={false}
							>
								{isMobileMenuOpen ? (
									<motion.span
										key='close'
										className='material-icons'
										initial={{ rotate: -90, opacity: 0 }}
										animate={{ rotate: 0, opacity: 1 }}
										exit={{ rotate: 90, opacity: 0 }}
										transition={{ duration: 0.18, ease: 'easeInOut' }}
									>
										close
									</motion.span>
								) : (
									<motion.span
										key='menu'
										className='material-icons'
										initial={{ rotate: 90, opacity: 0 }}
										animate={{ rotate: 0, opacity: 1 }}
										exit={{ rotate: -90, opacity: 0 }}
										transition={{ duration: 0.18, ease: 'easeInOut' }}
									>
										menu
									</motion.span>
								)}
							</AnimatePresence>
						</motion.button>
					</div>
				</div>
			</div>

			{/* Mobile Menu — animated with framer-motion */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						key='mobile-menu'
						className='lg:hidden absolute top-20 left-0 w-full bg-white border-b border-nordic/10 shadow-xl z-40 overflow-hidden'
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
					>
						<div className='px-6 py-6 flex flex-col space-y-1'>
							{navLinks.map((link, i) => (
								<motion.div
									key={link.label}
									initial={{ x: -16, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									transition={{
										delay: 0.05 + i * 0.06,
										duration: 0.22,
										ease: 'easeOut',
									}}
								>
									<Link
										className={`block font-medium text-lg px-4 py-3 rounded-xl transition-all ${
											link.href !== '#' && pathname.startsWith(link.href)
												? 'bg-mosque/10 text-mosque'
												: 'text-nordic hover:bg-nordic/5'
										}`}
										href={link.href}
										onClick={() => setIsMobileMenuOpen(false)}
									>
										{link.label}
									</Link>
								</motion.div>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
}
