import { getPropertyBySlug } from '@/api/properties.api';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { Locale } from '@/types/I18n';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { Property } from '@/interfaces/Property.interface';
import ScheduleForm from '@/features/properties/components/ScheduleForm';

export default async function ScheduleViewingPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const [p, cookieStore] = await Promise.all([params, cookies()]);
	const locale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || 'es';

	const [property, dictionary] = await Promise.all([
		getPropertyBySlug(p.slug),
		getDictionary(locale),
	]);

	if (!property) {
		notFound();
	}

	const localizedTitle =
		(property[`title_${locale}` as keyof Property] as string) || property.title;
	const localizedLocation =
		(property[`location_${locale}` as keyof Property] as string) ||
		property.location;

	const imageUrl = property.images?.[0] || property.imageUrl;

	return (
		<div className='bg-clear-day min-h-screen flex flex-col antialiased selection:bg-mosque/20 selection:text-mosque'>
			<main className='grow flex flex-col items-center py-8 px-4 md:px-8'>
				<div className='w-full max-w-7xl mb-6'>
					<Link
						href={`/properties/${p.slug}`}
						className='flex items-center gap-2 group text-nordic/60 hover:text-mosque transition-colors w-fit'
					>
						<span className='material-icons text-xl group-hover:-translate-x-1 transition-transform'>
							arrow_back
						</span>
						<span className='font-medium'>
							{dictionary.property_details?.back_to_property ||
								'Back to property details'}
						</span>
					</Link>
				</div>

				<div className='w-full max-w-6xl bg-white rounded-xl shadow-2xl shadow-mosque/5 overflow-hidden flex flex-col md:flex-row border border-slate-100'>
					{/* Left Column: Property Summary */}
					<div className='w-full md:w-5/12 bg-slate-50 p-6 md:p-8 lg:p-10 flex flex-col gap-6 relative'>
						<div className='absolute top-0 left-0 w-full h-48 bg-linear-to-b from-mosque/5 to-transparent pointer-events-none'></div>
						<div className='relative group overflow-hidden rounded-lg shadow-md aspect-4/3'>
							{imageUrl ? (
								<Image
									src={imageUrl}
									alt={localizedTitle}
									fill
									className='object-cover transition-transform duration-700 group-hover:scale-105'
								/>
							) : (
								<div className='w-full h-full bg-slate-200'></div>
							)}
							<div className='absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase text-mosque'>
								{property.listingType === 'rent' ? 'For Rent' : 'For Sale'}
							</div>
						</div>
						<div className='space-y-4 z-10'>
							<div>
								<h2 className='text-2xl font-bold text-nordic leading-tight'>
									{localizedTitle}
								</h2>
								<p className='text-slate-500 mt-1 flex items-center gap-1 text-sm'>
									<span className='material-icons text-base'>location_on</span>
									{localizedLocation}
								</p>
							</div>
							<div className='flex items-center justify-between py-4 border-y border-slate-200'>
								<div className='flex flex-col'>
									<span className='text-xs text-slate-400 uppercase tracking-wider font-medium'>
										Price
									</span>
									<span className='text-xl font-bold text-mosque'>
										${property.price.toLocaleString()}
										{property.pricePeriod}
									</span>
								</div>
								<div className='flex items-center gap-4 text-slate-600'>
									<div className='flex flex-col items-center'>
										<span className='material-icons text-slate-400'>bed</span>
										<span className='text-xs font-medium'>{property.beds}</span>
									</div>
									<div className='w-px h-8 bg-slate-200'></div>
									<div className='flex flex-col items-center'>
										<span className='material-icons text-slate-400'>shower</span>
										<span className='text-xs font-medium'>{property.baths}</span>
									</div>
									<div className='w-px h-8 bg-slate-200'></div>
									<div className='flex flex-col items-center'>
										<span className='material-icons text-slate-400'>square_foot</span>
										<span className='text-xs font-medium'>
											{property.area}{' '}
											{dictionary.property_details?.square_meters || 'sqft'}
										</span>
									</div>
								</div>
							</div>
							<div className='flex items-center gap-3 pt-2'>
								<div className='relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0'>
									<Image
										src='https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w'
										alt='Host'
										fill
										className='object-cover'
									/>
								</div>
								<div>
									<p className='text-sm text-slate-500 font-medium'>Hosted by</p>
									<p className='text-nordic font-semibold'>Sarah Jenkins</p>
								</div>
								<button
									className='ml-auto p-2 text-mosque hover:bg-mosque/10 rounded-full transition-colors'
									title='Contact Agent'
								>
									<span className='material-icons'>chat_bubble_outline</span>
								</button>
							</div>
						</div>
					</div>

					{/* Right Column: Interactive Scheduling */}
					<div className='w-full md:w-7/12 p-6 md:p-8 lg:p-10 flex flex-col justify-between'>
						<ScheduleForm
							propertySlug={p.slug}
							propertyId={property.id}
							propertyTitle={localizedTitle}
						/>
					</div>
				</div>
			</main>
		</div>
	);
}
