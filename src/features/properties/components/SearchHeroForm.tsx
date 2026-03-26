'use client';

import dynamic from 'next/dynamic';
import { useSearchFilters } from '@/hooks/useSearchFilters';
import { SearchIcon } from '@/components/ui/icons/SearchIcon';
import { FilterIcon } from '@/components/ui/icons/FilterIcon';
import type { Dictionary } from '@/types/I18n';

// Dynamic import for FiltersModal (Rule: bundle-dynamic-imports)
const FiltersModal = dynamic(() => import('@/features/properties/components/FiltersModal'), {
	ssr: false,
});

interface SearchHeroFormProps {
	dictionary: Dictionary;
}

export function SearchHeroForm({ dictionary }: SearchHeroFormProps) {
	const {
		selectedCategory,
		searchQuery,
		setSearchQuery,
		handleCategoryClick,
		handleSearchSubmit,
		categories,
		isFiltersModalOpen,
		setIsFiltersModalOpen,
	} = useSearchFilters();

	return (
		<>
			<form
				onSubmit={handleSearchSubmit}
				className='relative group max-w-2xl mx-auto w-full'
			>
				<div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
					<SearchIcon
						size={24}
						className='text-nordic/60 group-focus-within:text-mosque transition-colors'
					/>
				</div>
				<input
					type='text'
					placeholder={dictionary.search_hero.placeholder}
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className='block w-full pl-12 pr-32 md:pr-36 py-4 rounded-xl border-none bg-white text-nordic shadow-sm placeholder-nordic/60 focus:ring-2 focus:ring-mosque focus:bg-white transition-all text-lg'
				/>
				<button
					type='submit'
					className='absolute inset-y-2 right-2 px-6 bg-mosque hover:bg-mosque/90 text-white font-medium rounded-lg transition-colors flex items-center justify-center shadow-lg shadow-mosque/20 cursor-pointer'
				>
					{dictionary.search_hero.search}
				</button>
			</form>

			<div className='flex items-center justify-start md:justify-center gap-3 overflow-x-auto hide-scroll py-2'>
				{categories.map((cat: string) => (
					<button
						key={cat}
						onClick={() => handleCategoryClick(cat)}
						className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer capitalize ${
							selectedCategory === cat
								? 'bg-nordic text-white shadow-lg'
								: 'bg-white border border-nordic/10 text-nordic/70 hover:text-nordic hover:border-mosque/50'
						}`}
					>
						{dictionary.categories[cat as keyof typeof dictionary.categories]}
					</button>
				))}
				<div className='w-px h-6 bg-nordic/10 mx-2'></div>
				<button
					onClick={() => setIsFiltersModalOpen(true)}
					className='whitespace-nowrap flex items-center gap-1 px-4 py-2 rounded-full text-nordic font-medium text-sm hover:bg-white/50 transition-colors cursor-pointer'
				>
					<FilterIcon size={16} /> {dictionary.search_hero.filters}
				</button>
			</div>

			<FiltersModal
				isOpen={isFiltersModalOpen}
				onClose={() => setIsFiltersModalOpen(false)}
			/>
		</>
	);
}
