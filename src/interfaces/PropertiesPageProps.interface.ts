export interface PropertiesPageProps {
	searchParams: Promise<{
		page?: string;
		query?: string;
		type?: string;
		minPrice?: string;
		maxPrice?: string;
		beds?: string;
		baths?: string;
		location?: string;
		saved?: string;
		listingType?: string;
		sort?: string;
		view?: string;
	}>;
}
