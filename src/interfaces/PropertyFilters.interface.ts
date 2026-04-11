export interface PropertyFilters {
	query?: string;
	propertyType?: string;
	minPrice?: number;
	maxPrice?: number;
	beds?: number;
	baths?: number;
	location?: string;
	listingType?: string;
	savedIds?: string[];
	sort?: string;
}
