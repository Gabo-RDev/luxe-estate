import { getAdminUsersData } from '@/features/admin/services/user-service';
import { AdminUserHeader } from '@/features/admin/components/AdminUserHeader';
import { AdminUserTabs } from '@/features/admin/components/AdminUserTabs';
import { AdminUserList } from '@/features/admin/components/AdminUserList';
import { TablePagination } from '@/components/ui/TablePagination';
import { PAGE_SIZE } from '@/lib/constants';
import { Suspense } from 'react';

interface PageProps {
	searchParams: Promise<{ tab?: string; page?: string }>;
}

export default async function AdminUsersPage({ searchParams }: PageProps) {
	const params = await searchParams;
	const currentTab = params.tab || 'all';
	
	const parsedPage = parseInt(params.page ?? '', 10);
	const currentPage = Number.isFinite(parsedPage) ? Math.max(1, parsedPage) : 1;

	const { users, currentUser, firstAdminId, activeUserId, totalPages, totalCount } = await getAdminUsersData(currentTab, currentPage, PAGE_SIZE);

	return (
		<div className="bg-clear-day text-nordic min-h-screen flex flex-col font-sans transition-colors antialiased">
			{/* Header Section */}
			<header className="w-full pt-10 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
				<AdminUserHeader />
				<div className="mt-8">
				    <AdminUserTabs currentTab={currentTab} />
                </div>
			</header>

			{/* Main Content (List) */}
			<AdminUserList
				users={users}
				activeUserId={activeUserId}
				currentUser={currentUser}
				firstAdminId={firstAdminId}
			/>

			{/* Footer Section */}
			{totalPages > 0 && (
				<div className="pt-2 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
					<Suspense fallback={null}>
						<TablePagination
							currentPage={currentPage}
							totalPages={totalPages}
							totalResults={totalCount}
							pageSize={PAGE_SIZE}
							className="px-6 py-4 border border-nordic/5 rounded-xl shadow-sm flex items-center justify-between bg-white"
						/>
					</Suspense>
				</div>
			)}
		</div>
	);
}
