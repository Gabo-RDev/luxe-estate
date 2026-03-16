export default function PropertyGridSkeleton() {
	// Create an array of 6 skeleton cards to match PAGE_SIZE
	const skeletonCards = Array.from({ length: 6 }, (_, i) => i);

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
			{skeletonCards.map((index) => (
				<div
					key={index}
					className='bg-white rounded-xl overflow-hidden shadow-sm h-full flex flex-col animate-pulse'
				>
					{/* Image Placeholder */}
					<div className='relative aspect-4/3 overflow-hidden bg-nordic/10'></div>

					{/* Content Placeholder */}
					<div className='p-4 flex flex-col grow'>
						{/* Price */}
						<div className='h-6 bg-nordic/15 rounded w-1/3 mb-2'></div>

						{/* Title */}
						<div className='h-5 bg-nordic/10 rounded w-3/4 mb-2 mt-1'></div>

						{/* Location */}
						<div className='h-4 bg-nordic/5 rounded w-1/2 mb-4'></div>

						{/* Footer (Beds, Baths, Area) */}
						<div className='mt-auto flex items-center justify-between pt-3 border-t border-nordic/10'>
							<div className='h-4 bg-nordic/10 rounded w-12'></div>
							<div className='h-4 bg-nordic/10 rounded w-12'></div>
							<div className='h-4 bg-nordic/10 rounded w-16'></div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
