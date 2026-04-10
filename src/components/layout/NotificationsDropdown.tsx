'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '@/features/admin/hooks/useNotifications';
import {
	NOTIFICATION_COLOR,
	NOTIFICATION_ICON,
} from '@/features/admin/types/notification.types';

interface NotificationsDropdownProps {
	variant?: 'admin' | 'public';
}

const BUTTON_CLASS: Record<
	NonNullable<NotificationsDropdownProps['variant']>,
	string
> = {
	admin:
		'p-2 rounded-full text-nordic/40 hover:text-mosque hover:bg-mosque/5 transition-colors cursor-pointer relative',
	public:
		'hidden md:flex w-10 h-10 items-center justify-center text-nordic hover:text-mosque hover:bg-nordic/5 rounded-full transition-colors relative cursor-pointer',
};

export function NotificationsDropdown({
	variant = 'admin',
}: NotificationsDropdownProps) {
	const {
		isOpen,
		notifications,
		unreadCount,
		toggleOpen,
		close,
		markAllRead,
		markOneRead,
	} = useNotifications();

	return (
		<div className='relative'>
			<button
				className={BUTTON_CLASS[variant]}
				onClick={toggleOpen}
				aria-label='Notifications'
			>
				<span className='material-icons text-xl'>notifications_none</span>
				{unreadCount > 0 && (
					<span className='absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white'></span>
				)}
			</button>

			<AnimatePresence>
				{isOpen && (
					<>
						<div
							className='fixed left-0! top-0! w-screen! h-screen! z-100 bg-black/0 cursor-default'
							onClick={close}
						/>
						<motion.div
							initial={{ opacity: 0, y: 10, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: 10, scale: 0.95 }}
							transition={{ duration: 0.15, ease: 'easeOut' }}
							className='absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-nordic/10 z-200 overflow-hidden'
						>
							{/* Header */}
							<div className='px-5 py-4 border-b border-gray-100 flex items-center justify-between'>
								<div>
									<p className='text-sm font-bold text-nordic'>Notifications</p>
									{unreadCount > 0 && (
										<p className='text-xs text-gray-400 mt-0.5'>
											{unreadCount} unread
										</p>
									)}
								</div>
								{unreadCount > 0 && (
									<button
										onClick={markAllRead}
										className='text-xs text-mosque hover:text-nordic font-medium transition-colors cursor-pointer'
									>
										Mark all read
									</button>
								)}
							</div>

							{/* List */}
							<div className='max-h-72 overflow-y-auto divide-y divide-gray-50'>
								{notifications.map((n) => (
									<button
										key={n.id}
										onClick={() => markOneRead(n.id)}
										className={`w-full text-left flex gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors cursor-pointer ${
											!n.read ? 'bg-blue-50/30' : ''
										}`}
									>
										<div
											className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${NOTIFICATION_COLOR[n.type]}`}
										>
											<span className='material-icons text-sm'>
												{NOTIFICATION_ICON[n.type]}
											</span>
										</div>

										<div className='min-w-0 flex-1'>
											<p
												className={`text-xs font-semibold ${!n.read ? 'text-nordic' : 'text-gray-600'}`}
											>
												{n.title}
											</p>
											<p className='text-xs text-gray-500 leading-snug mt-0.5 truncate'>
												{n.message}
											</p>
											<p className='text-[10px] text-gray-400 mt-1'>{n.time}</p>
										</div>

										{!n.read && (
											<div className='shrink-0 mt-1.5'>
												<span className='w-2 h-2 rounded-full bg-mosque block'></span>
											</div>
										)}
									</button>
								))}
							</div>

							{/* Footer */}
							<div className='border-t border-gray-100 px-5 py-3 text-center'>
								<button
									onClick={close}
									className='text-xs text-mosque font-medium hover:text-nordic transition-colors cursor-pointer'
								>
									View all notifications
								</button>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
}
