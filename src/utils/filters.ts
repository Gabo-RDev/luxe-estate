import { PRICE_BOUNDS } from '@/features/properties/filtersConfig';
import { FiltersState } from '@/reducers/filtersReducer';

/**
 * Maps current state to a clean object for URLSearchParams.
 * Values that match defaults are returned as null to be removed from URL.
 */
export const mapFiltersToParams = (state: FiltersState) => {
	const { location, minPrice, maxPrice, propertyType, beds, baths } = state;

	return {
		location: location || null,
		minPrice: minPrice > PRICE_BOUNDS.MIN ? minPrice.toString() : null,
		maxPrice: maxPrice < PRICE_BOUNDS.MAX ? maxPrice.toString() : null,
		propertyType: propertyType && propertyType !== 'Any Type' ? propertyType : null,
		beds: beds > 0 ? beds.toString() : null,
		baths: baths > 0 ? baths.toString() : null,
	};
};

/**
 * Hydrates the initial state from URL search parameters.
 */
export const getInitialFilters = (
	searchParams: URLSearchParams,
	defaults: FiltersState,
): FiltersState => {
	const propertyType = searchParams.get('propertyType');
	const minPrice = searchParams.get('minPrice');
	const maxPrice = searchParams.get('maxPrice');
	const beds = searchParams.get('beds');
	const baths = searchParams.get('baths');
	const location = searchParams.get('location');

	return {
		...defaults,
		location: location || defaults.location,
		minPrice: minPrice ? parseInt(minPrice, 10) : defaults.minPrice,
		maxPrice: maxPrice ? parseInt(maxPrice, 10) : defaults.maxPrice,
		propertyType: propertyType || defaults.propertyType,
		beds: beds ? parseInt(beds, 10) : defaults.beds,
		baths: baths ? parseInt(baths, 10) : defaults.baths,
	};
};
