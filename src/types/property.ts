export type PropertyType = 'House' | 'Apartment' | 'Villa' | 'Penthouse';
export type ListingType = 'Buy' | 'Rent' | 'Sell';

export interface Property {
	id: string;
	title: string;
	slug: string;
	location: string;
	price: number;
	pricePeriod?: '/mo'; // e.g. /mo for rent
	beds: number;
	baths: number;
	area: number; // in square meters
	imageUrl: string;
	images: string[];
	badge?: 'Exclusive' | 'New Arrival' | string;
	listingType: ListingType;
	propertyType: PropertyType;
	isFeatured?: boolean;
	lat?: number;
	lng?: number;
}
