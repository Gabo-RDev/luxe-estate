'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export interface ScheduleVisitPayload {
	propertyId: string;
	propertyTitle: string;
	visitDate: string; // YYYY-MM-DD
	visitTime: string; // e.g. "10:00 AM"
	message?: string;
}

export async function scheduleVisit(payload: ScheduleVisitPayload) {
	const supabase = await createClient();

	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser();

	if (authError || !user) {
		return { success: false, error: 'You must be logged in to schedule a visit.' };
	}

	const { error } = await supabase.from('property_visits').insert({
		user_id: user.id,
		property_id: payload.propertyId,
		property_title: payload.propertyTitle,
		visit_date: payload.visitDate,
		visit_time: payload.visitTime,
		message: payload.message || null,
		status: 'confirmed',
	});

	if (error) {
		console.error('[scheduleVisit]', error.message);
		return { success: false, error: error.message };
	}

	revalidatePath('/profile');
	return { success: true };
}

export async function cancelVisit(visitId: string) {
	const supabase = await createClient();

	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser();

	if (authError || !user) {
		return { success: false, error: 'Unauthorized' };
	}

	const { error } = await supabase
		.from('property_visits')
		.update({ status: 'cancelled' })
		.eq('id', visitId)
		.eq('user_id', user.id);

	if (error) {
		console.error('[cancelVisit]', error.message);
		return { success: false, error: error.message };
	}

	revalidatePath('/profile');
	return { success: true };
}

export async function getUserVisits() {
	const supabase = await createClient();

	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser();

	if (authError || !user) {
		return [];
	}

	const { data, error } = await supabase
		.from('property_visits')
		.select('*')
		.eq('user_id', user.id)
		.eq('status', 'confirmed')
		.order('visit_date', { ascending: true });

	if (error) {
		console.error('[getUserVisits]', error.message);
		return [];
	}

	return data ?? [];
}
