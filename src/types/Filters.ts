import { FILTERS_DEFAULTS } from '@/lib/constants';

export type FiltersState = typeof FILTERS_DEFAULTS;

export type FiltersAction =
	| { type: 'SET_LOCATION'; payload: string }
	| { type: 'SET_MIN_PRICE'; payload: number }
	| { type: 'SET_MAX_PRICE'; payload: number }
	| { type: 'SET_PROPERTY_TYPE'; payload: string }
	| { type: 'SET_BEDS'; payload: number }
	| { type: 'SET_BATHS'; payload: number }
	| { type: 'TOGGLE_AMENITY'; payload: string }
	| { type: 'RESET' };
