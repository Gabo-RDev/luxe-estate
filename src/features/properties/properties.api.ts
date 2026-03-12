import { createClient } from '@/lib/supabase/server';
import { Property } from '@/types/Property';

// Number of non-featured properties shown per page
export const PAGE_SIZE = 6;

// Map snake_case DB row → camelCase Property interface
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToProperty(row: any): Property {
	return {
		id: row.id || row.slug, // fallback if id is not present
		title: row.title,
		slug: row.slug,
		location: row.location,
		price: Number(row.price),
		pricePeriod: row.price_period ?? undefined,
		beds: Number(row.beds),
		baths: Number(row.baths),
		area: Number(row.area),
		imageUrl: row.image_url,
		images: row.images || [row.image_url],
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
		.select('*')
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

	const from = (page - 1) * pageSize;
	const to = from + pageSize - 1;

	const { data, error, count } = await supabase
		.from('properties')
		.select('*', { count: 'exact' })
		.eq('is_featured', false)
		.order('created_at', { ascending: true })
		.range(from, to);

	if (error) {
		console.error('[getProperties]', error.message);
		return { data: [], totalCount: 0, totalPages: 0, currentPage: page };
	}

	const totalCount = count ?? 0;
	const totalPages = Math.ceil(totalCount / pageSize);

	return {
		data: (data ?? []).map(rowToProperty),
		totalCount,
		totalPages,
		currentPage: page,
	};
}

/** Fetch a single property by its slug. */
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from('properties')
		.select('*')
		.eq('slug', slug)
		.single();

	if (error) {
		console.error('[getPropertyBySlug]', error.message);
		return null;
	}

	return data ? rowToProperty(data) : null;
}
