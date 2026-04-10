'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { PropertyMapProps } from '@/interfaces/PropertyMapProps.interface';

// Created once at module level — no need to recreate on every render
const customIcon = L.divIcon({
	className: 'custom-map-marker bg-transparent border-0',
	html: `<div class="w-8 h-8 bg-mosque rounded-full border-4 border-white shadow-lg flex items-center justify-center" style="margin-top: -16px; margin-left: -16px;">
            <span class="material-icons text-white" style="font-size: 16px;">home</span>
           </div>`,
	iconSize: [32, 32],
	iconAnchor: [16, 32],
});

function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
	const map = useMap();
	useEffect(() => {
		map.setView(center, zoom);
	}, [center, zoom, map]);
	return null;
}

export default function PropertyMap({ location, lat, lng }: PropertyMapProps) {
	// Use real coordinates if provided, otherwise fall back to generic US center
	const hasCoords = lat !== undefined && lat !== null && lng !== undefined && lng !== null && !isNaN(lat) && !isNaN(lng);
	const position: [number, number] = hasCoords ? [lat, lng] : [39.5, -98.35];
	const zoomLevel = hasCoords ? 13 : 4;
	const mapQuery = hasCoords ? `${lat},${lng}` : location;

	return (
		<div className='relative w-full aspect-4/3 rounded-lg overflow-hidden bg-slate-100 z-0'>
			<MapContainer
				center={position}
				zoom={zoomLevel}
				scrollWheelZoom={false}
				style={{ height: '100%', width: '100%', zIndex: 0 }}
			>
				<TileLayer
					url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
				/>
				<MapUpdater center={position} zoom={zoomLevel} />
				{hasCoords ? (
					<Marker
						position={position}
						icon={customIcon}
					/>
				) : null}
			</MapContainer>
			<a
				href={`https://maps.google.com/?q=${encodeURIComponent(mapQuery)}`}
				target='_blank'
				rel='noopener noreferrer'
				className='absolute bottom-2 right-2 bg-white/90 text-xs font-medium px-2 py-1 rounded shadow-sm text-nordic hover:text-mosque z-1000'
			>
				View on Map
			</a>
		</div>
	);
}
