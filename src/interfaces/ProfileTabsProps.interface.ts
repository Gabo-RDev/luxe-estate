import { Property } from '@/interfaces/Property.interface';
import { ScheduledVisit } from '@/interfaces/ScheduledVisit.interface';

export interface ProfileTabsProps {
	savedProperties: Property[];
	userEmail: string;
	initialVisits: ScheduledVisit[];
}
