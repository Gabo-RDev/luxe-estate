'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '@/hooks/useNavigation';
import { LanguageSelector } from '../ui/LanguageSelector';
import type { User } from '@supabase/supabase-js';
import type { Dictionary } from '@/types/I18n';

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

							<AnimatePresence>
								{isProfileOpen && (
									<>
										{/* Full-screen backdrop with explicit dimensions to bypass containing blocks */}
										<div 
											className="fixed left-0! top-0! w-screen! h-screen! z-100 bg-black/0 cursor-default" 
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
											className='absolute right-0 top-12 mt-2 w-64 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-nordic/10 z-101 overflow-hidden'
										>
											<div className='px-6 pt-5 pb-4 border-b border-nordic/5 flex flex-col'>
												<p className='text-[10px] font-bold text-nordic/30 uppercase tracking-widest mb-1'>
													{dictionary.auth.account || 'ACCOUNT'}
												</p>
												<p className='text-base font-bold text-nordic truncate leading-tight'>
													{user?.user_metadata?.full_name ||
														user?.user_metadata?.name ||
														'Admin'}
												</p>
												<p className='text-xs text-nordic/40 truncate mt-0.5 font-medium'>
													{user?.email}
												</p>
											</div>

											<div className='py-2'>
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
												
												{/* Link back to site if in admin */}
												<Link
													href='/'
													className='flex items-center gap-3 px-6 py-3 text-sm font-medium text-nordic/70 hover:text-nordic hover:bg-gray-50 transition-colors'
													onClick={() => setIsProfileOpen(false)}
												>
													<span className='material-icons text-xl text-nordic/30'>
														home
													</span>
													{dictionary.common.view_site || 'View Website'}
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
													<span className='material-icons text-xl text-red-400 group-hover:text-red-500 transition-colors'>logout</span>
													{dictionary.auth.signout}
												</button>
											</div>
										</motion.div>
									</>
								)}
							</AnimatePresence>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
