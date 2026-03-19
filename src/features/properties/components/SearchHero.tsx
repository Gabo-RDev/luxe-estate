'use client';

import { useState } from 'react';
import FiltersModal from '@/features/properties/components/FiltersModal';
import { useSearchFilters } from '@/hooks/useSearchFilters';
import { useI18n } from '@/lib/i18n/i18n-context';

export default function SearchHero() {
	const { dictionary } = useI18n();
	const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
	const {
		selectedCategory,
		searchQuery,
		setSearchQuery,
		handleCategoryClick,
		handleSearchSubmit,
		categories,
	} = useSearchFilters();

	return (
		<section className='py-8 md:py-16'>
			<div className='text-center space-y-6 md:space-y-8'>
				<h1 className='text-4xl md:text-5xl lg:text-6xl font-light text-nordic leading-tight'>
					{dictionary.search_hero.find_your}
					<span className='relative inline-block'>
						<span className='relative z-10 font-medium'>{dictionary.search_hero.sanctuary}</span>
						<span className='absolute bottom-2 left-0 w-full h-3 bg-mosque/20 -rotate-1 z-0'></span>
					</span>
					.
				</h1>

				<form onSubmit={handleSearchSubmit} className='relative group max-w-2xl mx-auto w-full'>
					<div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
						<span className='material-icons text-nordic/60 text-2xl group-focus-within:text-mosque transition-colors'>
							search
						</span>
					</div>
					<input
						suppressHydrationWarning
						type='text'
						placeholder={dictionary.search_hero.placeholder}
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className='block w-full pl-12 pr-32 md:pr-36 py-4 rounded-xl border-none bg-white text-nordic shadow-sm placeholder-nordic/60 focus:ring-2 focus:ring-mosque focus:bg-white transition-all text-lg'
					/>
					<button type='submit' className='absolute inset-y-2 right-2 px-6 bg-mosque hover:bg-mosque/90 text-white font-medium rounded-lg transition-colors flex items-center justify-center shadow-lg shadow-mosque/20'>
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
						<span className='material-icons text-base'>tune</span> {dictionary.search_hero.filters}
					</button>
				</div>
			</div>

			<FiltersModal
				isOpen={isFiltersModalOpen}
				onClose={() => setIsFiltersModalOpen(false)}
			/>
		</section>
	);
}
