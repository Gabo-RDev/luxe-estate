import { Suspense } from 'react';
import { TablePagination } from '@/components/ui/TablePagination';
import PropertyGrid from '@/features/properties/components/PropertyGrid';
import PropertyGridSkeleton from '@/features/properties/components/PropertyGridSkeleton';
import SearchHero from '@/features/properties/components/SearchHero';
import FavoritesControls from '@/features/properties/components/FavoritesControls';
import { getProperties } from '@/api/properties.api';
import { PAGE_SIZE } from '@/lib/constants';
import { PropertyFilters } from '@/interfaces/PropertyFilters.interface';
import { cookies } from 'next/headers';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { defaultLocale, locales } from '@/lib/i18n/config';
import { Locale, Dictionary } from '@/types/I18n';

import { PropertiesPageProps } from '@/interfaces/PropertiesPageProps.interface';

import { PropertiesGrid } from '@/features/properties/components/PropertiesGrid';

export default async function PropertiesPage({
	searchParams,
}: PropertiesPageProps) {
	const [params, cookieStore] = await Promise.all([searchParams, cookies()]);

	const parsedPage = parseInt(params.page ?? '', 10);
	const currentPage = Number.isFinite(parsedPage) ? Math.max(1, parsedPage) : 1;

	const localeCookie = cookieStore.get('NEXT_LOCALE')?.value as Locale;
	const locale = locales.includes(localeCookie) ? localeCookie : defaultLocale;
	const dictionary = await getDictionary(locale);

	let savedIds: string[] = [];
	if (params.saved === 'true') {
		try {
			const favCookie = cookieStore.get('favorites')?.value;
			if (favCookie) {
				savedIds = JSON.parse(decodeURIComponent(favCookie));
			}
		} catch (e) {
			console.error('Failed to parse favorites cookie', e);
		}
	}

	const filters: PropertyFilters = {
		query: params.query,
		propertyType: params.type?.toLowerCase(),
		minPrice: params.minPrice ? parseInt(params.minPrice, 10) : undefined,
		maxPrice: params.maxPrice ? parseInt(params.maxPrice, 10) : undefined,
		beds: params.beds ? parseInt(params.beds, 10) : undefined,
		baths: params.baths ? parseInt(params.baths, 10) : undefined,
		location: params.location,
		listingType: params.listingType,
		sort: params.sort,
		...(params.saved === 'true' && { savedIds }),
	};

	const suspenseKey = JSON.stringify({ currentPage, filters });

	const isFavoriteMode = params.saved === 'true';

	return (
		<div className='min-h-screen'>
			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{!isFavoriteMode && <SearchHero />}

				<Suspense
					key={suspenseKey}
					fallback={<PropertyGridSkeleton />}
				>
					<PropertiesGrid
						currentPage={currentPage}
						filters={filters}
						isFavoriteMode={isFavoriteMode}
						dictionary={dictionary}
						locale={locale}
						viewMode={params.view}
					/>
				</Suspense>
			</main>
		</div>
	);
}
