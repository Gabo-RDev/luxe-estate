'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export const CATEGORIES = [
	'all',
	'house',
	'apartment',
	'villa',
	'penthouse',
] as const;

export function useSearchFilters() {
	const router = useRouter();
	const searchParams = useSearchParams();

	// 1. DERIVED STATE: No useState/useEffect needed (Rule 1 & 3)
	const urlCategory = searchParams.get('type');
	const selectedCategory =
		urlCategory
			? CATEGORIES.find((c) => c === urlCategory.toLowerCase()) || 'all'
			: 'all';

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

		category === 'all' || category === 'any type'
			? params.delete('type')
			: params.set('type', category);

		params.delete('page');
		router.push(`/properties?${params.toString()}`, { scroll: false });
	};

	const handleSearchSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		const params = new URLSearchParams(searchParams.toString());

		searchQuery.trim()
			? params.set('query', searchQuery.trim())
			: params.delete('query');

		params.delete('page');
		router.push(`/properties?${params.toString()}`, { scroll: false });
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
