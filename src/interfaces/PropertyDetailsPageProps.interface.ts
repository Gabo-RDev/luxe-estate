export interface PropertyDetailsPageProps {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{
		page?: string;
		query?: string;
		type?: string;
		minPrice?: string;
		maxPrice?: string;
		beds?: string;
		baths?: string;
	}>;
}
