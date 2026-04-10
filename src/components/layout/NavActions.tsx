'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '@/hooks/useNavigation';
import { LanguageSelector } from '../ui/LanguageSelector';
import { NotificationsDropdown } from './NotificationsDropdown';
import type { User } from '@supabase/supabase-js';
import type { Dictionary } from '@/types/I18n';
import dynamic from 'next/dynamic';

const ProfileDropdownContent = dynamic(
	() => import('./ProfileDropdownContent'),
	{ ssr: false },
);

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

						{isProfileOpen && (
							<ProfileDropdownContent
								user={user}
								isAdmin={isAdmin}
								dictionary={dictionary}
								onClose={() => setIsProfileOpen(false)}
								onSignOut={handleSignOut}
							/>
						)}
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
