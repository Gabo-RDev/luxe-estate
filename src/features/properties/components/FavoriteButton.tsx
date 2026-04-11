'use client';

import { FavoriteButtonProps } from '@/interfaces/FavoriteButtonProps.interface';
import { HeartIcon } from '@/components/ui/icons/HeartIcon';
import { useFavoriteButton } from '../hooks/useFavoriteButton';

export function FavoriteButton({ propertyId }: FavoriteButtonProps) {
	const { isFavorite, toggleFavorite } = useFavoriteButton(propertyId);


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
