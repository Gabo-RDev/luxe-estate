import { supabaseAdmin } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { PAGE_SIZE } from '@/lib/constants';

/**
 * Service to fetch and process admin user data with pagination.
 */
export async function getAdminUsersData(
	currentTab: string = 'all',
	page: number = 1,
	pageSize: number = PAGE_SIZE
) {
	const supabase = await createClient();

	const safePage = Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;
	const safePageSize = Number.isFinite(pageSize) && pageSize >= 1 ? Math.floor(pageSize) : PAGE_SIZE;

	// Fetch data in parallel - Vercel Best Practice
	const [usersResponse, rolesResponse, sessionResponse] = await Promise.all([
		supabaseAdmin.auth.admin.listUsers(),
		supabaseAdmin.from('user_roles').select('*'),
		supabase.auth.getSession(),
	]);

	const authUsers = usersResponse.data.users || [];
	const dbRoles = rolesResponse.data || [];
	const currentUser = sessionResponse.data.session?.user;

	// Merge Auth data with DB Roles
	const mergedUsers = authUsers.map((user) => {
		const roleRecord = dbRoles.find((r) => r.user_id === user.id);
		return {
			...user,
			roleData: roleRecord || { role: 'viewer', status: 'inactive' },
		};
	});

	// Logic to identify the "First Admin" for protection
	const allAdmins = mergedUsers.filter((u) => u.roleData.role === 'administrator');
	allAdmins.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
	const firstAdminId = allAdmins.length > 0 ? allAdmins[0].id : null;

	// Tab filtering
	let filteredUsers = mergedUsers;
	if (currentTab === 'agents') {
		filteredUsers = mergedUsers.filter((u) => u.roleData.role === 'agent');
	} else if (currentTab === 'brokers') {
		filteredUsers = mergedUsers.filter((u) => ['broker', 'senior broker'].includes(u.roleData.role));
	} else if (currentTab === 'admins') {
		filteredUsers = mergedUsers.filter((u) => u.roleData.role === 'administrator');
	}

	// Active user for visual highlight
	const activeUserId = mergedUsers.find((u) => u.roleData.status === 'active')?.id ?? mergedUsers[0]?.id;

	// Pagination
	const totalCount = filteredUsers.length;
	const totalPages = Math.max(1, Math.ceil(totalCount / safePageSize));
	const from = (safePage - 1) * safePageSize;
	const paginatedUsers = filteredUsers.slice(from, from + safePageSize);

	return {
		users: paginatedUsers,
		totalCount,
		totalPages,
		currentPage: safePage,
		currentUser,
		firstAdminId,
		activeUserId,
	};
}
