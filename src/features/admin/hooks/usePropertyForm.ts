'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { uploadPropertyImage } from '@/api/storage.api';
import { Property } from '@/interfaces/Property.interface';
import {
	createProperty,
	updateProperty,
	insertPropertyImages,
} from '@/app/admin/properties/actions';

interface UsePropertyFormOptions {
	initialData?: Property;
	isEdit?: boolean;
}

export function usePropertyForm({ initialData, isEdit = false }: UsePropertyFormOptions) {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSavingDraft, setIsSavingDraft] = useState(false);
	const [uploadStatus, setUploadStatus] = useState<string | null>(null);
	const [images, setImages] = useState<File[]>([]);
	const [previewUrls, setPreviewUrls] = useState<string[]>(
		initialData?.imageUrl ? [initialData.imageUrl] : [],
	);
	const [mapCoordinates, setMapCoordinates] = useState({
		lat: initialData?.lat ?? null,
		lng: initialData?.lng ?? null,
	});
	const formRef = useRef<HTMLFormElement>(null);



	const handleCoordinateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setMapCoordinates((prev) => ({
			...prev,
			[name]: value === '' ? null : Number(value),
		}));
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const filesArray = Array.from(e.target.files);
			setImages((prev) => [...prev, ...filesArray]);

			const urls = filesArray.map((file) => URL.createObjectURL(file));
			setPreviewUrls((prev) => [...prev, ...urls]);
		}
	};

	const removeImage = (index: number) => {
		setImages((prev) => prev.filter((_, i) => i !== index));
		setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		setUploadStatus(null);

		const formData = new FormData(e.currentTarget);

		try {
			// 1. Upload all selected images to Supabase Storage
			let mainImageUrl = initialData?.imageUrl ?? '';
			const uploadedImageUrls: string[] = [];

			if (images.length > 0) {
				setUploadStatus(`Uploading ${images.length} image(s)...`);

				const results = await Promise.all(images.map(uploadPropertyImage));
				
				if (results.some(url => !url)) {
					setUploadStatus('❌ Error uploading one or more images. Check bucket permissions.');
					setIsSubmitting(false);
					return;
				}
				
				uploadedImageUrls.push(...(results as string[]));


				mainImageUrl = uploadedImageUrls[0];

				// Replace local blob previews with the real Supabase public URLs
				setPreviewUrls((prev) => {
					prev.forEach((url) => {
						if (url.startsWith('blob:')) URL.revokeObjectURL(url);
					});
					return uploadedImageUrls;
				});
				setImages([]);
			}

			// 2. Build property payload
			const amenityValues = formData.getAll('amenities') as string[];
			const slug = (formData.get('title') as string)
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/(^-|-$)/g, '');

			const latRaw = formData.get('lat') as string;
			const lngRaw = formData.get('lng') as string;

			const payload = {
				title: formData.get('title') as string,
				price: Number(formData.get('price')),
				listing_type: formData.get('listing_type') as string,
				property_type: formData.get('property_type') as string,
				location: formData.get('location') as string,
				description: (formData.get('description') as string) || null,
				area: Number(formData.get('area')) || 0,
				beds: Number(formData.get('beds')) || 0,
				baths: Number(formData.get('baths')) || 0,
				parking_spaces: Number(formData.get('parking_spaces')) || 0,
				year_built: Number(formData.get('year_built')) || null,
				amenities: amenityValues.length > 0 ? amenityValues : null,
				image_url: mainImageUrl,
				slug: isEdit ? initialData!.slug : `${slug}-${Date.now()}`,
				lat: latRaw ? Number(latRaw) : null,
				lng: lngRaw ? Number(lngRaw) : null,
			};

			// 3. Insert or update property via Server Action (bypasses RLS safely)
			setUploadStatus('Saving property...');

			if (isEdit && initialData) {
				await updateProperty(initialData.id, payload);

				// Append new gallery images
				if (uploadedImageUrls.length > 0) {
					const imageRows = uploadedImageUrls.map((url, i) => ({
						property_id: initialData.id,
						url,
						order: i,
					}));
					await insertPropertyImages(imageRows);
				}
			} else {
				const inserted = await createProperty(payload);

				// Insert gallery images (index 1+) for the new property
				if (uploadedImageUrls.length > 1) {
					const imageRows = uploadedImageUrls.slice(1).map((url, i) => ({
						property_id: inserted.id,
						url,
						order: i + 1,
					}));
					await insertPropertyImages(imageRows);
				}
			}

			setUploadStatus('✅ Property saved successfully!');
			setTimeout(() => router.push('/admin/properties'), 1200);
		} catch (err) {
			console.error(err);
			setUploadStatus('❌ Unexpected error. Please try again.');
			setIsSubmitting(false);
		}
	};

	const handleSaveDraft = async () => {
		if (!formRef.current) return;
		setIsSavingDraft(true);
		setUploadStatus(null);

		const formData = new FormData(formRef.current);
		const amenityValues = formData.getAll('amenities') as string[];
		const titleRaw = (formData.get('title') as string) || 'untitled-draft';
		const slug = titleRaw
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)/g, '');
		const latRaw = formData.get('lat') as string;
		const lngRaw = formData.get('lng') as string;

		const draftPayload = {
			title: titleRaw,
			price: Number(formData.get('price')) || 0,
			listing_type: (formData.get('listing_type') as string) || 'for-sale',
			property_type: (formData.get('property_type') as string) || 'apartment',
			location: (formData.get('location') as string) || '',
			description: (formData.get('description') as string) || null,
			area: Number(formData.get('area')) || 0,
			beds: Number(formData.get('beds')) || 0,
			baths: Number(formData.get('baths')) || 0,
			parking_spaces: Number(formData.get('parking_spaces')) || 0,
			year_built: Number(formData.get('year_built')) || null,
			amenities: amenityValues.length > 0 ? amenityValues : null,
			image_url: initialData?.imageUrl ?? '',
			is_featured: false,
			badge: 'Draft',
			slug: isEdit ? initialData!.slug : `draft-${slug}-${Date.now()}`,
			lat: latRaw ? Number(latRaw) : null,
			lng: lngRaw ? Number(lngRaw) : null,
		};

		try {
			if (isEdit && initialData) {
				await updateProperty(initialData.id, draftPayload);
			} else {
				await createProperty(draftPayload);
			}
			setUploadStatus('✅ Draft saved successfully!');
			setTimeout(() => setUploadStatus(null), 3000);
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : 'Unknown error';
			setUploadStatus(`❌ Error saving draft: ${message}`);
		} finally {
			setIsSavingDraft(false);
		}
	};

	return {
		isSubmitting,
		isSavingDraft,
		uploadStatus,
		previewUrls,
		mapCoordinates,
		formRef,
		handleImageChange,
		handleCoordinateChange,
		removeImage,
		handleSubmit,
		handleSaveDraft,
	};
}
