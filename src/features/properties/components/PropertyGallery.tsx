'use client';

import Image from 'next/image';
import { PropertyGalleryProps } from '@/interfaces/PropertyGalleryProps.interface';
import { useLightbox } from '../hooks/useLightbox';

export default function PropertyGallery({
	images,
	title,
	badge,
	imageUrl,
}: PropertyGalleryProps) {
	// Use images array if populated, otherwise fall back to single imageUrl
	const galleryFallback = imageUrl ? [imageUrl] : [];
	const displayImages = images.length > 0 ? images : galleryFallback;

	const {
		activeIndex,
		setActiveIndex,
		lightboxOpen,
		lightboxIndex,
		setLightboxIndex,
		openLightbox,
		closeLightbox,
		goNext,
		goPrev,
	} = useLightbox(displayImages.length);

	if (displayImages.length === 0) return null;

	return (
		<>
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
						{badge ? (
							<span className='bg-mosque text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm'>
								{badge}
							</span>
						) : null}
						<span className='bg-white/90 backdrop-blur text-nordic text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm'>
							New
						</span>
					</div>
					<button
						onClick={() => openLightbox(activeIndex)}
						className='absolute bottom-4 right-4 bg-white/90 hover:bg-white text-nordic px-4 py-2 rounded-lg text-sm font-medium shadow-lg backdrop-blur transition-all flex items-center gap-2 cursor-pointer'
					>
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

			{/* Lightbox Modal */}
			{lightboxOpen && (
				<div
					className='fixed inset-0 z-9999 bg-black/95 flex flex-col'
					onClick={closeLightbox}
				>
					{/* Header */}
					<div
						className='flex items-center justify-between px-6 py-4 shrink-0'
						onClick={(e) => e.stopPropagation()}
					>
						<span className='text-white/70 text-sm font-medium'>
							{lightboxIndex + 1} / {displayImages.length}
						</span>
						<h2 className='text-white font-semibold text-base truncate mx-4'>
							{title}
						</h2>
						<button
							onClick={closeLightbox}
							className='w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer'
							aria-label='Close lightbox'
						>
							<span className='material-icons text-xl'>close</span>
						</button>
					</div>

					{/* Main image */}
					<div
						className='flex-1 flex items-center justify-center relative px-16 min-h-0'
						onClick={(e) => e.stopPropagation()}
					>
						{/* Prev button */}
						{displayImages.length > 1 && (
							<button
								onClick={goPrev}
								className='absolute left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer z-10'
								aria-label='Previous photo'
							>
								<span className='material-icons'>chevron_left</span>
							</button>
						)}

						<div className='relative w-full h-full'>
							<Image
								key={lightboxIndex}
								src={displayImages[lightboxIndex]}
								alt={`${title} - Photo ${lightboxIndex + 1}`}
								fill
								className='object-contain'
								sizes='100vw'
								priority
							/>
						</div>

						{/* Next button */}
						{displayImages.length > 1 && (
							<button
								onClick={goNext}
								className='absolute right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer z-10'
								aria-label='Next photo'
							>
								<span className='material-icons'>chevron_right</span>
							</button>
						)}
					</div>

					{/* Thumbnail strip */}
					{displayImages.length > 1 && (
						<div
							className='flex gap-2 overflow-x-auto px-6 py-4 shrink-0 justify-center'
							onClick={(e) => e.stopPropagation()}
						>
							{displayImages.map((img, i) => (
								<button
									key={i}
									onClick={() => setLightboxIndex(i)}
									className={`relative w-16 h-12 rounded-md overflow-hidden shrink-0 transition-all cursor-pointer border-2 ${
										i === lightboxIndex
											? 'border-white scale-105'
											: 'border-transparent opacity-50 hover:opacity-80'
									}`}
								>
									<Image
										src={img}
										alt={`Thumbnail ${i + 1}`}
										fill
										sizes='64px'
										className='object-cover'
									/>
								</button>
							))}
						</div>
					)}
				</div>
			)}
		</>
	);
}
