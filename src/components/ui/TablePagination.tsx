'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useI18n } from '@/lib/i18n/i18n-context';
import { animate } from 'framer-motion';

interface TablePaginationProps {
	currentPage: number;
	totalPages: number;
	totalResults: number;
	pageSize: number;
	scrollTargetId?: string;
	className?: string;
}

export function TablePagination({ 
	currentPage, 
	totalPages, 
	totalResults,
	pageSize,
	scrollTargetId,
	className = "px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50"
}: TablePaginationProps) {
	const searchParams = useSearchParams();
	const { dictionary } = useI18n();

	if (totalPages <= 1) return null;

	const handlePageClick = () => {
		const targetId = scrollTargetId ? document.getElementById(scrollTargetId) : null;
		let yOffset = 0;
		if (targetId) {
			yOffset = targetId.getBoundingClientRect().top + window.scrollY - 80;
		}
		animate(window.scrollY, Math.max(0, yOffset), {
			duration: 0.8,
			ease: [0.16, 1, 0.3, 1],
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
	
	const startResult = (currentPage - 1) * pageSize + 1;
	// Calculate end result carefully in case last page doesn't have a full pageSize
	const endResult = Math.min(currentPage * pageSize, totalResults);

	return (
		<div className={className}>
			<div className="text-sm text-gray-500 hidden md:block">
				Showing <span className="font-medium text-nordic">{startResult}</span> to <span className="font-medium text-nordic">{endResult}</span> of <span className="font-medium text-nordic">{totalResults}</span> results
			</div>
			<div className="flex gap-2 w-full md:w-auto justify-between md:justify-end">
				{hasPrev ? (
					<Link
						href={buildPageUrl(currentPage - 1)}
						onClick={handlePageClick}
						scroll={false}
						className="px-3 py-1.5 text-sm border border-gray-200 rounded-md text-gray-600 hover:bg-white transition-colors flex items-center"
					>
						{dictionary?.common?.prev || 'Previous'}
					</Link>
				) : (
					<button disabled className="px-3 py-1.5 text-sm border border-gray-200 rounded-md text-gray-400 opacity-50 cursor-not-allowed">
						{dictionary?.common?.prev || 'Previous'}
					</button>
				)}

				{hasNext ? (
					<Link
						href={buildPageUrl(currentPage + 1)}
						onClick={handlePageClick}
						scroll={false}
						className="px-3 py-1.5 text-sm border border-gray-200 rounded-md text-gray-600 hover:bg-white transition-colors flex items-center"
					>
						{dictionary?.common?.next || 'Next'}
					</Link>
				) : (
					<button disabled className="px-3 py-1.5 text-sm border border-gray-200 rounded-md text-gray-400 opacity-50 cursor-not-allowed">
						{dictionary?.common?.next || 'Next'}
					</button>
				)}
			</div>
		</div>
	);
}
