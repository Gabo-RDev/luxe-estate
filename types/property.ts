export type PropertyType = "House" | "Apartment" | "Villa" | "Penthouse" | "Studio";
export type ListingType = "Buy" | "Rent" | "Sell";

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  pricePeriod?: "/mo"; // e.g. /mo for rent
  beds: number;
  baths: number;
  area: number; // in square meters
  imageUrl: string;
  badge?: "Exclusive" | "New Arrival" | string;
  listingType: ListingType;
  propertyType: PropertyType;
  featured?: boolean;
}
