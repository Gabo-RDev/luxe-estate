'use client';

import { useState, useEffect, useCallback } from 'react';

export function useLightbox(imagesCount: number) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [lightboxIndex, setLightboxIndex] = useState(0);

	const openLightbox = useCallback((index: number) => {
		setLightboxIndex(index);
		setLightboxOpen(true);
	}, []);

	const closeLightbox = useCallback(() => setLightboxOpen(false), []);

	const goNext = useCallback(() => {
		if (imagesCount === 0) return;
		setLightboxIndex((i) => (i + 1) % imagesCount);
	}, [imagesCount]);

	const goPrev = useCallback(() => {
		if (imagesCount === 0) return;
		setLightboxIndex((i) => (i - 1 + imagesCount) % imagesCount);
	}, [imagesCount]);

	// Keyboard navigation
	useEffect(() => {
		if (!lightboxOpen) return;
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') closeLightbox();
			if (e.key === 'ArrowRight') goNext();
			if (e.key === 'ArrowLeft') goPrev();
		};
		window.addEventListener('keydown', handler);
		return () => window.removeEventListener('keydown', handler);
	}, [lightboxOpen, goNext, goPrev, closeLightbox]);

	// Lock body scroll when lightbox is open
	useEffect(() => {
		document.body.style.overflow = lightboxOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [lightboxOpen]);

	return {
		activeIndex,
		setActiveIndex,
		lightboxOpen,
		lightboxIndex,
		setLightboxIndex,
		openLightbox,
		closeLightbox,
		goNext,
		goPrev,
	};
}
