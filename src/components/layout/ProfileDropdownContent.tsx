'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { User } from '@supabase/supabase-js';
import type { Dictionary } from '@/types/I18n';

interface ProfileDropdownContentProps {
	user: User;
	isAdmin: boolean;
	dictionary: Dictionary;
	isAdminContext?: boolean;
	onClose: () => void;
	onSignOut: () => void;
}

export default function ProfileDropdownContent({
	user,
	isAdmin,
	dictionary,
	isAdminContext = false,
	onClose,
	onSignOut,
}: ProfileDropdownContentProps) {
	return (
		<>
			{/* Full-screen backdrop with explicit dimensions to bypass containing blocks */}
			<div
				className='fixed left-0! top-0! w-screen! h-screen! z-100 bg-black/0 cursor-default'
				onClick={(e) => {
					e.stopPropagation();
					onClose();
				}}
			/>
			<motion.div
				initial={{ opacity: 0, y: 10, scale: 0.95 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				exit={{ opacity: 0, y: 10, scale: 0.95 }}
				transition={{ duration: 0.15, ease: 'easeOut' }}
				className={`absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-nordic/10 z-101 overflow-hidden ${
					isAdminContext ? 'top-12' : 'mt-3'
				}`}
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
					{!isAdminContext && isAdmin && (
						<Link
							href='/admin/properties'
							className='flex items-center gap-3 px-6 py-3 text-sm font-semibold text-mosque hover:bg-mosque/5 transition-colors'
							onClick={onClose}
						>
							<span className='material-icons text-xl'>dashboard</span>
							{dictionary.common.admin || 'Admin Dashboard'}
						</Link>
					)}

					<Link
						href='/profile'
						className='flex items-center gap-3 px-6 py-3 text-sm font-medium text-nordic/70 hover:text-nordic hover:bg-gray-50 transition-colors'
						onClick={onClose}
					>
						<span className='material-icons text-xl text-nordic/30'>
							person_outline
						</span>
						{dictionary.auth.my_profile}
					</Link>

					{/* Link back to site if in admin */}
					{isAdminContext && (
						<Link
							href='/'
							className='flex items-center gap-3 px-6 py-3 text-sm font-medium text-nordic/70 hover:text-nordic hover:bg-gray-50 transition-colors'
							onClick={onClose}
						>
							<span className='material-icons text-xl text-nordic/30'>
								home
							</span>
							{dictionary.common.view_site || 'View Website'}
						</Link>
					)}
				</div>

				<div className='border-t border-nordic/5 py-2'>
					<button
						className='w-full flex items-center gap-3 px-6 py-3 text-sm font-semibold text-red-500 hover:bg-red-50/50 transition-colors cursor-pointer group'
						onClick={() => {
							onSignOut();
							onClose();
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
	);
}
