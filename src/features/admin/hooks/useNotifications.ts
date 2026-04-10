'use client';

import { useState } from 'react';
import { Notification, MOCK_NOTIFICATIONS } from '../types/notification.types';

export function useNotifications() {
	const [isOpen, setIsOpen] = useState(false);
	const [notifications, setNotifications] =
		useState<Notification[]>(MOCK_NOTIFICATIONS);

	const unreadCount = notifications.filter((n) => !n.read).length;

	const markAllRead = () => {
		setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
	};

	const markOneRead = (id: string) => {
		setNotifications((prev) =>
			prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
		);
	};

	const toggleOpen = () => setIsOpen((prev) => !prev);
	const close = () => setIsOpen(false);

	return {
		isOpen,
		notifications,
		unreadCount,
		toggleOpen,
		close,
		markAllRead,
		markOneRead,
	};
}
