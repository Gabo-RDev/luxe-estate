'use client';

import Link from 'next/link';
import { LanguageSelector } from '../ui/LanguageSelector';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '@/hooks/useNavigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

export default function Navigation({ user }: { user: User | null }) {
	const router = useRouter();
	const {
		pathname,
		dictionary,
		isMobileMenuOpen,
		setIsMobileMenuOpen,
		isProfileOpen,
		setIsProfileOpen,
		handleLogoClick,
		navLinks,
	} = useNavigation();
	const supabase = createClient();

	const handleSignOut = async () => {
		await supabase.auth.signOut();
		router.refresh();
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
							className='hidden md:flex w-10 h-10 items-center justify-center text-nordic hover:text-mosque hover:bg-nordic/5 rounded-full transition-colors cursor-pointer'
							title={dictionary.common.search}
						>
							<span className='material-icons'>search</span>
						</button>

						<button className='hidden md:flex w-10 h-10 items-center justify-center text-nordic hover:text-mosque hover:bg-nordic/5 rounded-full transition-colors relative cursor-pointer'>
							<span className='material-icons'>notifications_none</span>
							<span className='absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-clear-day'></span>
						</button>

						<div className='hidden md:block h-6 w-px bg-nordic/10 mx-1 md:mx-3'></div>

						<AnimatePresence mode='wait'>
							{user ? (
								<motion.div
									key='user-profile'
									initial={{ opacity: 0, x: 10 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: 10 }}
									transition={{ duration: 0.2 }}
									className='relative'
								>
									<button
										className='hidden md:flex items-center justify-center group relative cursor-pointer'
										onClick={() => setIsProfileOpen(!isProfileOpen)}
										title='User profile'
									>
										<div className='w-9 h-9 rounded-full bg-gray-200 overflow-hidden ring-2 ring-transparent group-hover:ring-mosque transition-all'>
											<img
												alt='Profile'
												className='w-full h-full object-cover'
												src={
													user.user_metadata?.avatar_url ||
													`https://ui-avatars.com/api/?name=${user.email || 'User'}&background=random`
												}
												referrerPolicy='no-referrer'
											/>
										</div>
									</button>

									<AnimatePresence>
										{isProfileOpen && (
											<>
												<div
													className='fixed inset-0 z-40'
													onClick={() => setIsProfileOpen(false)}
												/>
												<motion.div
													initial={{ opacity: 0, y: 10, scale: 0.95 }}
													animate={{ opacity: 1, y: 0, scale: 1 }}
													exit={{ opacity: 0, y: 10, scale: 0.95 }}
													transition={{ duration: 0.15, ease: 'easeOut' }}
													className='absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-nordic/10 z-50 overflow-hidden'
												>
													<div className='px-4 pt-4 pb-3 border-b border-nordic/5'>
														<p className='text-xs font-semibold text-nordic/40 uppercase tracking-wider'>
															{dictionary.auth.account}
														</p>
														<p className='text-sm font-semibold text-nordic truncate'>
															{user.user_metadata?.full_name ||
																user.user_metadata?.name ||
																'User'}
														</p>
														<p className='text-xs text-nordic/50 truncate'>
															{user.email}
														</p>
													</div>
													<Link
														href='/profile'
														className='flex items-center gap-3 px-4 py-2.5 text-sm text-nordic transition-colors cursor-pointer hover:bg-gray-300/65 '
														onClick={() => setIsProfileOpen(false)}
													>
														<span className='material-icons text-lg text-nordic/40'>
															person_outline
														</span>
														{dictionary.auth.my_profile}
													</Link>
													<button
														className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-gray-300/65 transition-colors cursor-pointer'
														onClick={() => {
															handleSignOut();
															setIsProfileOpen(false);
														}}
													>
														<span className='material-icons text-lg'>
															logout
														</span>
														{dictionary.auth.signout}
													</button>
												</motion.div>
											</>
										)}
									</AnimatePresence>
								</motion.div>
							) : (
								<motion.div
									key='login-btn'
									initial={{ opacity: 0, x: -10 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -10 }}
									transition={{ duration: 0.2 }}
								>
									<Link
										href='/login'
										className='hidden md:flex text-sm font-medium text-nordic hover:text-mosque transition-colors bg-nordic/5 px-4 py-1.5 rounded-full'
									>
										{dictionary.auth.login}
									</Link>
								</motion.div>
							)}
						</AnimatePresence>

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
		</nav>
	);
}
