import { AdminUserCard } from './AdminUserCard';

interface AdminUserListProps {
	users: any[];
	activeUserId?: string;
	currentUser?: any;
	firstAdminId?: string | null;
}

export function AdminUserList({ users, activeUserId, currentUser, firstAdminId }: AdminUserListProps) {
	return (
		<main id="admin-list-top" className="grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pb-10 space-y-4">
			{/* Column headers */}
			<div className="hidden md:grid grid-cols-12 gap-6 px-8 text-[11px] font-semibold uppercase tracking-widest text-nordic/40 mb-4">
				<div className="col-span-4">User Details</div>
				<div className="col-span-3">Role & Status</div>
				<div className="col-span-3">Performance</div>
				<div className="col-span-2 text-right">Actions</div>
			</div>

			{users.map((user) => {
				const isActive = user.id === activeUserId;
				const isAdmin = user.roleData.role === 'administrator';
				const isRestrictedAdmin = isAdmin && currentUser?.id !== firstAdminId;

				return (
					<AdminUserCard
						key={user.id}
						user={user}
						isActive={isActive}
						isRestrictedAdmin={isRestrictedAdmin}
					/>
				);
			})}

            {users.length === 0 && (
                <div className="py-20 text-center text-nordic/40">
                    <span className="material-icons text-5xl mb-4 opacity-30">
                        groups
                    </span>
                    <p className="text-sm uppercase tracking-widest font-semibold">No users found in this category</p>
                </div>
            )}
		</main>
	);
}
