'use server';

import { supabaseAdmin } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

// Shared type for the property payload coming from the form
export interface PropertyPayload {
	title: string;
	price: number;
	listing_type: string;
	property_type: string;
	location: string;
	description: string | null;
	area: number;
	beds: number;
	baths: number;
	parking_spaces: number;
	year_built: number | null;
	amenities: string[] | null;
	image_url: string;
	slug: string;
	lat: number | null;
	lng: number | null;
	is_featured?: boolean;
	badge?: string;
}

async function ensureAdmin() {
	const supabase = await createClient();
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser();

	if (authError || !user) throw new Error('Unauthorized: Not logged in');

	const { data: roleData } = await supabase
		.from('user_roles')
		.select('role, status')
		.eq('user_id', user.id)
		.single();

	if (!roleData || roleData.role !== 'administrator' || roleData.status !== 'active') {
		throw new Error('Unauthorized: Admin access required');
	}
}

export async function createProperty(payload: PropertyPayload): Promise<{ id: string }> {
	await ensureAdmin();

	const { data, error } = await supabaseAdmin
		.from('properties')
		.insert(payload)
		.select('id')
		.single();

	if (error) throw new Error(error.message);

	revalidatePath('/admin/properties');
	revalidatePath('/');
	return data;
}

export async function updateProperty(id: string, payload: Partial<PropertyPayload>): Promise<void> {
	await ensureAdmin();

	const { error } = await supabaseAdmin.from('properties').update(payload).eq('id', id);

	if (error) throw new Error(error.message);

	revalidatePath('/admin/properties');
	revalidatePath('/');
}

export async function insertPropertyImages(
	images: { property_id: string; url: string; order: number }[],
): Promise<void> {
	await ensureAdmin();

	const { error } = await supabaseAdmin.from('property_images').insert(images);
	if (error) throw new Error(error.message);
}
