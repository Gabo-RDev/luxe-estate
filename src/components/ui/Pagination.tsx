'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useI18n } from '@/lib/i18n/i18n-context';
import { buildPageNumbers } from '@/utils/pagination';
import { PaginationProps } from '@/interfaces/PaginationProps.interface';
import { animate } from 'framer-motion';

export default function Pagination({
	currentPage,
	totalPages,
}: PaginationProps) {
	const searchParams = useSearchParams();
	const { dictionary } = useI18n();

	if (totalPages <= 1) return null;

	const handlePageClick = () => {
		// Use Framer Motion for an ultra-smooth, custom-eased scroll
		const targetId = document.getElementById('admin-list-top') || document.getElementById('new-in-market');
		
		let yOffset = 0;
		if (targetId) {
			// Offset slightly so the header isn't flush with the top of viewport (e.g. 80px)
			yOffset = targetId.getBoundingClientRect().top + window.scrollY - 80;
		}

		animate(window.scrollY, Math.max(0, yOffset), {
			duration: 0.8,
			ease: [0.16, 1, 0.3, 1], // Custom sleek easing curve (like a smooth spring)
			onUpdate: (latest) => window.scrollTo(0, latest),
		});
	};

	const buildPageUrl = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', String(page));
		return `?${params.toString()}`;
	};

	const hasPrev = currentPage > 1;
	const hasNext = currentPage < totalPages;

	// Build a compact window of page numbers
	const pageNumbers = buildPageNumbers(currentPage, totalPages);

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
					{dictionary.common.prev}
				</Link>
			) : (
				<span className='flex items-center gap-1 px-4 py-2 text-sm font-medium text-nordic/30 border border-nordic/5 rounded-lg cursor-not-allowed select-none'>
					<span className='material-icons text-sm'>arrow_back</span>
					{dictionary.common.prev}
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
					{dictionary.common.next}
					<span className='material-icons text-sm'>arrow_forward</span>
				</Link>
			) : (
				<span className='flex items-center gap-1 px-4 py-2 text-sm font-medium text-nordic/30 border border-nordic/5 rounded-lg cursor-not-allowed select-none'>
					{dictionary.common.next}
					<span className='material-icons text-sm'>arrow_forward</span>
				</span>
			)}
		</div>
	);
}
