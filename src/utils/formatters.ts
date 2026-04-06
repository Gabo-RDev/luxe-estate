/** Formats a numeric price into a short human-friendly string (e.g., $1.5M, $600K) using Intl API */
export const formatPrice = (val: number): string => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		notation: 'compact',
		maximumFractionDigits: val >= 1_000_000 ? 1 : 0,
	}).format(val);
};

/** Formats a numeric price into a standard currency string (e.g., $1,500,000) */
export const formatCurrency = (val: number, currency: string = 'USD'): string => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currency,
		maximumFractionDigits: 0,
	}).format(val);
};
