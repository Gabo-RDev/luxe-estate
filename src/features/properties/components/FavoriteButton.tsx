'use client';

import { HeartIcon } from '@/components/ui/icons/HeartIcon';

export function FavoriteButton() {
	return (
		<button
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				// Toggle favorite logic would go here
				console.log('Toggle favorite');
			}}
			className='absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-nordic hover:bg-mosque hover:text-white transition-all shadow-sm cursor-pointer'
			aria-label='Add to favorites'
		>
			<HeartIcon size={20} />
		</button>
	);
}
