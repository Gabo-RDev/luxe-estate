'use client';

import dynamic from 'next/dynamic';

const PropertyMapDynamic = dynamic(
	() => import('./PropertyMap'),
	{
		ssr: false,
		loading: () => (
			<div className="w-full aspect-4/3 rounded-lg bg-slate-100 flex items-center justify-center animate-pulse">
				<span className="text-nordic/50">Loading map...</span>
			</div>
		),
	}
);

export default PropertyMapDynamic;
