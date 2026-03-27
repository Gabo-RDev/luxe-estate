'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { updateUserRole } from '@/app/admin/actions';
import { motion, AnimatePresence } from 'framer-motion';

export function UserRoleDropdown({
	userId,
	currentRole,
	variant = 'default',
	disabled = false,
}: {
	userId: string;
	currentRole: string;
	variant?: 'default' | 'active';
	disabled?: boolean;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [isPending, startTransition] = useTransition();
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleRoleChange = (newRole: string) => {
		setIsOpen(false);
		startTransition(() => {
			updateUserRole(userId, newRole).catch((err) => {
				console.error('Failed to change role', err);
			});
		});
	};

	const roles = [
		{ id: 'administrator', label: 'Administrator', icon: 'shield' },
		{ id: 'broker', label: 'Broker', icon: 'business_center' },
		{ id: 'agent', label: 'Agent', icon: 'support_agent' },
		{ id: 'viewer', label: 'Viewer', icon: 'visibility' },
	];

	const buttonClass = isOpen
		? 'inline-flex items-center px-4 py-2 bg-mosque text-white shadow-md text-xs font-medium rounded-lg hover:bg-mosque/80 focus:outline-none transition-colors w-full md:w-auto justify-center'
		: variant === 'active'
		? 'inline-flex items-center px-4 py-2 border border-nordic/10 bg-white shadow-sm text-xs font-medium rounded-lg text-nordic hover:bg-nordic hover:text-white focus:outline-none transition-colors w-full md:w-auto justify-center'
		: 'inline-flex items-center px-4 py-2 border border-gray-200 bg-transparent text-xs font-medium rounded-lg text-nordic/70 hover:border-nordic hover:text-nordic focus:outline-none transition-colors w-full md:w-auto justify-center group-hover:bg-white group-hover:shadow-sm';

	return (
		<div
			className='relative inline-block text-left w-full md:w-auto'
			ref={dropdownRef}
		>
			<button
				onClick={() => !disabled && setIsOpen(!isOpen)}
				disabled={isPending || disabled}
				className={`${buttonClass} disabled:opacity-50 disabled:cursor-not-allowed`}
			>
				{isPending ? 'Updating...' : 'Change Role'}
				<span className='material-icons text-[16px] ml-2'>
					{isOpen ? 'expand_less' : 'expand_more'}
				</span>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						transition={{ duration: 0.15, ease: 'easeOut' }}
						className='absolute top-full right-0 mt-2 w-48 rounded-lg shadow-dropdown bg-mosque ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden z-50 origin-top-right'
					>
						<div
							className='py-1'
							role='menu'
							aria-orientation='vertical'
						>
							{roles.map((role) => (
								<button
									key={role.id}
									onClick={() => handleRoleChange(role.id)}
									className={`w-full cursor-pointer text-left group flex items-center px-4 py-3 text-xs transition-colors ${
										currentRole === role.id
											? 'bg-white/10 text-white font-medium'
											: 'text-white/70 hover:bg-white/10 hover:text-white'
									}`}
									role='menuitem'
								>
									<span
										className={`material-icons text-sm mr-3 ${
											currentRole === role.id
												? 'text-white'
												: 'text-white/50 group-hover:text-white'
										}`}
									>
										{role.icon}
									</span>
									{role.label}
								</button>
							))}
							<div className='border-t border-white/10 my-1'></div>
							<button
								onClick={() => handleRoleChange('suspended')}
								className='w-full cursor-pointer text-left group flex items-center px-4 py-3 text-xs text-red-200 hover:bg-red-500/20 hover:text-red-100 transition-colors'
								role='menuitem'
							>
								<span className='material-icons text-sm mr-3 text-red-300 group-hover:text-red-100'>
									block
								</span>
								Suspend User
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
