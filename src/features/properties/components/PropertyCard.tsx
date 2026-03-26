import { Property } from '@/interfaces/Property.interface';
import Link from 'next/link';
import Image from 'next/image';
import { PropertyCardProps } from '@/interfaces/PropertyCardProps.interface';
import { BedIcon } from '@/components/ui/icons/BedIcon';
import { BathIcon } from '@/components/ui/icons/BathIcon';
import { AreaIcon } from '@/components/ui/icons/AreaIcon';
import { LocationIcon } from '@/components/ui/icons/LocationIcon';
import { FavoriteButton } from './FavoriteButton';

// Hoist static JSX to avoid recreating on every render
const CardOverlayShadow = () => (
	<div className='absolute bottom-0 inset-x-0 h-1/2 bg-linear-to-t from-black/60 to-transparent opacity-60'></div>
);

export default function PropertyCard({
	property,
	featuredMode = false,
	dictionary,
	locale,
}: PropertyCardProps) {
	const localizedTitle =
		(property[`title_${locale}` as keyof Property] as string) || property.title;
	const localizedLocation =
		(property[`location_${locale}` as keyof Property] as string) ||
		property.location;

	// If featuredMode is true, we use a larger card style with Hint of Green background for the highlights
	if (featuredMode) {
		return (
			<Link
				href={`/properties/${property.slug}`}
				className='group relative rounded-xl overflow-hidden shadow-soft bg-white cursor-pointer block'
			>
				<div className='aspect-4/3 w-full overflow-hidden relative'>
					<Image
						alt={property.title}
						className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
						src={property.imageUrl}
						fill
						sizes='(max-width: 1024px) 100vw, 50vw'
					/>
					<div className='absolute top-4 left-4 flex gap-2 z-10'>
						{property.isFeatured ? (
							<div className='bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-nordic flex items-center gap-1 shadow-sm'>
								{dictionary.property_card.exclusive}
							</div>
						) : null}
					</div>
					<FavoriteButton />
					<CardOverlayShadow />
				</div>
				<div className='p-6 relative'>
					<div className='flex justify-between items-start mb-2'>
						<div>
							<h3 className='text-xl font-medium text-nordic group-hover:text-mosque transition-colors'>
								{localizedTitle}
							</h3>
							<p className='text-nordic/70 text-sm flex items-center gap-1 mt-1'>
								<LocationIcon size={14} /> {localizedLocation}
							</p>
						</div>
						<span className='text-xl font-semibold text-mosque'>
							${property.price.toLocaleString('en-US')}
							{property.pricePeriod}
						</span>
					</div>
					<div className='flex items-center gap-4 sm:gap-6 flex-wrap mt-6 pt-6 border-t border-nordic/10'>
						<div className='flex items-center gap-2 text-nordic/80 text-sm'>
							<BedIcon size={18} /> {property.beds}{' '}
							{dictionary.property_card.beds}
						</div>
						<div className='flex items-center gap-2 text-nordic/80 text-sm'>
							<BathIcon size={18} /> {property.baths}{' '}
							{dictionary.property_card.baths}
						</div>
						<div className='flex items-center gap-2 text-nordic/80 text-sm'>
							<AreaIcon size={18} /> {property.area.toLocaleString('en-US')} m²
						</div>
					</div>
				</div>
			</Link>
		);
	}

	// Regular card mode
	return (
		<Link
			href={`/properties/${property.slug}`}
			className='bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer h-full flex flex-col'
		>
			<div className='relative aspect-4/3 overflow-hidden'>
				<Image
					alt={property.title}
					className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
					src={property.imageUrl}
					fill
					sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
				/>
				<div className='absolute top-4 left-4 flex flex-col gap-2 items-start z-10'>
					{property.isFeatured ? (
						<div className='bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-nordic flex items-center gap-1 shadow-sm'>
							{dictionary.property_card.exclusive}
						</div>
					) : null}
				</div>
				<FavoriteButton />
				<div
					className={`absolute bottom-3 left-3 text-white text-xs font-bold px-2 py-1 rounded ${property.listingType === 'Rent' ? 'bg-mosque/90' : 'bg-nordic/90'}`}
				>
					{dictionary.property_card.for}{' '}
					{property.listingType === 'Rent'
						? dictionary.property_card.rent
						: dictionary.property_card.buy}
				</div>
			</div>
			<div className='p-4 flex flex-col grow'>
				<div className='flex justify-between items-baseline mb-2'>
					<h3 className='font-bold text-lg text-nordic'>
						${property.price.toLocaleString('en-US')}
						{property.pricePeriod ? (
							<span className='text-sm font-normal text-nordic/70'>
								{property.pricePeriod}
							</span>
						) : null}
					</h3>
				</div>
				<h4 className='text-nordic font-medium truncate mb-1'>
					{localizedTitle}
				</h4>
				<p className='text-nordic/70 text-xs mb-4'>{localizedLocation}</p>

				<div className='mt-auto flex items-center justify-between pt-3 border-t border-nordic/10'>
					<div className='flex items-center gap-1 text-nordic/80 text-xs'>
						<BedIcon
							size={14}
							className='text-mosque'
						/>{' '}
						{property.beds}
					</div>
					<div className='flex items-center gap-1 text-nordic/80 text-xs'>
						<BathIcon
							size={14}
							className='text-mosque'
						/>{' '}
						{property.baths}
					</div>
					<div className='flex items-center gap-1 text-nordic/80 text-xs'>
						<AreaIcon
							size={14}
							className='text-mosque'
						/>{' '}
						{property.area}m²
					</div>
				</div>
			</div>
		</Link>
	);
}
