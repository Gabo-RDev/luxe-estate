'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export const CATEGORIES = [
	'All',
	'House',
	'Apartment',
	'Villa',
	'Penthouse',
] as const;

export function useSearchFilters() {
	const router = useRouter();
	const searchParams = useSearchParams();

	// 1. DERIVED STATE: No useState/useEffect needed (Rule 1 & 3)
	const urlCategory = searchParams.get('propertyType');
	const selectedCategory =
		urlCategory && (CATEGORIES as readonly string[]).includes(urlCategory)
			? urlCategory
			: 'All';

	// 2. LOCAL DRAFT STATE: For typing (Rule 2: User interaction)
	const [searchQuery, setSearchQuery] = useState(
		() => searchParams.get('query') || '',
	);

	// 3. RENDER-TIME SYNC: Sync local state with URL without useEffect (Rule 1 & 4)
	const currentUrlQuery = searchParams.get('query') || '';
	const [prevUrlQuery, setPrevUrlQuery] = useState(currentUrlQuery);

	if (currentUrlQuery !== prevUrlQuery) {
		setPrevUrlQuery(currentUrlQuery);
		setSearchQuery(currentUrlQuery);
	}

	const handleCategoryClick = (category: string) => {
		const params = new URLSearchParams(searchParams.toString());

		category === 'All' || category === 'Any Type'
			? params.delete('propertyType')
			: params.set('propertyType', category);

		params.delete('page');
		router.push(`/?${params.toString()}`, { scroll: false });
	};

	const handleSearchSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		const params = new URLSearchParams(searchParams.toString());

		searchQuery.trim()
			? params.set('query', searchQuery.trim())
			: params.delete('query');

		params.delete('page');
		router.push(`/?${params.toString()}`, { scroll: false });
	};

	return {
		selectedCategory,
		searchQuery,
		setSearchQuery,
		handleCategoryClick,
		handleSearchSubmit,
		categories: CATEGORIES,
	};
}
