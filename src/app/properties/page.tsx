import { Suspense } from 'react';
import Pagination from '@/components/ui/Pagination';
import PropertyGrid from '@/features/properties/components/PropertyGrid';
import PropertyGridSkeleton from '@/features/properties/components/PropertyGridSkeleton';
import SearchHero from '@/features/properties/components/SearchHero';
import Navigation from '@/components/layout/Navigation';
import { getProperties, PAGE_SIZE, PropertyFilters } from '@/api/properties.api';

interface PropertiesPageProps {
	searchParams: Promise<{
		page?: string;
		query?: string;
		type?: string;
		minPrice?: string;
		maxPrice?: string;
		beds?: string;
		baths?: string;
		location?: string;
	}>;
}

async function PropertiesGrid({
	currentPage,
	filters,
}: {
	currentPage: number;
	filters: PropertyFilters;
}) {
	const { data: properties, totalPages } = await getProperties(
		currentPage,
		PAGE_SIZE,
		filters
	);

	return (
		<>
			<PropertyGrid properties={properties} currentPage={currentPage} />
			<Suspense fallback={null}>
				<Pagination currentPage={currentPage} totalPages={totalPages} />
			</Suspense>
		</>
	);
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
	const params = await searchParams;
	const parsedPage = parseInt(params.page ?? '', 10);
	const currentPage = Number.isFinite(parsedPage) ? Math.max(1, parsedPage) : 1;

	const filters = {
		query: params.query,
		propertyType: params.type?.toLowerCase(),
		minPrice: params.minPrice ? parseInt(params.minPrice, 10) : undefined,
		maxPrice: params.maxPrice ? parseInt(params.maxPrice, 10) : undefined,
		beds: params.beds ? parseInt(params.beds, 10) : undefined,
		baths: params.baths ? parseInt(params.baths, 10) : undefined,
		location: params.location,
	};

	const suspenseKey = JSON.stringify({ currentPage, filters });

	return (
		<div className='min-h-screen'>
			<Navigation />

			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<SearchHero />
				<div className='mb-8'>
					<h1 className='text-3xl font-light text-nordic'>All Properties</h1>
					<p className='text-nordic/70 mt-2 text-sm max-w-2xl'>
						Discover our exclusive selection of luxury real estate properties around the world.
					</p>
				</div>

				<Suspense key={suspenseKey} fallback={<PropertyGridSkeleton />}>
					<PropertiesGrid currentPage={currentPage} filters={filters} />
				</Suspense>
			</main>
		</div>
	);
}
