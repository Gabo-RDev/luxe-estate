import { createClient } from '@/lib/supabase/server';
import { Property } from '@/types/Property';

// Number of non-featured properties shown per page
export const PAGE_SIZE = 6;

// Upper bound for pageSize to prevent oversized range queries
export const MAX_PAGE_SIZE = 100;

// Map snake_case DB row → camelCase Property interface
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToProperty(row: any): Property {
	// property_images rows come back as [{ url, order }, ...], sorted by our query
	const images: string[] =
		Array.isArray(row.property_images) && row.property_images.length > 0
			? (row.property_images as { url: string; order: number }[])
					.sort((a, b) => a.order - b.order)
					.map((img) => img.url)
			: [row.image_url];

	return {
		id: row.id || row.slug,
		title: row.title,
		slug: row.slug,
		location: row.location,
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
	};
}

/** Fetch all featured properties (no pagination needed — small set). */
export async function getFeaturedProperties(): Promise<Property[]> {
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
}

export interface PaginatedProperties {
	data: Property[];
	totalCount: number;
	totalPages: number;
	currentPage: number;
}

/** Fetch non-featured properties with server-side pagination. */
export async function getProperties(
	page: number = 1,
	pageSize: number = PAGE_SIZE,
): Promise<PaginatedProperties> {
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

	const { data, error, count } = await supabase
		.from('properties')
		.select('*, property_images(url, order)', { count: 'exact' })
		.eq('is_featured', false)
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
}

/** Fetch a single property by its slug. */
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
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
}
