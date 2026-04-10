export type NotificationType = 'new_property' | 'price_update' | 'inquiry' | 'system';

export interface Notification {
	id: string;
	type: NotificationType;
	title: string;
	message: string;
	time: string;
	read: boolean;
}

export const NOTIFICATION_ICON: Record<NotificationType, string> = {
	inquiry: 'forum',
	new_property: 'add_home',
	price_update: 'trending_down',
	system: 'info',
};

export const NOTIFICATION_COLOR: Record<NotificationType, string> = {
	inquiry: 'bg-blue-50 text-blue-600',
	new_property: 'bg-emerald-50 text-emerald-600',
	price_update: 'bg-amber-50 text-amber-600',
	system: 'bg-gray-100 text-gray-500',
};

export const MOCK_NOTIFICATIONS: Notification[] = [
	{
		id: '1',
		type: 'inquiry',
		title: 'New Inquiry',
		message: 'Someone asked about "Modern Penthouse with Ocean View"',
		time: '2 min ago',
		read: false,
	},
	{
		id: '2',
		type: 'new_property',
		title: 'Property Created',
		message: 'Villa Mediterránea was published successfully.',
		time: '1 hour ago',
		read: false,
	},
	{
		id: '3',
		type: 'price_update',
		title: 'Price Changed',
		message: 'Beachfront Villa dropped from $4.2M to $3.9M.',
		time: '3 hours ago',
		read: true,
	},
	{
		id: '4',
		type: 'system',
		title: 'System Update',
		message: 'LuxeEstate platform updated to v2.4.0.',
		time: 'Yesterday',
		read: true,
	},
];
