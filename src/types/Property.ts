export interface Property {
	id: string;
	title: string;
	title_es?: string;
	title_fr?: string;
	slug: string;
	location: string;
	location_es?: string;
	location_fr?: string;
	price: number;
	pricePeriod?: string;
	beds: number;
	baths: number;
	area: number;
	imageUrl: string;
	images: string[];
	badge?: string;
	listingType: string;
	propertyType: string;
	isFeatured: boolean;
	lat?: number;
	lng?: number;
}
