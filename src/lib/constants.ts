// ─── Pagination ────────────────────────────────────────────────────────────
export const PAGE_SIZE = 6;
export const MAX_PAGE_SIZE = 100;

// ─── Property Categories ────────────────────────────────────────────────────
export const CATEGORIES = [
	'all',
	'house',
	'apartment',
	'villa',
	'penthouse',
	'condo',
	'townhouse',
] as const;

// ─── Price Slider ───────────────────────────────────────────────────────────
const ONE_HUNDRED_THOUSAND = 100_000;
const HALF_MILLION         = 500_000;
const THIRTY_MILLION       = 30_000_000;

export const PRICE_BOUNDS = {
	MIN:  ONE_HUNDRED_THOUSAND,
	MAX:  THIRTY_MILLION,
	STEP: ONE_HUNDRED_THOUSAND,
	/** Minimum gap enforced between min and max price handles */
	GAP:  HALF_MILLION,
} as const;

// ─── Filter Defaults ────────────────────────────────────────────────────────
export const FILTERS_DEFAULTS = {
	location:     'San Francisco',
	minPrice:     1_200_000,
	maxPrice:     4_500_000,
	propertyType: 'all',
	beds:         2,
	baths:        1,
	amenities:    [] as string[],
};

// ─── Amenities ──────────────────────────────────────────────────────────────
export const AMENITIES_LIST = [
	{ id: 'pool',     label: 'Pool',     icon: 'pool' },
	{ id: 'wifi',     label: 'Wi-Fi',    icon: 'wifi' },
	{ id: 'gym',      label: 'Gym',      icon: 'fitness_center' },
	{ id: 'parking',  label: 'Parking',  icon: 'local_parking' },
	{ id: 'security', label: 'Security', icon: 'security' },
	{ id: 'garden',   label: 'Garden',   icon: 'yard' },
] as const;

// ─── Filter URL Keys ────────────────────────────────────────────────────────
export const FILTER_KEYS = [
	'location',
	'minPrice',
	'maxPrice',
	'propertyType',
	'beds',
	'baths',
	'page',
] as const;


// ─── Authentication ─────────────────────────────────────────────────────────
/** Default Supabase session duration (1 hour) */
export const SESSION_DURATION_SECONDS = 3600;
/** Refresh token expiration (1 year for default projects) */
export const REFRESH_TOKEN_DURATION_DAYS = 365;

// ─── Schedule Form ────────────────────────────────────────────────────────
export const TIME_SLOTS = [
	'09:00 AM',
	'09:30 AM',
	'10:00 AM',
	'10:30 AM',
	'11:00 AM',
	'11:30 AM',
	'01:00 PM',
	'02:00 PM',
	'03:00 PM',
	'03:30 PM',
	'04:00 PM',
];

export const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// ─── Profile Tabs ─────────────────────────────────────────────────────────
export const PROFILE_TABS = [
	'Saved Properties',
	'Scheduled Visits',
	'Preferences & Settings',
] as const;

// ─── Property Form ────────────────────────────────────────────────────────
export const PROPERTY_FORM_AMENITIES = [
	'Swimming Pool',
	'Garden',
	'Air Conditioning',
	'Smart Home',
] as const;
