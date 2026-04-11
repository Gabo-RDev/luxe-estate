'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { useI18n } from '@/lib/i18n/i18n-context';

export default function ListingTypeFilter() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { dictionary } = useI18n();

	const currentType = searchParams.get('listingType') || 'all';

	const handleFilter = useCallback(
		(type: string) => {
			const params = new URLSearchParams(searchParams.toString());
			if (type === 'all') {
				params.delete('listingType');
			} else {
				params.set('listingType', type);
			}
			// Reset to page 1 when changing filter
			params.delete('page');
			const qs = params.toString();
			router.push(qs ? `?${qs}` : '/', { scroll: false });
		},
		[searchParams, router],
	);

	const buttons = [
		{ key: 'all', label: dictionary.home.all },
		{ key: 'Sale', label: dictionary.home.buy },
		{ key: 'Rent', label: dictionary.home.rent },
	];

	return (
		<div className='hidden md:flex bg-white p-1 rounded-lg shadow-sm border border-nordic/5'>
			{buttons.map((btn) => (
				<button
					key={btn.key}
					onClick={() => handleFilter(btn.key)}
					className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
						currentType === btn.key
							? 'bg-nordic text-white'
							: 'text-nordic/70 hover:text-nordic'
					}`}
				>
					{btn.label}
				</button>
			))}
		</div>
	);
}
