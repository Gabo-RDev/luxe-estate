import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';
import { Property } from '@/interfaces/Property.interface';
import { PaginatedProperties } from '@/interfaces/PaginatedProperties.interface';
import { PropertyFilters } from '@/interfaces/PropertyFilters.interface';
import { PAGE_SIZE, MAX_PAGE_SIZE } from '@/lib/constants';
import type { Tables } from '@/types/database.types';

/** Shape returned by Supabase when property_images are joined via select('*, property_images(url, order)') */
type PropertyRow = Tables<'properties'> & {
	property_images: Pick<Tables<'property_images'>, 'url' | 'order'>[];
};

// Map snake_case DB row → camelCase Property interface
function rowToProperty(row: PropertyRow): Property {
	// property_images rows come back as [{ url, order }, ...], sorted by our query
	const images: string[] =
		row.property_images.length > 0
			? row.property_images
					.toSorted((a, b) => a.order - b.order)
					.map((img) => img.url)
			: [row.image_url];

	return {
		id: row.id || row.slug,
		title: row.title,
		title_es: row.title_es ?? undefined,
		title_fr: row.title_fr ?? undefined,
		slug: row.slug,
		location: row.location,
		location_es: row.location_es ?? undefined,
		location_fr: row.location_fr ?? undefined,
		price: Number(row.price),
		pricePeriod: row.price_period ?? undefined,
		beds: Number(row.beds),
		baths: Number(row.baths),
		area: Number(row.area),
		imageUrl: row.image_url,
		images,
		badge: row.badge ?? undefined,
		listingType: row.listing_type,
		propertyType: row.property_type,
		isFeatured: row.is_featured,
		lat: row.lat ?? undefined,
		lng: row.lng ?? undefined,
		description: row.description ?? undefined,
		yearBuilt: row.year_built ?? undefined,
		parkingSpaces: row.parking_spaces ?? undefined,
		amenities: row.amenities ?? undefined,
	};
}

/** Fetch all featured properties (no pagination needed — small set). */
export const getFeaturedProperties = cache(async (): Promise<Property[]> => {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from('properties')
		.select('*, property_images(url, order)')
		.eq('is_featured', true)
		.order('created_at', { ascending: true });

	if (error) {
		console.error('[getFeaturedProperties]', error.message);
		return [];
	}

	return (data ?? []).map(rowToProperty);
});

/** Fetch non-featured properties with server-side pagination. */
export const getProperties = cache(async (
	page: number = 1,
	pageSize: number = PAGE_SIZE,
	filters?: PropertyFilters,
): Promise<PaginatedProperties> => {
	const supabase = await createClient();

	// Normalize inputs: guard against <= 0, NaN, or non-finite values; cap at MAX_PAGE_SIZE
	const safePage = Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;
	const safePageSize = Math.min(
		Number.isFinite(pageSize) && pageSize >= 1
			? Math.floor(pageSize)
			: PAGE_SIZE,
		MAX_PAGE_SIZE,
	);

	const from = (safePage - 1) * safePageSize;
	const to = from + safePageSize - 1;

	let query = supabase
		.from('properties')
		.select('*, property_images(url, order)', { count: 'exact' })
		.eq('is_featured', false);

	if (filters) {
		const { query: q, location: loc, propertyType: type, minPrice, maxPrice, beds, baths } = filters;

		if (q) query = query.or(`title.ilike.%${q}%,location.ilike.%${q}%`);
		if (loc) query = query.ilike('location', `%${loc}%`);
		
		if (type && !['all', 'any type'].includes(type.toLowerCase())) {
			query = query.eq('property_type', type);
		}

		if (minPrice !== undefined) query = query.gte('price', minPrice);
		if (maxPrice !== undefined) query = query.lte('price', maxPrice);
		if (beds && beds > 0) query = query.gte('beds', beds);
		if (baths && baths > 0) query = query.gte('baths', baths);
	}

	const { data, error, count } = await query
		.order('created_at', { ascending: true })
		.range(from, to);

	if (error) {
		console.error('[getProperties]', error.message);
		return { data: [], totalCount: 0, totalPages: 0, currentPage: safePage };
	}

	const totalCount = count ?? 0;
	const totalPages = Math.ceil(totalCount / safePageSize);

	return {
		data: (data ?? []).map(rowToProperty),
		totalCount,
		totalPages,
		currentPage: safePage,
	};
});

/** Fetch a single property by its slug. */
export const getPropertyBySlug = cache(async (slug: string): Promise<Property | null> => {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from('properties')
		.select('*, property_images(url, order)')
		.eq('slug', slug)
		.maybeSingle();

	if (error) {
		console.error(`[getPropertyBySlug] Error fetching property for slug "${slug}":`, error.message);
		return null;
	}

	return data ? rowToProperty(data) : null;
});

/** Fetch a single property by its ID. */
export const getPropertyById = cache(async (id: string): Promise<Property | null> => {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from('properties')
		.select('*, property_images(url, order)')
		.eq('id', id)
		.maybeSingle();

	if (error) {
		console.error(`[getPropertyById] Error fetching property for id "${id}":`, error.message);
		return null;
	}

	return data ? rowToProperty(data) : null;
});

/** Fetch all properties for admin management (ordered by creation date). */
export const getAdminProperties = cache(async (
	page: number = 1,
	pageSize: number = PAGE_SIZE,
): Promise<PaginatedProperties> => {
	const supabase = await createClient();

	const safePage = Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;
	const safePageSize = Math.min(
		Number.isFinite(pageSize) && pageSize >= 1
			? Math.floor(pageSize)
			: PAGE_SIZE,
		MAX_PAGE_SIZE,
	);

	const from = (safePage - 1) * safePageSize;
	const to = from + safePageSize - 1;

	const { data, error, count } = await supabase
		.from('properties')
		.select('*, property_images(url, order)', { count: 'exact' })
		.order('created_at', { ascending: false })
		.range(from, to);

	if (error) {
		console.error('[getAdminProperties]', error.message);
		return { data: [], totalCount: 0, totalPages: 0, currentPage: safePage };
	}

	const totalCount = count ?? 0;
	const totalPages = Math.ceil(totalCount / safePageSize);

	return {
		data: (data ?? []).map(rowToProperty),
		totalCount,
		totalPages,
		currentPage: safePage,
	};
});
