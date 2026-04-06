import { UserRoleDropdown } from '@/components/admin/UserRoleDropdown';
import { getRoleBadgeProps, getStatusProps, getAvatarRingColor } from '../utils/user-styling';

interface AdminUserCardProps {
	user: any;
	isActive: boolean;
	isRestrictedAdmin: boolean;
}

export function AdminUserCard({ user, isActive, isRestrictedAdmin }: AdminUserCardProps) {
	const roleBadge = getRoleBadgeProps(user.roleData.role);
	const statusBadge = getStatusProps(user.roleData.status);
	const avatarRing = getAvatarRingColor(user.roleData.status);
	const userName = user.user_metadata?.name || user.email?.split('@')[0] || 'Unknown User';
	const isInactive = user.roleData.status === 'inactive';
	const isAdmin = user.roleData.role === 'administrator';

	const cardClass = isActive
		? 'relative bg-hint-of-green/20 rounded-2xl p-4 sm:p-6 shadow-[0_4px_20px_-5px_rgba(25,50,47,0.06)] border border-mosque/10 hover:shadow-[0_15px_35px_-10px_rgba(25,50,47,0.12)] flex flex-col md:grid md:grid-cols-12 gap-6 items-center transition-all duration-300 ease-out group cursor-pointer'
		: 'relative bg-white rounded-2xl p-4 sm:p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] border border-transparent hover:border-nordic/5 hover:shadow-[0_15px_35px_-10px_rgba(25,50,47,0.08)] flex flex-col md:grid md:grid-cols-12 gap-6 items-center transition-all duration-300 ease-out group cursor-pointer';

	return (
		<div className={cardClass}>
            {/* Hover accent line */}
            <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 bg-mosque rounded-r-md transition-all duration-300 ease-out ${isActive ? 'h-3/4 opacity-100' : 'h-0 group-hover:h-3/4 opacity-0 group-hover:opacity-100'}`}></div>

			{/* User Details */}
			<div className="col-span-12 md:col-span-4 flex items-center w-full">
				<div className="relative shrink-0">
					{user.user_metadata?.avatar_url ? (
						<img
							src={user.user_metadata.avatar_url}
							alt={userName}
							className={`h-14 w-14 rounded-full object-cover border-[3px] border-white shadow-sm ${
								isInactive ? 'opacity-50 grayscale' : ''
							}`}
						/>
					) : (
						<div
							className={`h-14 w-14 rounded-full bg-nordic/5 border-[3px] border-white shadow-sm flex items-center justify-center font-bold text-xl text-mosque overflow-hidden ${
								isInactive ? 'opacity-50 grayscale' : ''
							}`}
						>
							{userName.charAt(0).toUpperCase()}
						</div>
					)}
					<span
						className={`absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full ring-2 ring-white shadow-sm ${avatarRing}`}
					></span>
				</div>
				<div className="ml-5 overflow-hidden flex flex-col justify-center">
					<div className={`text-base font-semibold truncate transition-colors group-hover:text-mosque ${isInactive ? 'text-nordic/60' : 'text-nordic'}`}>
						{userName}
					</div>
					<div className={`text-xs truncate ${isInactive ? 'text-nordic/40' : 'text-nordic/50'}`}>
						{user.email}
					</div>
					<div
						className={`mt-2 text-[10px] px-2 py-0.5 inline-block font-mono tracking-widest rounded-md ${
							isInactive ? 'bg-gray-50 text-nordic/40' : 'bg-hint-of-green/30 text-nordic/40'
						}`}
					>
						ID: {user.id.substring(0, 6)}
					</div>
				</div>
			</div>

			{/* Role & Status */}
			<div className="col-span-12 md:col-span-3 w-full flex items-center justify-between md:justify-start gap-4">
				<span
					className={`inline-flex items-center px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest ${roleBadge}`}
				>
					{user.roleData.role}
				</span>
				<div className={`flex items-center text-xs font-medium capitalize ${isInactive ? 'text-nordic/40' : 'text-nordic/60 group-hover:text-nordic/80'} transition-colors`}>
					<span className={`material-icons text-[16px] mr-1.5 ${statusBadge.textClass}`}>
						{statusBadge.icon}
					</span>
					{user.roleData.status}
				</div>
			</div>

			{/* Performance */}
			<div className="col-span-12 md:col-span-3 w-full grid grid-cols-2 gap-4">
				<div>
					<div
						className={`text-[10px] uppercase tracking-wider mb-1 ${
							isActive ? 'text-nordic/50' : 'text-nordic/40'
						}`}
					>
						Properties
					</div>
					<div className={`text-sm font-semibold ${isInactive ? 'text-nordic/60' : 'text-nordic group-hover:text-mosque'} transition-colors`}>
						{isAdmin ? '-' : (user.user_metadata?.properties ?? '0')}
					</div>
				</div>
				<div>
					<div
						className={`text-[10px] uppercase tracking-wider mb-1 ${
							isActive ? 'text-nordic/50' : 'text-nordic/40'
						}`}
					>
						{isAdmin ? 'Access Level' : isInactive ? 'Last Login' : 'Sales (YTD)'}
					</div>
					<div className={`text-sm font-semibold ${isInactive ? 'text-nordic/60' : 'text-nordic group-hover:text-mosque'} transition-colors`}>
						{isAdmin
							? 'Level 5'
							: isInactive
							? user.last_sign_in_at
								? new Date(user.last_sign_in_at).toLocaleDateString('en-US', {
										month: 'short',
										year: 'numeric',
								  })
								: '2mo ago'
							: user.user_metadata?.sales_ytd ??
							  (user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'N/A')}
					</div>
				</div>
			</div>

			{/* Actions */}
			<div className="col-span-12 md:col-span-2 w-full flex justify-end relative">
				<UserRoleDropdown
					userId={user.id}
					currentRole={user.roleData.role}
					variant={isActive ? 'active' : 'default'}
					disabled={isRestrictedAdmin}
				/>
			</div>
		</div>
	);
}
