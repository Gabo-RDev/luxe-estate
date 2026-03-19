import { FILTERS_DEFAULTS } from '@/lib/constants';
import { FiltersState, FiltersAction } from '@/types/Filters';

export function filtersReducer(
	state: FiltersState,
	action: FiltersAction,
): FiltersState {
	switch (action.type) {
		case 'SET_LOCATION':
			return { ...state, location: action.payload };
		case 'SET_MIN_PRICE':
			return { ...state, minPrice: action.payload };
		case 'SET_MAX_PRICE':
			return { ...state, maxPrice: action.payload };
		case 'SET_PROPERTY_TYPE':
			return { ...state, propertyType: action.payload };
		case 'SET_BEDS':
			return { ...state, beds: action.payload };
		case 'SET_BATHS':
			return { ...state, baths: action.payload };
		case 'TOGGLE_AMENITY':
			return {
				...state,
				amenities: state.amenities.includes(action.payload)
					? state.amenities.filter((a: string) => a !== action.payload)
					: [...state.amenities, action.payload],
			};
		case 'RESET':
			return FILTERS_DEFAULTS;
		default:
			return state;
	}
}
