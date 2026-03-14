'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
}

export default function Pagination({
	currentPage,
	totalPages,
}: PaginationProps) {
	const searchParams = useSearchParams();

	if (totalPages <= 1) return null;

	const handlePageClick = () => {
		// Smooth-scroll to the section header after each page change
		const section = document.getElementById('new-in-market');
		if (section) {
			section.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	const buildPageUrl = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', String(page));
		return `?${params.toString()}`;
	};

	const hasPrev = currentPage > 1;
	const hasNext = currentPage < totalPages;

	// Build a compact window of page numbers
	const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
		.filter(
			(page) =>
				page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1,
		)
		.flatMap((page, idx, arr) =>
			idx > 0 && page - arr[idx - 1] > 1 ? (['…', page] as const) : [page],
		);

	return (
		<div className='mt-12 flex items-center justify-center gap-2'>
			{/* Previous */}
			{hasPrev ? (
				<Link
					href={buildPageUrl(currentPage - 1)}
					onClick={handlePageClick}
					scroll={false}
					className='flex items-center gap-1 px-4 py-2 text-sm font-medium text-nordic border border-nordic/10 rounded-lg hover:border-mosque hover:text-mosque transition-all'
				>
					<span className='material-icons text-sm'>arrow_back</span>
					Prev
				</Link>
			) : (
				<span className='flex items-center gap-1 px-4 py-2 text-sm font-medium text-nordic/30 border border-nordic/5 rounded-lg cursor-not-allowed select-none'>
					<span className='material-icons text-sm'>arrow_back</span>
					Prev
				</span>
			)}

			{/* Page numbers */}
			<div className='flex items-center gap-1'>
				{pageNumbers.map((p, idx) =>
					p === '…' ? (
						<span
							key={`ellipsis-${idx}`}
							className='px-2 text-nordic/40 select-none'
						>
							…
						</span>
					) : (
						<Link
							key={p}
							href={buildPageUrl(p as number)}
							onClick={handlePageClick}
							scroll={false}
							className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-lg transition-all ${
								p === currentPage
									? 'bg-nordic text-white shadow-sm'
									: 'text-nordic/70 border border-nordic/10 hover:border-mosque hover:text-mosque'
							}`}
						>
							{p}
						</Link>
					),
				)}
			</div>

			{/* Next */}
			{hasNext ? (
				<Link
					href={buildPageUrl(currentPage + 1)}
					onClick={handlePageClick}
					scroll={false}
					className='flex items-center gap-1 px-4 py-2 text-sm font-medium text-nordic border border-nordic/10 rounded-lg hover:border-mosque hover:text-mosque transition-all'
				>
					Next
					<span className='material-icons text-sm'>arrow_forward</span>
				</Link>
			) : (
				<span className='flex items-center gap-1 px-4 py-2 text-sm font-medium text-nordic/30 border border-nordic/5 rounded-lg cursor-not-allowed select-none'>
					Next
					<span className='material-icons text-sm'>arrow_forward</span>
				</span>
			)}
		</div>
	);
}
