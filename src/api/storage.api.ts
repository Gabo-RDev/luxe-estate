import { createClient } from '@/lib/supabase/client';

export async function uploadPropertyImage(file: File): Promise<string | null> {
	const supabase = createClient();
	const bucketName = 'property-images';
	const fileExt = file.name.split('.').pop();
	const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
	const filePath = `${fileName}`;

	const { error: uploadError } = await supabase.storage
		.from(bucketName)
		.upload(filePath, file);

	if (uploadError) {
		console.error('Error uploading image to Supabase:', uploadError.message);
		return null;
	}

	const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
	return data?.publicUrl || null;
}
