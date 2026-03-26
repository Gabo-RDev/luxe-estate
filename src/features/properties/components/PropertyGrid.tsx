'use client';

import PropertyCard from './PropertyCard';
import { PropertyGridProps } from '@/interfaces/PropertyGridProps.interface';

export default function PropertyGrid({
	properties,
	currentPage,
}: PropertyGridProps) {
	return (
		// key forces a full remount → restarts the CSS animation on every page change
		<div
			key={currentPage}
			className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-slide-up'
		>
			{properties.map((property) => (
				<div key={property.id} style={{ contentVisibility: 'auto', containIntrinsicHeight: '400px' }}>
					<PropertyCard property={property} />
				</div>
			))}
		</div>
	);
}
