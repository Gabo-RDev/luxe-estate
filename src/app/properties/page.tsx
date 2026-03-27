import { Suspense } from 'react';
import { TablePagination } from '@/components/ui/TablePagination';
import PropertyGrid from '@/features/properties/components/PropertyGrid';
import PropertyGridSkeleton from '@/features/properties/components/PropertyGridSkeleton';
import SearchHero from '@/features/properties/components/SearchHero';
import { getProperties } from '@/api/properties.api';
import { PAGE_SIZE } from '@/lib/constants';
import { PropertyFilters } from '@/interfaces/PropertyFilters.interface';
import { cookies } from 'next/headers';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { defaultLocale, locales } from '@/lib/i18n/config';
import { Locale, Dictionary } from '@/types/I18n';


import { PropertiesPageProps } from '@/interfaces/PropertiesPageProps.interface';

async function PropertiesGrid({
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

	const { data: properties, totalPages, totalCount } = await getProperties(
		currentPage,
		PAGE_SIZE,
		filters,
	);

	return (
		<>
			<PropertyGrid
				properties={properties}
				currentPage={currentPage}
				dictionary={dictionary}
				locale={locale}
			/>

			<Suspense fallback={null}>
				<TablePagination
					currentPage={currentPage}
					totalPages={totalPages}
					totalResults={totalCount}
					pageSize={PAGE_SIZE}
					className="mt-12 px-6 py-4 border border-nordic/5 rounded-xl shadow-sm flex items-center justify-between bg-white"
				/>
			</Suspense>
		</>
	);
}

export default async function PropertiesPage({
	searchParams,
}: PropertiesPageProps) {
	const [params, cookieStore] = await Promise.all([searchParams, cookies()]);
	
	const parsedPage = parseInt(params.page ?? '', 10);
	const currentPage = Number.isFinite(parsedPage) ? Math.max(1, parsedPage) : 1;

	const localeCookie = cookieStore.get('NEXT_LOCALE')?.value as Locale;
	const locale = locales.includes(localeCookie) ? localeCookie : defaultLocale;
	const dictionary = await getDictionary(locale);

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
			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<SearchHero />
				<div className='mb-8'>
					<h1 className='text-3xl font-light text-nordic'>
						{dictionary.properties_page.title}
					</h1>
					<p className='text-nordic/70 mt-2 text-sm max-w-2xl'>
						{dictionary.properties_page.description}
					</p>
				</div>

				<Suspense
					key={suspenseKey}
					fallback={<PropertyGridSkeleton />}
				>
					<PropertiesGrid
						currentPage={currentPage}
						filters={filters}
						dictionary={dictionary}
						locale={locale}
					/>

				</Suspense>
			</main>
		</div>
	);
}
