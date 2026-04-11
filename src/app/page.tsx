import { Suspense } from 'react';
import Pagination from '@/components/ui/Pagination';
import PropertyGrid from '@/features/properties/components/PropertyGrid';
import SearchHero from '@/features/properties/components/SearchHero';
import PropertyCard from '@/features/properties/components/PropertyCard';
import PropertyGridSkeleton from '@/features/properties/components/PropertyGridSkeleton';
import ListingTypeFilter from '@/features/properties/components/ListingTypeFilter';
import { getFeaturedProperties, getProperties } from '@/api/properties.api';
import { PAGE_SIZE } from '@/lib/constants';
import { PropertyFilters } from '@/interfaces/PropertyFilters.interface';
import { cookies } from 'next/headers';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { defaultLocale, locales } from '@/lib/i18n/config';
import { Locale, Dictionary } from '@/types/I18n';


import { HomeProps } from '@/interfaces/HomeProps.interface';

import { NewInMarketGrid } from '@/features/properties/components/NewInMarketGrid';

export default async function Home({ searchParams }: HomeProps) {
	const params = await searchParams;
	const parsedPage = parseInt(params.page ?? '', 10);
	const currentPage = Number.isFinite(parsedPage) ? Math.max(1, parsedPage) : 1;

	const cookieStore = await cookies();
	const localeCookie = cookieStore.get('NEXT_LOCALE')?.value as Locale;
	const locale = locales.includes(localeCookie) ? localeCookie : defaultLocale;

	// Run independent fetches in parallel (async-parallel rule)
	const [dictionary, allFeaturedPropertiesRaw] = await Promise.all([
		getDictionary(locale),
		getFeaturedProperties(),
	]);

	const filters = {
		query: params.query,
		propertyType: params.type?.toLowerCase(),
		minPrice: params.minPrice ? parseInt(params.minPrice, 10) : undefined,
		maxPrice: params.maxPrice ? parseInt(params.maxPrice, 10) : undefined,
		beds: params.beds ? parseInt(params.beds, 10) : undefined,
		baths: params.baths ? parseInt(params.baths, 10) : undefined,
		location: params.location,
		listingType: params.listingType,
	};

	const hasActiveFilters = Boolean(
		params.query ||
		params.type ||
		params.minPrice ||
		params.maxPrice ||
		params.beds ||
		params.baths ||
		params.location,
	);

	const featuredProperties = allFeaturedPropertiesRaw.slice(0, 2);

	// We use this key for the Suspense so it shows the skeleton again if filters or page changes
	const suspenseKey = JSON.stringify({ currentPage, filters });

	return (
		<div className='min-h-screen'>
			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20'>
				<SearchHero />

				{/* Featured Collections */}
				{!hasActiveFilters && featuredProperties.length > 0 ? (
					<section className='mb-16'>
						<div className='flex items-end justify-between mb-8'>
							<div>
								<h2 className='text-2xl font-light text-nordic'>
									{dictionary.home.featured_collections}
								</h2>
								<p className='text-nordic/70 mt-1 text-sm'>
									{dictionary.home.curated_properties}
								</p>
							</div>
							<a
								className='hidden sm:flex items-center gap-1 text-sm font-medium text-mosque hover:opacity-70 transition-opacity'
								href='#'
							>
								{dictionary.home.view_all}{' '}
								<span className='material-icons text-sm'>arrow_forward</span>
							</a>
						</div>

						<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
							{featuredProperties.map((property) => (
								<PropertyCard
									key={property.id}
									property={property}
									featuredMode={true}
									dictionary={dictionary}
									locale={locale}
								/>

							))}
						</div>
					</section>
				) : null}

				{/* New in Market — id used for smooth scroll target */}
				<section id='new-in-market'>
					<div className='flex items-end justify-between mb-8'>
						<div>
							<h2 className='text-2xl font-light text-nordic'>
								{dictionary.home.new_in_market}
							</h2>
							<p className='text-nordic/70 mt-1 text-sm'>
								{dictionary.home.fresh_opportunities}
							</p>
						</div>
					<ListingTypeFilter />
					</div>

					<Suspense
						key={suspenseKey}
						fallback={<PropertyGridSkeleton />}
					>
						<NewInMarketGrid
							currentPage={currentPage}
							filters={filters}
							dictionary={dictionary}
							locale={locale}
						/>

					</Suspense>
				</section>
			</main>
		</div>
	);
}
