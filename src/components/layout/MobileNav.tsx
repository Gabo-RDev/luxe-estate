'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '@/hooks/useNavigation';
import type { User } from '@supabase/supabase-js';
import type { Dictionary } from '@/types/I18n';
import Link from 'next/link';

interface MobileNavProps {
	user: User | null;
	dictionary: Dictionary;
	navLinks: { label: string; href: string }[];
}

export function MobileNav({ user, dictionary, navLinks }: MobileNavProps) {
	const { pathname, isMobileMenuOpen, setIsMobileMenuOpen, handleSignOut } =
		useNavigation();

	return (
		<>
			<motion.button
				className='lg:hidden w-10 h-10 flex items-center justify-center text-nordic hover:text-mosque hover:bg-nordic/5 rounded-full transition-colors'
				onClick={() => setIsMobileMenuOpen(prev => !prev)}
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

							<div className='h-px bg-nordic/10 my-4'></div>

							{user ? (
								<motion.div
									initial={{ x: -16, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									transition={{
										delay: 0.05 + navLinks.length * 0.06,
										duration: 0.22,
										ease: 'easeOut',
									}}
								>
									<button
										className='w-full text-left font-medium text-lg px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all flex items-center gap-2'
										onClick={() => {
											handleSignOut();
											setIsMobileMenuOpen(false);
										}}
									>
										<span className='material-icons'>logout</span>
										{dictionary.auth.signout}
									</button>
								</motion.div>
							) : (
								<motion.div
									initial={{ x: -16, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									transition={{
										delay: 0.05 + navLinks.length * 0.06,
										duration: 0.22,
										ease: 'easeOut',
									}}
								>
									<Link
										className='block font-medium text-lg px-4 py-3 rounded-xl text-mosque bg-mosque/5 hover:bg-mosque/10 transition-all'
										href='/login'
										onClick={() => setIsMobileMenuOpen(false)}
									>
										{dictionary.auth.login}
									</Link>
								</motion.div>
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
