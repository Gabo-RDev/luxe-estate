'use client';

import { useNotifications } from '@/features/admin/hooks/useNotifications';
import dynamic from 'next/dynamic';

const NotificationsDropdownContent = dynamic(
	() => import('./NotificationsDropdownContent'),
	{ ssr: false }
);

interface NotificationsDropdownProps {
	variant?: 'admin' | 'public';
}

const BUTTON_CLASS: Record<NonNullable<NotificationsDropdownProps['variant']>, string> = {
	admin: 'p-2 rounded-full text-nordic/40 hover:text-mosque hover:bg-mosque/5 transition-colors cursor-pointer relative',
	public: 'hidden md:flex w-10 h-10 items-center justify-center text-nordic hover:text-mosque hover:bg-nordic/5 rounded-full transition-colors relative cursor-pointer',
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

			{isOpen && (
				<NotificationsDropdownContent
					notifications={notifications}
					unreadCount={unreadCount}
					close={close}
					markAllRead={markAllRead}
					markOneRead={markOneRead}
				/>
			)}
		</div>
	);
}
