export interface HomeProps {
	searchParams: Promise<{
		page?: string;
		query?: string;
		type?: string;
		minPrice?: string;
		maxPrice?: string;
		beds?: string;
		baths?: string;
		location?: string;
	}>;
}
