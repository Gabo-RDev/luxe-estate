'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '@/hooks/useNavigation';
import { LanguageSelector } from '../ui/LanguageSelector';
import type { User } from '@supabase/supabase-js';
import type { Dictionary } from '@/types/I18n';
import dynamic from 'next/dynamic';

const ProfileDropdownContent = dynamic(
	() => import('./ProfileDropdownContent'),
	{ ssr: false }
);

interface AdminNavProps {
	user: User | null;
	userRole?: string | null;
	dictionary: Dictionary;
}

export function AdminNav({ user, userRole, dictionary }: AdminNavProps) {
	const pathname = usePathname();
	const { isProfileOpen, setIsProfileOpen, handleSignOut } = useNavigation();

	const adminLinks = [
		{
			label: dictionary.common.properties || 'Properties',
			href: '/admin/properties',
		},
		{ label: 'Users', href: '/admin/users' },
	];

	return (
		<nav className='sticky top-0 z-50 bg-white border-b border-mosque/10 backdrop-blur-md bg-opacity-90'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between h-16'>
					{/* Logo & Primary Nav */}
					<div className='flex'>
						<Link
							href='/'
							className='shrink-0 flex items-center gap-2 cursor-pointer'
						>
							<div className='w-8 h-8 rounded bg-mosque flex items-center justify-center text-white font-bold text-lg'>
								L
							</div>
							<span className='font-bold text-xl tracking-tight text-nordic'>
								LuxeEstate
							</span>
						</Link>
						<div className='hidden md:ml-10 md:flex md:space-x-8'>
							{adminLinks.map((link) => {
								const isActive = pathname.startsWith(link.href);
								return (
									<Link
										key={link.href}
										href={link.href}
										className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
											isActive
												? 'border-mosque text-nordic'
												: 'border-transparent text-nordic/50 hover:text-mosque hover:border-mosque/30'
										}`}
									>
										{link.label}
									</Link>
								);
							})}
						</div>
					</div>

					{/* Secondary Nav / Profile */}
					<div className='flex items-center gap-4'>
						<button className='p-2 rounded-full text-nordic/40 hover:text-mosque hover:bg-mosque/5 transition-colors cursor-pointer'>
							<span className='material-icons text-xl'>notifications_none</span>
						</button>

						<div className='hidden sm:block'>
							<LanguageSelector />
						</div>

						<div className='flex items-center gap-3 pl-4 border-l border-nordic/10 relative'>
							<div className='hidden sm:flex flex-col items-end'>
								<span className='text-sm font-semibold text-nordic'>
									{user?.user_metadata?.full_name ||
										user?.user_metadata?.name ||
										'Admin User'}
								</span>
								<span className='text-xs text-nordic/50 capitalize'>
									{user?.user_metadata?.role || 'Administrator'}
								</span>
							</div>

							<div
								className='h-9 w-9 rounded-full bg-nordic/10 overflow-hidden ring-2 ring-white cursor-pointer relative'
								onClick={() => setIsProfileOpen((prev) => !prev)}
							>
								<img
									alt='User profile'
									className='h-full w-full object-cover'
									referrerPolicy='no-referrer'
									src={
										user?.user_metadata?.avatar_url ||
										`https://ui-avatars.com/api/?name=${user?.email || 'Admin'}&background=006655&color=fff`
									}
								/>
							</div>

								{isProfileOpen && user && (
									<ProfileDropdownContent
										user={user}
										isAdmin={true}
										dictionary={dictionary}
										isAdminContext={true}
										onClose={() => setIsProfileOpen(false)}
										onSignOut={handleSignOut}
									/>
								)}
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
