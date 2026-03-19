/**
 * Builds a compact window of page numbers with ellipsis gaps.
 * Pure function — no React dependencies, fully testable.
 *
 * Example: currentPage=5, totalPages=10 → [1, '…', 4, 5, 6, '…', 10]
 */
export function buildPageNumbers(
	currentPage: number,
	totalPages: number,
): (number | '…')[] {
	return Array.from({ length: totalPages }, (_, i) => i + 1)
		.filter(
			(page) =>
				page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1,
		)
		.flatMap((page, idx, arr) =>
			idx > 0 && page - arr[idx - 1] > 1 ? (['…', page] as const) : [page],
		);
}
