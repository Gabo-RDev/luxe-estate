'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

/**
 * Updates a user's role.
 * Only administrators can perform this action (server-auth-actions compliance).
 */
export async function updateUserRole(userId: string, newRole: string) {
	const supabase = await createClient();

	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser();

	if (authError || !user) {
		throw new Error('Unauthorized: Must be logged in');
	}

	// Verify the caller is an administrator
	const { data: adminData } = await supabase
		.from('user_roles')
		.select('role, status')
		.eq('user_id', user.id)
		.single();

	if (
		!adminData ||
		adminData.role !== 'administrator' ||
		adminData.status !== 'active'
	) {
		throw new Error('Unauthorized: Must be an active administrator');
	}

	// Update the target user's role
	const { error: updateError } = await supabase
		.from('user_roles')
		.update({ role: newRole })
		.eq('user_id', userId);

	if (updateError) {
		throw new Error('Failed to update role');
	}

	// Revalidate the users page to show updated data
	revalidatePath('/admin/users');
	return { success: true };
}
