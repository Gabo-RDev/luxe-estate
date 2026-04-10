import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/interfaces/Property.interface';
import { formatCurrency } from '@/utils/formatters';

interface AdminPropertyCardProps {
	property: Property;
}

export function AdminPropertyCard({ property }: AdminPropertyCardProps) {
	return (
		<div className='group grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 border-b border-gray-100 hover:bg-clear-day transition-colors items-center'>
			{/* Property Details */}
			<div className='col-span-12 md:col-span-6 flex gap-4 items-center'>
				<div className='relative h-20 w-28 shrink-0 rounded-lg overflow-hidden bg-gray-200'>
					{property.imageUrl ? (
						<Image
							src={property.imageUrl}
							alt={property.title}
							fill
							sizes='112px'
							className='object-cover transition-transform duration-500 group-hover:scale-105'
						/>
					) : (
						<div className='h-full w-full flex items-center justify-center'>
							<span className='material-icons text-gray-400'>home</span>
						</div>
					)}
				</div>
				<div className='overflow-hidden'>
					<h3 className='text-lg font-bold text-nordic group-hover:text-mosque transition-colors cursor-pointer truncate'>
						{property.title}
					</h3>
					<p className='text-sm text-gray-500 truncate'>{property.location}</p>

					<div className='flex items-center gap-3 mt-1.5 text-xs text-gray-400'>
						<span className='flex items-center gap-1 shrink-0'>
							<span className='material-icons text-[14px]'>bed</span>{' '}
							{property.beds} Beds
						</span>
						<span className='w-1 h-1 rounded-full bg-gray-300'></span>
						<span className='flex items-center gap-1 shrink-0'>
							<span className='material-icons text-[14px]'>bathtub</span>{' '}
							{property.baths} Baths
						</span>
						<span className='w-1 h-1 rounded-full bg-gray-300 hidden sm:block'></span>
						<span className='hidden sm:block shrink-0'>
							{property.area} sqft
						</span>
					</div>
				</div>
			</div>

			{/* Price */}
			<div className='col-span-6 md:col-span-2'>
				<div className='text-base font-semibold text-nordic'>
					{formatCurrency(property.price)}
				</div>
				{property.pricePeriod && (
					<div className='text-xs text-gray-400'>
						Monthly: {formatCurrency(property.price)}{' '}
						{/* Or custom monthly logic if needed */}
					</div>
				)}
			</div>

			{/* Status */}
			<div className='col-span-6 md:col-span-2'>
				<span
					className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
						property.isFeatured
							? 'bg-mosque/10 text-mosque border-mosque/20'
							: 'bg-hint-of-green text-mosque border-mosque/10'
					}`}
				>
					<span
						className={`w-1.5 h-1.5 rounded-full mr-1.5 ${property.isFeatured ? 'bg-mosque' : 'bg-mosque/70'}`}
					></span>
					{property.isFeatured ? 'Featured' : 'Active'}
				</span>
			</div>

			{/* Actions */}
			<div className='col-span-12 md:col-span-2 flex items-center justify-end gap-2'>
				<Link
					href={`/admin/properties/${property.id}/edit`}
					className='p-2 rounded-lg text-gray-400 hover:text-mosque hover:bg-hint-of-green/50 transition-all cursor-pointer'
					title='Edit Property'
				>
					<span className='material-icons text-xl'>edit</span>
				</Link>
				<button
					className='p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer'
					title='Delete Property'
				>
					<span className='material-icons text-xl'>delete_outline</span>
				</button>
			</div>
		</div>
	);
}
