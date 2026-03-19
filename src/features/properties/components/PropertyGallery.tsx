'use client';

import Image from 'next/image';
import { useState } from 'react';

interface PropertyGalleryProps {
	images: string[];
	title: string;
	badge?: string;
	imageUrl?: string; // fallback if images array is empty
}

export default function PropertyGallery({
	images,
	title,
	badge,
	imageUrl,
}: PropertyGalleryProps) {
	// Use images array if populated, otherwise fall back to single imageUrl
	const galleryFallback = imageUrl ? [imageUrl] : [];
	const displayImages = images.length > 0 ? images : galleryFallback;

	const [activeIndex, setActiveIndex] = useState(0);

	if (displayImages.length === 0) return null;

	return (
		<div className='space-y-4'>
			<div className='relative aspect-16/10 overflow-hidden rounded-xl shadow-sm group'>
				<Image
					src={displayImages[activeIndex]}
					alt={title}
					fill
					className='object-cover transition-transform duration-700 group-hover:scale-105'
					priority
				/>
				<div className='absolute top-4 left-4 flex gap-2'>
					{badge && (
						<span className='bg-mosque text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm'>
							{badge}
						</span>
					)}
					<span className='bg-white/90 backdrop-blur text-nordic text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm'>
						New
					</span>
				</div>
				<button className='absolute bottom-4 right-4 bg-white/90 hover:bg-white text-nordic px-4 py-2 rounded-lg text-sm font-medium shadow-lg backdrop-blur transition-all flex items-center gap-2'>
					<span className='material-icons text-sm'>grid_view</span>
					View All Photos
				</button>
			</div>

			<div className='flex gap-4 overflow-x-auto scrollbar-hide py-2 px-0.5 snap-x'>
				{displayImages.map((img, index) => (
					<div
						key={index}
						onClick={() => setActiveIndex(index)}
						className={`flex-none w-48 aspect-4/3 relative rounded-lg cursor-pointer snap-start transition-all ${
							activeIndex === index
								? 'ring-2 ring-mosque ring-offset-2'
								: 'opacity-70 hover:opacity-100'
						}`}
					>
						<div className='absolute inset-0 rounded-lg overflow-hidden'>
							<Image
								src={img}
								alt={`${title} - Photo ${index + 1}`}
								fill
								sizes='(max-width: 768px) 192px, 192px'
								className='object-cover'
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
