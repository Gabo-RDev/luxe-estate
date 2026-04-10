'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { uploadPropertyImage } from '@/api/storage.api';
import { Property } from '@/interfaces/Property.interface';

interface UsePropertyFormOptions {
	initialData?: Property;
	isEdit?: boolean;
}

export function usePropertyForm({ initialData, isEdit = false }: UsePropertyFormOptions) {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [uploadStatus, setUploadStatus] = useState<string | null>(null);
	const [images, setImages] = useState<File[]>([]);
	const [previewUrls, setPreviewUrls] = useState<string[]>(
		initialData?.imageUrl ? [initialData.imageUrl] : [],
	);

	const supabase = createClient();

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

				for (const file of images) {
					const url = await uploadPropertyImage(file);
					if (url) {
						uploadedImageUrls.push(url);
					} else {
						setUploadStatus('❌ Error uploading one or more images. Check bucket permissions.');
						setIsSubmitting(false);
						return;
					}
				}

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
			};

			// 3. Insert or update property in Supabase
			setUploadStatus('Saving property...');
			let dbError = null;

			if (isEdit && initialData) {
				const { error } = await supabase
					.from('properties')
					.update(payload)
					.eq('id', initialData.id);
				dbError = error;

				// Append new gallery images to property_images table
				if (!error && uploadedImageUrls.length > 0) {
					const imageRows = uploadedImageUrls.map((url, i) => ({
						property_id: initialData.id,
						url,
						order: i,
					}));
					await supabase.from('property_images').insert(imageRows);
				}
			} else {
				const { data: inserted, error } = await supabase
					.from('properties')
					.insert(payload)
					.select('id')
					.single();
				dbError = error;

				// Insert gallery images (index 1+) for the new property
				if (!error && inserted && uploadedImageUrls.length > 1) {
					const imageRows = uploadedImageUrls.slice(1).map((url, i) => ({
						property_id: inserted.id,
						url,
						order: i + 1,
					}));
					await supabase.from('property_images').insert(imageRows);
				}
			}

			if (dbError) {
				setUploadStatus(`❌ Error saving property: ${dbError.message}`);
				setIsSubmitting(false);
				return;
			}

			setUploadStatus('✅ Property saved successfully!');
			setTimeout(() => router.push('/admin/properties'), 1200);
		} catch (err) {
			console.error(err);
			setUploadStatus('❌ Unexpected error. Please try again.');
			setIsSubmitting(false);
		}
	};

	return {
		isSubmitting,
		uploadStatus,
		previewUrls,
		handleImageChange,
		removeImage,
		handleSubmit,
	};
}
