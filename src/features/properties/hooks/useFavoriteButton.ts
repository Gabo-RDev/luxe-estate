import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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

export function useFavoriteButton(propertyId: string) {
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

		document.cookie = `favorites=${encodeURIComponent(
			JSON.stringify(newFavorites),
		)}; path=/; max-age=31536000`;

		// Refresh server state to reflect updated favorites in Saved Homes view
		router.refresh();
	};

	return {
		isFavorite,
		toggleFavorite,
	};
}
