'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '@/hooks/useNavigation';
import { LanguageSelector } from '../ui/LanguageSelector';
import { NotificationsDropdown } from './NotificationsDropdown';
import type { User } from '@supabase/supabase-js';
import type { Dictionary } from '@/types/I18n';

interface NavActionsProps {
	user: User | null;
	userRole?: string | null;
	dictionary: Dictionary;
}

export function NavActions({ user, userRole, dictionary }: NavActionsProps) {
	const { isProfileOpen, setIsProfileOpen, handleSignOut } = useNavigation();

	const isAdmin = userRole === 'administrator';

	return (
		<div className='flex items-center space-x-1 md:space-x-3'>
			<button
				className='hidden md:flex w-10 h-10 items-center justify-center text-nordic hover:text-mosque hover:bg-nordic/5 rounded-full transition-colors cursor-pointer'
				title={dictionary.common.search}
			>
				<span className='material-icons'>search</span>
			</button>

			<NotificationsDropdown variant='public' />

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
							onClick={() => setIsProfileOpen((prev) => !prev)}
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
									{/* Full-screen backdrop with explicit dimensions to bypass containing blocks */}
									<div
										className='fixed left-0! top-0! w-screen! h-screen! z-100 bg-black/0 cursor-default'
										onClick={(e) => {
											e.stopPropagation();
											setIsProfileOpen(false);
										}}
									/>
									<motion.div
										initial={{ opacity: 0, y: 10, scale: 0.95 }}
										animate={{ opacity: 1, y: 0, scale: 1 }}
										exit={{ opacity: 0, y: 10, scale: 0.95 }}
										transition={{ duration: 0.15, ease: 'easeOut' }}
										className='absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-nordic/10 z-101 overflow-hidden'
									>
										<div className='px-6 pt-5 pb-4 border-b border-nordic/5 flex flex-col'>
											<p className='text-[10px] font-bold text-nordic/30 uppercase tracking-widest mb-1'>
												{dictionary.auth.account || 'ACCOUNT'}
											</p>
											<p className='text-base font-bold text-nordic truncate leading-tight'>
												{user.user_metadata?.full_name ||
													user.user_metadata?.name ||
													'User'}
											</p>
											<p className='text-xs text-nordic/40 truncate mt-0.5 font-medium'>
												{user.email}
											</p>
										</div>

										<div className='py-2'>
											{/* Admin Dashboard Access */}
											{isAdmin && (
												<Link
													href='/admin/properties'
													className='flex items-center gap-3 px-6 py-3 text-sm font-semibold text-mosque hover:bg-mosque/5 transition-colors'
													onClick={() => setIsProfileOpen(false)}
												>
													<span className='material-icons text-xl'>
														dashboard
													</span>
													{dictionary.common.admin || 'Admin Dashboard'}
												</Link>
											)}

											<Link
												href='/profile'
												className='flex items-center gap-3 px-6 py-3 text-sm font-medium text-nordic/70 hover:text-nordic hover:bg-gray-50 transition-colors'
												onClick={() => setIsProfileOpen(false)}
											>
												<span className='material-icons text-xl text-nordic/30'>
													person_outline
												</span>
												{dictionary.auth.my_profile}
											</Link>
										</div>

										<div className='border-t border-nordic/5 py-2'>
											<button
												className='w-full flex items-center gap-3 px-6 py-3 text-sm font-semibold text-red-500 hover:bg-red-50/50 transition-colors cursor-pointer group'
												onClick={() => {
													handleSignOut();
													setIsProfileOpen(false);
												}}
											>
												<span className='material-icons text-xl text-red-400 group-hover:text-red-500 transition-colors'>
													logout
												</span>
												{dictionary.auth.signout}
											</button>
										</div>
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
		</div>
	);
}
