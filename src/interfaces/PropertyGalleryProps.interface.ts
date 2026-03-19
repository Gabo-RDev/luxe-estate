export interface PropertyGalleryProps {
	images: string[];
	title: string;
	badge?: string;
	imageUrl?: string; // fallback if images array is empty
}
