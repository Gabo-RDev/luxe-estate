export function AdminUserHeader() {
	return (
		<div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
			<div>
				<h1 className="text-4xl font-light tracking-tight text-nordic">User Directory</h1>
				<p className="text-nordic/60 mt-2 text-sm max-w-lg">Manage user access and roles for your properties.</p>
			</div>
			<div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
				{/* Search */}
				<div className="relative group w-full md:w-80">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center justify-center pointer-events-none">
						<span className="material-icons text-nordic/40 group-focus-within:text-mosque text-xl transition-colors">
							search
						</span>
					</div>
					<input
						className="block w-full pl-10 pr-3 py-3 border-none rounded-full bg-white text-nordic shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] placeholder-nordic/30 focus:ring-2 focus:ring-mosque focus:bg-white transition-all text-sm hover:shadow-[0_4px_15px_-4px_rgba(0,0,0,0.05)]"
						placeholder="Search by name, email..."
						type="text"
					/>
				</div>
				{/* Add User */}
				<button className="group relative inline-flex items-center justify-center px-6 py-3 bg-mosque shadow-xl shadow-mosque/20 overflow-hidden text-sm font-medium rounded-full text-white hover:shadow-2xl hover:shadow-mosque/30 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mosque transition-all duration-300 whitespace-nowrap cursor-pointer">
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
					<span className="material-icons text-lg mr-2 relative z-10">add</span>
					<span className="relative z-10 tracking-wide">Add User</span>
				</button>
			</div>
		</div>
	);
}
