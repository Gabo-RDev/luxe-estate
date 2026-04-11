import { Suspense } from 'react';
import { TablePagination } from '@/components/ui/TablePagination';
import PropertyGrid from '@/features/properties/components/PropertyGrid';
import FavoritesControls from '@/features/properties/components/FavoritesControls';
import { getProperties } from '@/api/properties.api';
import { PAGE_SIZE } from '@/lib/constants';
import { PropertyFilters } from '@/interfaces/PropertyFilters.interface';
import { Locale, Dictionary } from '@/types/I18n';

export async function PropertiesGrid({
	currentPage,
	filters,
	isFavoriteMode,
	dictionary,
	locale,
	viewMode,
}: {
	currentPage: number;
	filters: PropertyFilters;
	isFavoriteMode: boolean;
	dictionary: Dictionary;
	locale: Locale;
	viewMode?: string;
}) {
	const {
		data: properties,
		totalPages,
		totalCount,
	} = await getProperties(currentPage, PAGE_SIZE, filters);

	return (
		<>
			{isFavoriteMode ? (
				<div className='flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 mt-8'>
					<div>
						<h1 className='text-3xl md:text-4xl font-bold text-nordic tracking-tight mb-2'>
							{dictionary.favorites_page?.title || 'Your Favorites'}
						</h1>
						<p className='text-nordic/70'>
							{dictionary.favorites_page?.description?.replace(
								'{count}',
								totalCount.toString(),
							) || `You have ${totalCount} saved properties waiting for you.`}
						</p>
					</div>
					<div className='flex items-center space-x-3'>
						<FavoritesControls dictionary={dictionary} />
					</div>
				</div>
			) : (
				<div className='mb-8'>
					<h1 className='text-3xl font-light text-nordic'>
						{dictionary.properties_page.title}
					</h1>
					<p className='text-nordic/70 mt-2 text-sm max-w-2xl'>
						{dictionary.properties_page.description}
					</p>
				</div>
			)}
			<PropertyGrid
				properties={properties}
				currentPage={currentPage}
				isFavoriteMode={isFavoriteMode}
				dictionary={dictionary}
				locale={locale}
				viewMode={viewMode}
			/>

			<Suspense fallback={null}>
				<TablePagination
					currentPage={currentPage}
					totalPages={totalPages}
					totalResults={totalCount}
					pageSize={PAGE_SIZE}
					className='mt-12 px-6 py-4 border border-nordic/5 rounded-xl shadow-sm flex items-center justify-between bg-white'
				/>
			</Suspense>
		</>
	);
}
