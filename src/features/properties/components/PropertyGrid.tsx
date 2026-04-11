import PropertyCard from './PropertyCard';
import { PropertyGridProps } from '@/interfaces/PropertyGridProps.interface';

export default function PropertyGrid({
	properties,
	currentPage,
	isFavoriteMode,
	dictionary,
	locale,
	viewMode = 'grid',
}: PropertyGridProps) {
	const gridClass =
		viewMode === 'list'
			? 'flex flex-col gap-6 animate-fade-slide-up max-w-4xl mx-auto'
			: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-slide-up';

	return (
		// key forces a full remount if this were a client component,
		// but as a server component it helps React identify the list change.
		<div
			key={currentPage}
			className={gridClass}
		>
			{properties.map((property) => (
				<div
					key={property.id}
					style={{ contentVisibility: 'auto', containIntrinsicHeight: '400px' }}
				>
					<PropertyCard
						property={property}
						isFavoriteMode={isFavoriteMode}
						dictionary={dictionary}
						locale={locale}
						viewMode={viewMode}
					/>
				</div>
			))}
			{isFavoriteMode && (
				<a
					href='/properties'
					className='group bg-hintgreen/30 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border-2 border-dashed border-mosque/30 hover:border-mosque flex flex-col h-full items-center justify-center min-h-100 cursor-pointer text-center p-6'
				>
					<div className='w-16 h-16 rounded-full bg-hintgreen flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
						<span className='material-icons text-mosque text-3xl'>add</span>
					</div>
					<h3 className='text-xl font-bold text-nordic mb-2'>
						{dictionary.favorites_page?.discover_more || 'Discover More'}
					</h3>
					<p className='text-nordic/70 text-sm mb-6 max-w-50'>
						{dictionary.favorites_page?.discover_desc ||
							'Find more properties that match your lifestyle.'}
					</p>
					<button className='px-6 py-2.5 rounded-lg bg-mosque text-white font-medium text-sm shadow-lg shadow-mosque/30 hover:shadow-mosque/50 transition-all'>
						{dictionary.favorites_page?.browse_listings || 'Browse Listings'}
					</button>
				</a>
			)}
		</div>
	);
}
