import { getProperties } from '@/api/properties.api';
import { PAGE_SIZE } from '@/lib/constants';
import { defaultLocale, locales } from '@/lib/i18n/config';
import PropertyGrid from '@/features/properties/components/PropertyGrid';
import Pagination from '@/components/ui/Pagination';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { Locale } from '@/types/I18n';

import { PropertyGridSectionProps } from '@/interfaces/PropertyGridSectionProps.interface';

// Skeleton that matches the 3-column grid for a smooth loading state
function PropertyGridSkeleton() {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
			{Array.from({ length: 9 }).map((_, i) => (
				<div
					key={i}
					className='bg-white rounded-2xl overflow-hidden shadow-sm border border-nordic/5 animate-pulse'
				>
					<div className='aspect-4/3 bg-slate-200' />
					<div className='p-4 space-y-3'>
						<div className='h-4 bg-slate-200 rounded w-3/4' />
						<div className='h-3 bg-slate-100 rounded w-1/2' />
						<div className='h-3 bg-slate-100 rounded w-2/3' />
					</div>
				</div>
			))}
		</div>
	);
}

async function GridWithData({
	currentPage,
	dictionary,
	locale,
}: {
	currentPage: number;
	dictionary: any;
	locale: Locale;
}) {
	const { data: properties, totalPages } = await getProperties(
		currentPage,
		PAGE_SIZE,
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
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
				/>
			</Suspense>
		</>
	);
}

export default async function PropertyGridSection({
	currentPage,
}: PropertyGridSectionProps) {
	const cookieStore = await cookies();
	const localeCookie = cookieStore.get('NEXT_LOCALE')?.value as Locale;
	const locale = locales.includes(localeCookie) ? localeCookie : defaultLocale;
	const dictionary = await getDictionary(locale);

	return (
		<Suspense fallback={<PropertyGridSkeleton />}>
			<GridWithData
				currentPage={currentPage}
				dictionary={dictionary}
				locale={locale}
			/>
		</Suspense>
	);
}
