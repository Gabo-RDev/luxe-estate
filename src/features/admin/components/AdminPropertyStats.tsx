interface AdminPropertyStatsProps {
	totalListings: number;
	activeProperties?: number;
	pendingSale?: number;
}

export function AdminPropertyStats({
	totalListings,
	activeProperties = 18, // Mocked for design fidelity until API supports aggregates
	pendingSale = 4,
}: AdminPropertyStatsProps) {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8'>
			{/* Total Listings */}
			<div className='bg-white p-5 rounded-xl border border-mosque/10 shadow-sm flex items-center justify-between'>
				<div>
					<p className='text-sm font-medium text-gray-500'>Total Listings</p>
					<p className='text-2xl font-bold text-nordic mt-1'>{totalListings}</p>
				</div>
				<div className='h-10 w-10 rounded-full bg-mosque/10 flex items-center justify-center text-mosque'>
					<span className='material-icons'>apartment</span>
				</div>
			</div>

			{/* Active Properties */}
			<div className='bg-white p-5 rounded-xl border border-mosque/10 shadow-sm flex items-center justify-between'>
				<div>
					<p className='text-sm font-medium text-gray-500'>Active Properties</p>
					<p className='text-2xl font-bold text-nordic mt-1'>
						{activeProperties}
					</p>
				</div>
				<div className='h-10 w-10 rounded-full bg-hint-of-green flex items-center justify-center text-mosque'>
					<span className='material-icons'>check_circle</span>
				</div>
			</div>

			{/* Pending Sale */}
			<div className='bg-white p-5 rounded-xl border border-mosque/10 shadow-sm flex items-center justify-between'>
				<div>
					<p className='text-sm font-medium text-gray-500'>Pending Sale</p>
					<p className='text-2xl font-bold text-nordic mt-1'>{pendingSale}</p>
				</div>
				<div className='h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600'>
					<span className='material-icons'>pending</span>
				</div>
			</div>
		</div>
	);
}
