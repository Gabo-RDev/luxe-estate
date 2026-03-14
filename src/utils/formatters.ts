/** Formats a numeric price into a short human-friendly string (e.g., $1.5M, $600K) using Intl API */
export const formatPrice = (val: number): string => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		notation: 'compact',
		maximumFractionDigits: val >= 1_000_000 ? 1 : 0,
	}).format(val);
};
