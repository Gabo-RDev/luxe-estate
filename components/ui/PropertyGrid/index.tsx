'use client';

import { useEffect, useRef } from 'react';
import PropertyCard from '@/components/ui/PropertyCard';
import { Property } from '@/types/property';

interface PropertyGridProps {
	properties: Property[];
	currentPage: number;
}

export default function PropertyGrid({
	properties,
	currentPage,
}: PropertyGridProps) {
	const isFirstRender = useRef(true);

	useEffect(() => {
		// Skip scroll on the very first mount — user is already at top
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		// Smooth-scroll to the section header after each page change
		const section = document.getElementById('new-in-market');
		if (section) {
			section.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}, [currentPage]);

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
