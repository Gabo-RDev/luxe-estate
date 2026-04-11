import { Suspense } from 'react';
import PropertyGrid from '@/features/properties/components/PropertyGrid';
import Pagination from '@/components/ui/Pagination';
import { getProperties } from '@/api/properties.api';
import { PAGE_SIZE } from '@/lib/constants';
import { PropertyFilters } from '@/interfaces/PropertyFilters.interface';
import { Locale, Dictionary } from '@/types/I18n';

export async function NewInMarketGrid({
	currentPage,
	filters,
	dictionary,
	locale,
}: {
	currentPage: number;
	filters: PropertyFilters;
	dictionary: Dictionary;
	locale: Locale;
}) {
	const { data: newProperties, totalPages } = await getProperties(
		currentPage,
		PAGE_SIZE,
		filters,
	);

	return (
		<>
			{/* Client wrapper: handles fade animation + scroll-to-section on page change */}
			<PropertyGrid
				properties={newProperties}
				currentPage={currentPage}
				dictionary={dictionary}
				locale={locale}
			/>

			{/* Pagination — scroll={false} on all Links to avoid jump-to-top */}
			<Suspense fallback={null}>
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
				/>
			</Suspense>
		</>
	);
}
