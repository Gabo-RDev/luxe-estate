import { Property } from '@/types/property';

interface PropertyCardProps {
	property: Property;
	featuredMode?: boolean;
}

export default function PropertyCard({
	property,
	featuredMode = false,
}: PropertyCardProps) {
	// If featuredMode is true, we use a larger card style with Hint of Green background for the highlights
	if (featuredMode) {
		return (
			<div className='group relative rounded-xl overflow-hidden shadow-soft bg-white cursor-pointer'>
				<div className='aspect-4/3 w-full overflow-hidden relative'>
					<img
						alt={property.title}
						className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
						src={property.imageUrl}
					/>
					{property.badge && (
						<div className='absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-nordic'>
							{property.badge}
						</div>
					)}
					<button className='absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-nordic hover:bg-mosque hover:text-white transition-all'>
						<span className='material-icons text-xl'>favorite_border</span>
					</button>
					<div className='absolute bottom-0 inset-x-0 h-1/2 bg-linear-to-t from-black/60 to-transparent opacity-60'></div>
				</div>
				<div className='p-6 relative'>
					<div className='flex justify-between items-start mb-2'>
						<div>
							<h3 className='text-xl font-medium text-nordic group-hover:text-mosque transition-colors'>
								{property.title}
							</h3>
							<p className='text-nordic/70 text-sm flex items-center gap-1 mt-1'>
								<span className='material-icons text-sm'>place</span>{' '}
								{property.location}
							</p>
						</div>
						<span className='text-xl font-semibold text-mosque'>
							${property.price.toLocaleString('en-US')}
							{property.pricePeriod}
						</span>
					</div>
					<div className='flex items-center gap-6 mt-6 pt-6 border-t border-nordic/10'>
						<div className='flex items-center gap-2 text-nordic/80 text-sm'>
							<span className='material-icons text-lg'>king_bed</span>{' '}
							{property.beds} Beds
						</div>
						<div className='flex items-center gap-2 text-nordic/80 text-sm'>
							<span className='material-icons text-lg'>bathtub</span>{' '}
							{property.baths} Baths
						</div>
						<div className='flex items-center gap-2 text-nordic/80 text-sm'>
							<span className='material-icons text-lg'>square_foot</span>{' '}
							{property.area.toLocaleString('en-US')} m²
						</div>
					</div>
				</div>
			</div>
		);
	}

	// Regular card mode
	return (
		<article className='bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer h-full flex flex-col'>
			<div className='relative aspect-4/3 overflow-hidden'>
				<img
					alt={property.title}
					className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
					src={property.imageUrl}
				/>
				<button className='absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-nordic hover:bg-mosque hover:text-white transition-all'>
					<span className='material-icons text-xl'>favorite_border</span>
				</button>
				<div
					className={`absolute bottom-3 left-3 text-white text-xs font-bold px-2 py-1 rounded ${property.listingType === 'Rent' ? 'bg-mosque/90' : 'bg-nordic/90'}`}
				>
					FOR {property.listingType.toUpperCase()}
				</div>
			</div>
			<div className='p-4 flex flex-col grow'>
				<div className='flex justify-between items-baseline mb-2'>
					<h3 className='font-bold text-lg text-nordic'>
						${property.price.toLocaleString('en-US')}
						{property.pricePeriod && (
							<span className='text-sm font-normal text-nordic/70'>
								{property.pricePeriod}
							</span>
						)}
					</h3>
				</div>
				<h4 className='text-nordic font-medium truncate mb-1'>
					{property.title}
				</h4>
				<p className='text-nordic/70 text-xs mb-4'>{property.location}</p>

				<div className='mt-auto flex items-center justify-between pt-3 border-t border-nordic/10'>
					<div className='flex items-center gap-1 text-nordic/80 text-xs'>
						<span className='material-icons text-sm text-mosque'>king_bed</span>{' '}
						{property.beds}
					</div>
					<div className='flex items-center gap-1 text-nordic/80 text-xs'>
						<span className='material-icons text-sm text-mosque'>bathtub</span>{' '}
						{property.baths}
					</div>
					<div className='flex items-center gap-1 text-nordic/80 text-xs'>
						<span className='material-icons text-sm text-mosque'>
							square_foot
						</span>{' '}
						{property.area}m²
					</div>
				</div>
			</div>
		</article>
	);
}
