import { Suspense } from 'react';
import Pagination from '@/components/ui/Pagination';
import PropertyGrid from '@/features/properties/components/PropertyGrid';
import SearchHero from '@/features/properties/components/SearchHero';
import PropertyCard from '@/features/properties/components/PropertyCard';
import PropertyGridSkeleton from '@/features/properties/components/PropertyGridSkeleton';
import Navigation from '@/components/layout/Navigation';
import {
	getFeaturedProperties,
	getProperties,
	PAGE_SIZE,
	PropertyFilters,
} from '@/api/properties.api';

interface HomeProps {
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

// Extract the grid portion to a Server Component to wrap with Suspense
async function NewInMarketGrid({
	currentPage,
	filters,
}: {
	currentPage: number;
	filters: PropertyFilters;
}) {
	const { data: newProperties, totalPages } = await getProperties(
		currentPage,
		PAGE_SIZE,
		filters
	);

	return (
		<>
			{/* Client wrapper: handles fade animation + scroll-to-section on page change */}
			<PropertyGrid
				properties={newProperties}
				currentPage={currentPage}
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

export default async function Home({ searchParams }: HomeProps) {
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

	const hasActiveFilters = Boolean(
		params.query ||
		params.type ||
		params.minPrice ||
		params.maxPrice ||
		params.beds ||
		params.baths ||
		params.location
	);

	// Only fetch featured properties at the top level route
	const allFeaturedProperties = await getFeaturedProperties();
	const featuredProperties = allFeaturedProperties.slice(0, 2);

	// We use this key for the Suspense so it shows the skeleton again if filters or page changes
	const suspenseKey = JSON.stringify({ currentPage, filters });

	return (
		<div className='min-h-screen'>
			<Navigation />

			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20'>
				<SearchHero />

				{/* Featured Collections */}
				{!hasActiveFilters && featuredProperties.length > 0 && (
					<section className='mb-16'>
						<div className='flex items-end justify-between mb-8'>
							<div>
								<h2 className='text-2xl font-light text-nordic'>
									Featured Collections
								</h2>
								<p className='text-nordic/70 mt-1 text-sm'>
									Curated properties for the discerning eye.
								</p>
							</div>
							<a
								className='hidden sm:flex items-center gap-1 text-sm font-medium text-mosque hover:opacity-70 transition-opacity'
								href='#'
							>
								View all{' '}
								<span className='material-icons text-sm'>arrow_forward</span>
							</a>
						</div>

						<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
							{featuredProperties.map((property) => (
								<PropertyCard
									key={property.id}
									property={property}
									featuredMode={true}
								/>
							))}
						</div>
					</section>
				)}

				{/* New in Market — id used for smooth scroll target */}
				<section id='new-in-market'>
					<div className='flex items-end justify-between mb-8'>
						<div>
							<h2 className='text-2xl font-light text-nordic'>New in Market</h2>
							<p className='text-nordic/70 mt-1 text-sm'>
								Fresh opportunities added this week.
							</p>
						</div>
						<div className='hidden md:flex bg-white p-1 rounded-lg shadow-sm border border-nordic/5'>
							<button className='px-4 py-1.5 rounded-md text-sm font-medium bg-nordic text-white'>
								All
							</button>
							<button className='px-4 py-1.5 rounded-md text-sm font-medium text-nordic/70 hover:text-nordic'>
								Buy
							</button>
							<button className='px-4 py-1.5 rounded-md text-sm font-medium text-nordic/70 hover:text-nordic'>
								Rent
							</button>
						</div>
					</div>

					<Suspense key={suspenseKey} fallback={<PropertyGridSkeleton />}>
						<NewInMarketGrid currentPage={currentPage} filters={filters} />
					</Suspense>
				</section>
			</main>
		</div>
	);
}
