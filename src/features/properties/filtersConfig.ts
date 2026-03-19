export const PRICE_BOUNDS = {
	MIN: 100000,
	MAX: 30000000,
	STEP: 100000,
	GAP: 500000, // Minimum gap between min and max handles
};

export const FILTERS_DEFAULTS = {
	location: 'San Francisco',
	minPrice: 1200000,
	maxPrice: 4500000,
	propertyType: 'all',
	beds: 2,
	baths: 1,
	amenities: ['pool', 'wifi'],
};

export const AMENITIES_LIST = [
	{ id: 'pool', label: 'Pool', icon: 'pool' },
	{ id: 'wifi', label: 'Wi-Fi', icon: 'wifi' },
	{ id: 'gym', label: 'Gym', icon: 'fitness_center' },
	{ id: 'parking', label: 'Parking', icon: 'local_parking' },
	{ id: 'security', label: 'Security', icon: 'security' },
	{ id: 'garden', label: 'Garden', icon: 'yard' },
];

export const FILTER_KEYS = [
	'location',
	'minPrice',
	'maxPrice',
	'propertyType',
	'beds',
	'baths',
	'page',
] as const;
