import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cancelVisit } from '@/app/properties/[slug]/schedule/actions';
import { ScheduledVisit } from '@/interfaces/ScheduledVisit.interface';
import { PROFILE_TABS } from '@/lib/constants';

type TabName = (typeof PROFILE_TABS)[number];

export function useProfileTabs(initialVisits: ScheduledVisit[]) {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState<TabName>('Saved Properties');
	const [visits, setVisits] = useState<ScheduledVisit[]>(initialVisits);
	const [cancellingId, setCancellingId] = useState<string | null>(null);
	const [notificationsEnabled, setNotificationsEnabled] = useState(true);

	const handleCancelVisit = async (visitId: string) => {
		setCancellingId(visitId);
		try {
			const result = await cancelVisit(visitId);
			if (result.success) {
				// Optimistic removal
				setVisits((prev) => prev.filter((v) => v.id !== visitId));
				router.refresh();
			}
		} catch (e) {
			console.error('Failed to cancel visit', e);
		} finally {
			setCancellingId(null);
		}
	};

	return {
		activeTab,
		setActiveTab,
		visits,
		cancellingId,
		notificationsEnabled,
		setNotificationsEnabled,
		handleCancelVisit,
	};
}
