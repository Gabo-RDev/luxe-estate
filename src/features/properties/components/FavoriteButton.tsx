'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HeartIcon } from '@/components/ui/icons/HeartIcon';

interface FavoriteButtonProps {
	propertyId: string;
}

function getFavoritesFromCookie(): string[] {
	if (typeof document === 'undefined') return [];
	const match = document.cookie.match(new RegExp('(^| )favorites=([^;]+)'));
	if (match) {
		try {
			return JSON.parse(decodeURIComponent(match[2]));
		} catch (e) {
			return [];
		}
	}
	return [];
}

export function FavoriteButton({ propertyId }: FavoriteButtonProps) {
	const router = useRouter();
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		const favorites = getFavoritesFromCookie();
		setIsFavorite(favorites.includes(propertyId));
	}, [propertyId]);

	const toggleFavorite = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		
		const favorites = getFavoritesFromCookie();
		let newFavorites;
		
		if (favorites.includes(propertyId)) {
			newFavorites = favorites.filter((id) => id !== propertyId);
			setIsFavorite(false);
		} else {
			newFavorites = [...favorites, propertyId];
			setIsFavorite(true);
		}
		
		document.cookie = `favorites=${encodeURIComponent(JSON.stringify(newFavorites))}; path=/; max-age=31536000`;
		
		// Refresh server state to reflect updated favorites in Saved Homes view
		router.refresh();
	};

	return (
		<button
			onClick={toggleFavorite}
			className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all shadow-sm cursor-pointer ${
				isFavorite 
					? 'text-red-500 hover:text-red-600 bg-red-50/90' 
					: 'text-nordic hover:bg-mosque hover:text-white'
			}`}
			aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
		>
			<HeartIcon size={20} filled={isFavorite} />
		</button>
	);
}
