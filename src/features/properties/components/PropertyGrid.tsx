'use client';

import PropertyCard from './PropertyCard';
import { Property } from '@/types/Property';

interface PropertyGridProps {
	properties: Property[];
	currentPage: number;
}

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
				<PropertyCard
					key={property.id}
					property={property}
				/>
			))}
		</div>
	);
}
