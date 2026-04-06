/**
 * Helper functions for styling user roles and statuses in the Admin Dashboard.
 */

export function getRoleBadgeProps(role?: string) {
	switch (role) {
		case 'administrator':
			return 'bg-nordic text-white';
		case 'broker':
		case 'senior broker':
			return 'bg-mosque/10 text-mosque';
		case 'agent':
			return 'bg-gray-100 text-gray-600';
		case 'viewer':
		default:
			return 'bg-gray-100 text-gray-500';
	}
}

export function getStatusProps(status?: string) {
	switch (status) {
		case 'active':
			return { icon: 'check_circle', textClass: 'text-mosque' };
		case 'away':
			return { icon: 'schedule', textClass: 'text-gray-400' };
		case 'suspended':
			return { icon: 'block', textClass: 'text-red-500' };
		case 'inactive':
		default:
			return { icon: 'remove_circle_outline', textClass: 'text-gray-500' };
	}
}

export function getAvatarRingColor(status?: string) {
	switch (status) {
		case 'active':
			return 'bg-green-400';
		case 'away':
			return 'bg-yellow-400';
		case 'suspended':
			return 'bg-red-400';
		default:
			return 'bg-gray-400';
	}
}
