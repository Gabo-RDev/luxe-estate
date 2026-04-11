export interface ScheduledVisit {
	id: string;
	property_id: string;
	property_title: string;
	visit_date: string;
	visit_time: string;
	message: string | null;
	status: string;
	created_at: string;
}
