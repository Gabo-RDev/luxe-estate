interface AdminUserPaginationProps {
	totalUsers: number;
	currentCount: number;
}

export function AdminUserPagination({ totalUsers, currentCount }: AdminUserPaginationProps) {
	return (
		<footer className="mt-auto border-t border-nordic/5 bg-clear-day py-6 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto flex items-center justify-between">
				<div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
					<div>
						<p className="text-sm text-nordic/60">
							Showing <span className="font-medium text-nordic">1</span> to{' '}
							<span className="font-medium text-nordic">{currentCount}</span> of{' '}
							<span className="font-medium text-nordic">{totalUsers}</span> users
						</p>
					</div>
					<div>
						<nav
							aria-label="Pagination"
							className="relative z-0 inline-flex rounded-md shadow-none -space-x-px"
						>
							<a
								href="#"
								className="relative inline-flex items-center px-2 py-2 rounded-l-md text-sm font-medium text-nordic/50 hover:text-mosque transition-colors"
							>
								<span className="sr-only">Previous</span>
								<span className="material-icons text-xl">chevron_left</span>
							</a>
							<a
								href="#"
								aria-current="page"
								className="z-10 bg-mosque text-white relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md mx-1 shadow-sm"
							>
								1
							</a>
							<a
								href="#"
								className="bg-transparent text-nordic/70 hover:bg-white hover:text-mosque relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md mx-1 transition-colors"
							>
								2
							</a>
							<a
								href="#"
								className="bg-transparent text-nordic/70 hover:bg-white hover:text-mosque relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md mx-1 transition-colors"
							>
								3
							</a>
							<span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-nordic/40">
								...
							</span>
							<a
								href="#"
								className="bg-transparent text-nordic/70 hover:bg-white hover:text-mosque relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md mx-1 transition-colors"
							>
								8
							</a>
							<a
								href="#"
								className="relative inline-flex items-center px-2 py-2 rounded-r-md text-sm font-medium text-nordic/50 hover:text-mosque transition-colors"
							>
								<span className="sr-only">Next</span>
								<span className="material-icons text-xl">chevron_right</span>
							</a>
						</nav>
					</div>
				</div>
				{/* Mobile pagination */}
				<div className="flex items-center justify-between w-full sm:hidden">
					<a
						href="#"
						className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-nordic bg-white border border-gray-300 hover:bg-gray-50"
					>
						Previous
					</a>
					<a
						href="#"
						className="ml-3 relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-nordic bg-white border border-gray-300 hover:bg-gray-50"
					>
						Next
					</a>
				</div>
			</div>
		</footer>
	);
}
