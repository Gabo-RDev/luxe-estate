import Link from 'next/link';

export function AdminUserTabs({ currentTab }: { currentTab: string }) {
	const tabs = [
		{ id: 'all', label: 'All Users', href: '/admin/users?tab=all' },
		{ id: 'agents', label: 'Agents', href: '/admin/users?tab=agents' },
		{ id: 'brokers', label: 'Brokers', href: '/admin/users?tab=brokers' },
		{ id: 'admins', label: 'Admins', href: '/admin/users?tab=admins' },
	];

	return (
		<div className="flex gap-8 border-b border-nordic/10 overflow-x-auto scrollbar-hide">
			{tabs.map((tab) => (
				<Link
					key={tab.id}
					href={tab.href}
					className={`pb-4 text-sm transition-all duration-300 border-b-2 whitespace-nowrap tracking-wide uppercase font-semibold text-[11px] ${
						currentTab === tab.id
							? 'text-mosque border-mosque'
							: 'text-nordic/40 hover:text-nordic/70 border-transparent'
					}`}
				>
					{tab.label}
				</Link>
			))}
		</div>
	);
}
