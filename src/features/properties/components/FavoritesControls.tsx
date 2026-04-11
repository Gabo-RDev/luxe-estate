'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { Dictionary } from '@/types/I18n';

export default function FavoritesControls({ dictionary }: { dictionary: Dictionary }) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const currentView = searchParams.get('view') || 'grid';
	const currentSort = searchParams.get('sort') || 'date_desc';

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);
			return params.toString();
		},
		[searchParams],
	);

	const setView = (view: string) => {
		router.push(`?${createQueryString('view', view)}`, { scroll: false });
	};

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		router.push(`?${createQueryString('sort', e.target.value)}`, { scroll: false });
	};

	return (
		<>
			<div className="relative group">
				<select
					className="flex items-center space-x-2 bg-white px-4 py-2.5 rounded-lg text-sm font-medium text-nordic shadow-sm hover:shadow-md transition-all border border-transparent hover:border-mosque/30 appearance-none pr-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-mosque/20"
					onChange={handleSortChange}
					value={currentSort}
				>
					<option value="date_desc">{dictionary.favorites_page?.sort_by_date || "Sort by: Date Added"}</option>
					<option value="price_asc">Price: Low to High</option>
					<option value="price_desc">Price: High to Low</option>
				</select>
				<span className="material-icons text-lg absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-nordic/60">
					text_sort
				</span>
			</div>
			<div className="flex bg-white rounded-lg p-1 shadow-sm border border-nordic/5">
				<button
					onClick={() => setView('grid')}
					className={`p-1.5 rounded transition-colors flex items-center justify-center ${currentView === 'grid' ? 'text-mosque bg-hintgreen' : 'text-nordic/40 hover:text-nordic/70'}`}
					aria-label="Grid View"
				>
					<span className="material-icons text-xl">grid_view</span>
				</button>
				<button
					onClick={() => setView('list')}
					className={`p-1.5 rounded transition-colors flex items-center justify-center ${currentView === 'list' ? 'text-mosque bg-hintgreen' : 'text-nordic/40 hover:text-nordic/70'}`}
					aria-label="List View"
				>
					<span className="material-icons text-xl">view_list</span>
				</button>
			</div>
		</>
	);
}
