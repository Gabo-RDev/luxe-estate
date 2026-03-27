// Using server component as leaf, or basic component without state
export function AdminPropertyHeader() {
	return (
		<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8'>
			<div>
				<h1 className='text-3xl font-bold text-nordic tracking-tight'>
					My Properties
				</h1>
				<p className='text-gray-500 mt-1'>
					Manage your portfolio and track performance.
				</p>
			</div>

			<div className='flex items-center gap-3'>
				<button className='bg-white border border-gray-200 text-nordic hover:bg-gray-50 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer'>
					<span className='material-icons text-base'>filter_list</span> Filter
				</button>
				<button className='bg-mosque hover:bg-mosque/90 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-md shadow-mosque/20 transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer'>
					<span className='material-icons text-base'>add</span> Add New Property
				</button>
			</div>
		</div>
	);
}
