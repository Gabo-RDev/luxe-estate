'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Property } from '@/interfaces/Property.interface';
import { usePropertyForm } from '@/features/admin/hooks/usePropertyForm';

const PropertyMap = dynamic(
	() => import('@/features/properties/components/PropertyMap'),
	{ ssr: false },
);

interface PropertyFormProps {
	initialData?: Property;
	isEdit?: boolean;
}

export function PropertyForm({
	initialData,
	isEdit = false,
}: PropertyFormProps) {
	const {
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
	} = usePropertyForm({ initialData, isEdit });

	return (
		<div className='bg-clear-day text-nordic min-h-screen font-sans'>
			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-10'>
				<header className='sticky top-16 z-40 bg-clear-day/95 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-200 pb-4 pt-4 md:pb-6 md:pt-6 mb-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
					<div className='space-y-2 md:space-y-4'>
						<nav
							aria-label='Breadcrumb'
							className='flex'
						>
							<ol className='flex items-center space-x-2 text-sm text-gray-500 font-medium font-sf-pro'>
								<li>
									<Link
										className='hover:text-mosque transition-colors'
										href='/admin/properties'
									>
										Properties
									</Link>
								</li>
								<li>
									<span className='material-icons text-xs text-gray-400'>
										chevron_right
									</span>
								</li>
								<li
									aria-current='page'
									className='text-nordic'
								>
									{isEdit ? 'Edit Property' : 'Add New'}
								</li>
							</ol>
						</nav>
						<div>
							<h1 className='text-3xl md:text-4xl font-bold text-nordic tracking-tight mb-2'>
								{isEdit ? 'Edit Property' : 'Add New Property'}
							</h1>
							<p className='text-base text-gray-500 max-w-2xl font-normal font-sf-pro'>
								Fill in the details below to{' '}
								{isEdit ? 'update the' : 'create a new'} listing. Fields marked
								with * are mandatory.
							</p>
						</div>
					</div>
					<div className='flex gap-3'>
						<button
							type='button'
							onClick={handleSaveDraft}
							disabled={isSavingDraft || isSubmitting}
							className='px-5 py-2.5 rounded-lg border border-gray-300 bg-white text-nordic hover:bg-gray-50 transition-colors font-medium font-sf-pro text-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center min-w-30'
						>
							{isSavingDraft ? (
								<>
									<span className='material-icons text-sm mr-2'>
										hourglass_empty
									</span>
									Saving...
								</>
							) : (
								'Save Draft'
							)}
						</button>
						<button
							type='submit'
							form='property-form'
							disabled={isSubmitting}
							className='px-5 py-2.5 rounded-lg bg-mosque hover:bg-nordic disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 font-sf-pro text-sm cursor-pointer'
						>
							<span className='material-icons text-sm'>
								{isSubmitting ? 'hourglass_empty' : 'save'}
							</span>
							{isSubmitting ? 'Saving...' : 'Save Property'}
						</button>
					</div>
				</header>

				{uploadStatus && (
					<div
						className={`mb-6 px-5 py-3 rounded-lg text-sm font-sf-pro font-medium border ${
							uploadStatus.startsWith('❌')
								? 'bg-red-50 border-red-200 text-red-700'
								: uploadStatus.startsWith('✅')
									? 'bg-hint-green/30 border-mosque/20 text-nordic'
									: 'bg-blue-50 border-blue-200 text-blue-700'
						}`}
					>
						{uploadStatus}
					</div>
				)}

				<form
					ref={formRef}
					id='property-form'
					onSubmit={handleSubmit}
					className='grid grid-cols-1 xl:grid-cols-12 gap-8 items-start'
				>
					<div className='xl:col-span-8 space-y-8'>
						{/* Basic Information */}
						<div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
							<div className='px-8 py-6 border-b border-hint-green/30 flex items-center gap-3 bg-linear-to-r from-hint-green/10 to-transparent'>
								<div className='w-8 h-8 rounded-full bg-hint-green flex items-center justify-center text-nordic'>
									<span className='material-icons text-lg'>info</span>
								</div>
								<h2 className='text-xl font-bold text-nordic'>
									Basic Information
								</h2>
							</div>
							<div className='p-8 space-y-6'>
								<div className='group'>
									<label
										className='block text-sm font-medium text-nordic mb-1.5 font-sf-pro'
										htmlFor='title'
									>
										Property Title <span className='text-red-500'>*</span>
									</label>
									<input
										className='w-full text-base px-4 py-2.5 rounded-md border-gray-200 bg-white text-nordic placeholder-gray-400 focus:ring-1 focus:ring-mosque focus:border-mosque transition-all font-sf-pro'
										id='title'
										name='title'
										defaultValue={initialData?.title}
										placeholder='e.g. Modern Penthouse with Ocean View'
										type='text'
										required
									/>
								</div>
								<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
									<div>
										<label
											className='block text-sm font-medium text-nordic mb-1.5 font-sf-pro'
											htmlFor='price'
										>
											Price <span className='text-red-500'>*</span>
										</label>
										<div className='relative'>
											<span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-sf-pro text-sm'>
												$
											</span>
											<input
												className='w-full pl-7 pr-4 py-2.5 rounded-md border-gray-200 bg-white text-nordic placeholder-gray-400 focus:ring-1 focus:ring-mosque focus:border-mosque transition-all text-base font-medium font-sf-pro'
												id='price'
												name='price'
												defaultValue={initialData?.price}
												placeholder='0.00'
												type='number'
												required
											/>
										</div>
									</div>
									<div>
										<label
											className='block text-sm font-medium text-nordic mb-1.5 font-sf-pro'
											htmlFor='listing_type'
										>
											Status
										</label>
										<select
											className='w-full px-4 py-2.5 rounded-md border-gray-200 bg-white text-nordic focus:ring-1 focus:ring-mosque focus:border-mosque transition-all text-base font-sf-pro cursor-pointer'
											id='listing_type'
											name='listing_type'
											defaultValue={initialData?.listingType || 'for-sale'}
										>
											<option value='for-sale'>For Sale</option>
											<option value='for-rent'>For Rent</option>
											<option value='sold'>Sold</option>
										</select>
									</div>
									<div>
										<label
											className='block text-sm font-medium text-nordic mb-1.5 font-sf-pro'
											htmlFor='property_type'
										>
											Property Type
										</label>
										<select
											className='w-full px-4 py-2.5 rounded-md border-gray-200 bg-white text-nordic focus:ring-1 focus:ring-mosque focus:border-mosque transition-all text-base font-sf-pro cursor-pointer'
											id='property_type'
											name='property_type'
											defaultValue={initialData?.propertyType || 'apartment'}
										>
											<option value='apartment'>Apartment</option>
											<option value='house'>House</option>
											<option value='villa'>Villa</option>
											<option value='commercial'>Commercial</option>
										</select>
									</div>
								</div>
							</div>
						</div>

						{/* Description */}
						<div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
							<div className='px-8 py-6 border-b border-hint-green/30 flex items-center gap-3 bg-linear-to-r from-hint-green/10 to-transparent'>
								<div className='w-8 h-8 rounded-full bg-hint-green flex items-center justify-center text-nordic'>
									<span className='material-icons text-lg'>description</span>
								</div>
								<h2 className='text-xl font-bold text-nordic'>Description</h2>
							</div>
							<div className='p-8'>
								<div className='mb-3 flex gap-2 border-b border-gray-100 pb-2'>
									<button
										className='p-1.5 text-gray-400 hover:text-nordic hover:bg-gray-50 rounded transition-colors cursor-pointer'
										type='button'
									>
										<span className='material-icons text-lg'>format_bold</span>
									</button>
									<button
										className='p-1.5 text-gray-400 hover:text-nordic hover:bg-gray-50 rounded transition-colors cursor-pointer'
										type='button'
									>
										<span className='material-icons text-lg'>
											format_italic
										</span>
									</button>
									<button
										className='p-1.5 text-gray-400 hover:text-nordic hover:bg-gray-50 rounded transition-colors cursor-pointer'
										type='button'
									>
										<span className='material-icons text-lg'>
											format_list_bulleted
										</span>
									</button>
								</div>
								<textarea
									className='w-full px-4 py-3 rounded-md border-gray-200 bg-white text-nordic placeholder-gray-400 focus:ring-1 focus:ring-mosque focus:border-mosque transition-all text-base font-sf-pro leading-relaxed resize-y min-h-50'
									id='description'
									name='description'
									defaultValue={initialData?.description || ''}
									placeholder='Describe the property features, neighborhood, and unique selling points...'
								></textarea>
								<div className='mt-2 text-right text-xs text-gray-400 font-sf-pro'>
									0 / 2000 characters
								</div>
							</div>
						</div>

						{/* Gallery */}
						<div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
							<div className='px-8 py-6 border-b border-hint-green/30 flex justify-between items-center bg-linear-to-r from-hint-green/10 to-transparent'>
								<div className='flex items-center gap-3'>
									<div className='w-8 h-8 rounded-full bg-hint-green flex items-center justify-center text-nordic'>
										<span className='material-icons text-lg'>image</span>
									</div>
									<h2 className='text-xl font-bold text-nordic'>Gallery</h2>
								</div>
								<span className='text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded font-sf-pro'>
									JPG, PNG, WEBP
								</span>
							</div>
							<div className='p-8'>
								<div className='relative border-2 border-dashed border-gray-300 rounded-xl bg-gray-50/50 p-10 text-center hover:bg-hint-green/10 hover:border-mosque/40 transition-colors cursor-pointer group'>
									<input
										className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10'
										multiple
										type='file'
										accept='image/png, image/jpeg, image/webp'
										onChange={handleImageChange}
									/>
									<div className='flex flex-col items-center justify-center space-y-3'>
										<div className='w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-mosque group-hover:scale-110 transition-transform duration-300'>
											<span className='material-icons text-2xl'>
												cloud_upload
											</span>
										</div>
										<div className='space-y-1'>
											<p className='text-base font-medium text-nordic font-sf-pro'>
												Click or drag images here
											</p>
											<p className='text-xs text-gray-400 font-sf-pro'>
												Max file size 5MB per image
											</p>
										</div>
									</div>
								</div>

								{previewUrls.length > 0 && (
									<div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6'>
										{previewUrls.map((url, index) => (
											<div
												key={index}
												className='aspect-square rounded-lg overflow-hidden relative group shadow-sm'
											>
												<img
													alt={`Preview \${index}`}
													className='w-full h-full object-cover'
													src={url}
												/>
												<div className='absolute inset-0 bg-nordic/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]'>
													<button
														onClick={() => removeImage(index)}
														className='w-8 h-8 rounded-full bg-white text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer'
														type='button'
													>
														<span className='material-icons text-sm'>
															delete
														</span>
													</button>
												</div>
												{index === 0 && (
													<span className='absolute top-2 left-2 bg-mosque text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm font-sf-pro uppercase tracking-wider'>
														Main
													</span>
												)}
											</div>
										))}
									</div>
								)}
							</div>
						</div>
					</div>

					<div className='xl:col-span-4 space-y-8'>
						{/* Location */}
						<div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
							<div className='px-6 py-4 border-b border-hint-green/30 flex items-center gap-3 bg-linear-to-r from-hint-green/10 to-transparent'>
								<div className='w-8 h-8 rounded-full bg-hint-green flex items-center justify-center text-nordic'>
									<span className='material-icons text-lg'>place</span>
								</div>
								<h2 className='text-lg font-bold text-nordic'>Location</h2>
							</div>
							<div className='p-6 space-y-4'>
								<div>
									<label
										className='block text-sm font-medium text-nordic mb-1.5 font-sf-pro'
										htmlFor='location'
									>
										Address
									</label>
									<input
										className='w-full px-4 py-2.5 rounded-md border-gray-200 bg-white text-nordic placeholder-gray-400 focus:ring-1 focus:ring-mosque focus:border-mosque transition-all text-sm font-sf-pro'
										id='location'
										name='location'
										defaultValue={initialData?.location}
										placeholder='Street Address, City, Zip'
										type='text'
									/>
								</div>
								<div className='grid grid-cols-2 gap-3'>
									<div>
										<label
											className='block text-sm font-medium text-nordic mb-1.5 font-sf-pro'
											htmlFor='lat'
										>
											Latitude
										</label>
										<input
											className='w-full px-4 py-2.5 rounded-md border-gray-200 bg-white text-nordic placeholder-gray-400 focus:ring-1 focus:ring-mosque focus:border-mosque transition-all text-sm font-sf-pro'
											id='lat'
											name='lat'
											value={mapCoordinates.lat ?? ''}
											onChange={handleCoordinateChange}
											placeholder='e.g. 40.7128'
											type='number'
											step='any'
										/>
									</div>
									<div>
										<label
											className='block text-sm font-medium text-nordic mb-1.5 font-sf-pro'
											htmlFor='lng'
										>
											Longitude
										</label>
										<input
											className='w-full px-4 py-2.5 rounded-md border-gray-200 bg-white text-nordic placeholder-gray-400 focus:ring-1 focus:ring-mosque focus:border-mosque transition-all text-sm font-sf-pro'
											id='lng'
											name='lng'
											value={mapCoordinates.lng ?? ''}
											onChange={handleCoordinateChange}
											placeholder='e.g. -74.0060'
											type='number'
											step='any'
										/>
									</div>
								</div>
								<div className='relative overflow-hidden rounded-lg group z-0'>
									<PropertyMap
										location={initialData?.location || 'New York'}
										lat={mapCoordinates.lat ?? undefined}
										lng={mapCoordinates.lng ?? undefined}
									/>
								</div>
							</div>
						</div>

						{/* Details */}
						<div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24'>
							<div className='px-6 py-4 border-b border-hint-green/30 flex items-center gap-3 bg-linear-to-r from-hint-green/10 to-transparent'>
								<div className='w-8 h-8 rounded-full bg-hint-green flex items-center justify-center text-nordic'>
									<span className='material-icons text-lg'>straighten</span>
								</div>
								<h2 className='text-lg font-bold text-nordic'>Details</h2>
							</div>
							<div className='p-6 space-y-6'>
								<div className='grid grid-cols-2 gap-4'>
									<div className='group'>
										<label
											className='text-xs text-gray-500 font-medium font-sf-pro mb-1 block'
											htmlFor='area'
										>
											Area (sqft/m²)
										</label>
										<input
											className='w-full text-left px-3 py-2 rounded border-gray-200 bg-gray-50 text-nordic focus:bg-white focus:ring-1 focus:ring-mosque focus:border-mosque transition-all font-sf-pro text-sm'
											id='area'
											name='area'
											defaultValue={initialData?.area}
											placeholder='0'
											type='number'
										/>
									</div>
									<div className='group'>
										<label
											className='text-xs text-gray-500 font-medium font-sf-pro mb-1 block'
											htmlFor='year_built'
										>
											Year Built
										</label>
										<input
											className='w-full text-left px-3 py-2 rounded border-gray-200 bg-gray-50 text-nordic focus:bg-white focus:ring-1 focus:ring-mosque focus:border-mosque transition-all font-sf-pro text-sm'
											id='year_built'
											name='year_built'
											defaultValue={initialData?.yearBuilt}
											placeholder='YYYY'
											type='number'
										/>
									</div>
								</div>
								<hr className='border-gray-100' />
								<div className='space-y-4'>
									<div className='flex items-center justify-between'>
										<label className='text-sm font-medium text-nordic font-sf-pro flex items-center gap-2'>
											<span className='material-icons text-gray-400 text-sm'>
												bed
											</span>{' '}
											Bedrooms
										</label>
										<div className='flex items-center border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm'>
											<input
												className='w-16 text-center border-none bg-transparent text-nordic p-2 focus:ring-0 text-sm font-medium font-sf-pro'
												type='number'
												name='beds'
												defaultValue={initialData?.beds || 3}
											/>
										</div>
									</div>
									<div className='flex items-center justify-between'>
										<label className='text-sm font-medium text-nordic font-sf-pro flex items-center gap-2'>
											<span className='material-icons text-gray-400 text-sm'>
												shower
											</span>{' '}
											Bathrooms
										</label>
										<div className='flex items-center border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm'>
											<input
												className='w-16 text-center border-none bg-transparent text-nordic p-2 focus:ring-0 text-sm font-medium font-sf-pro'
												type='number'
												name='baths'
												defaultValue={initialData?.baths || 2}
											/>
										</div>
									</div>
									<div className='flex items-center justify-between'>
										<label className='text-sm font-medium text-nordic font-sf-pro flex items-center gap-2'>
											<span className='material-icons text-gray-400 text-sm'>
												directions_car
											</span>{' '}
											Parking
										</label>
										<div className='flex items-center border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm'>
											<input
												className='w-16 text-center border-none bg-transparent text-nordic p-2 focus:ring-0 text-sm font-medium font-sf-pro'
												type='number'
												name='parking_spaces'
												defaultValue={initialData?.parkingSpaces || 1}
											/>
										</div>
									</div>
								</div>
								<hr className='border-gray-100' />
								<div>
									<h3 className='text-sm font-bold text-nordic mb-3 font-sf-pro uppercase tracking-wider'>
										Amenities
									</h3>
									<div className='space-y-2'>
										{[
											'Swimming Pool',
											'Garden',
											'Air Conditioning',
											'Smart Home',
										].map((amenity) => (
											<label
												key={amenity}
												className='flex items-center gap-2.5 cursor-pointer group'
											>
												<input
													className='w-4 h-4 text-mosque border-gray-300 rounded focus:ring-mosque cursor-pointer'
													type='checkbox'
													name='amenities'
													value={amenity}
													defaultChecked={initialData?.amenities?.includes(
														amenity,
													)}
												/>
												<span className='text-sm text-gray-700 font-sf-pro group-hover:text-nordic transition-colors'>
													{amenity}
												</span>
											</label>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Mobile Actions Overlay */}
					<div className='fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-xl md:hidden z-40 flex gap-3'>
						<Link
							href='/admin/properties'
							className='flex-1 py-3 rounded-lg border border-gray-300 bg-white text-nordic font-medium font-sf-pro text-center cursor-pointer'
						>
							Cancel
						</Link>
						<button
							type='submit'
							className='flex-1 py-3 rounded-lg bg-mosque text-white font-medium font-sf-pro flex justify-center items-center gap-2 cursor-pointer'
						>
							Save
						</button>
					</div>
				</form>
			</main>
		</div>
	);
}
