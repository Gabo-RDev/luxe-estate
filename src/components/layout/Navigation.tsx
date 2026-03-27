'use client';

import { usePathname } from 'next/navigation';
import { useI18n } from '@/lib/i18n/i18n-context';
import { AdminNav } from './AdminNav';
import { PublicNav } from './PublicNav';
import type { User } from '@supabase/supabase-js';

export default function Navigation({ user, userRole }: { user: User | null, userRole?: string | null }) {
	const pathname = usePathname();
	const { dictionary } = useI18n();

	// Avoid breaking if pathname is null during very early edge rendering
	const currentPath = pathname || '';
	const isAdmin = currentPath.startsWith('/admin');

	return isAdmin ? (
		<AdminNav user={user} userRole={userRole} dictionary={dictionary} />
	) : (
		<PublicNav user={user} userRole={userRole} dictionary={dictionary} />
	);
}
