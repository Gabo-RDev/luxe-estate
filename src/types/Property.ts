export interface Property {
	id: string;
	title: string;
	slug: string;
	location: string;
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
