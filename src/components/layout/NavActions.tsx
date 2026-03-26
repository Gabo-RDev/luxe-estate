'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '@/hooks/useNavigation';
import { LanguageSelector } from '../ui/LanguageSelector';
import type { User } from '@supabase/supabase-js';
import type { Dictionary } from '@/types/I18n';

interface NavActionsProps {
	user: User | null;
	dictionary: Dictionary;
}

export function NavActions({ user, dictionary }: NavActionsProps) {
	const {
		isProfileOpen,
		setIsProfileOpen,
		handleSignOut,
	} = useNavigation();

	return (
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
							onClick={() => setIsProfileOpen(prev => !prev)}
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
							{isProfileOpen ? (
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
							) : null}
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
		</div>
	);
}
