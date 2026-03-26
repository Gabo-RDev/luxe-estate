import { notFound } from 'next/navigation';
import { getPropertyBySlug } from '@/api/properties.api';
import Image from 'next/image';
import PropertyMap from '@/features/properties/components/PropertyMapDynamic';
import PropertyGallery from '@/features/properties/components/PropertyGallery';
import PropertiesPage from '../page';
import { cookies } from 'next/headers';
import { Locale } from '@/types/I18n';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { Property } from '@/interfaces/Property.interface';

import { PropertyDetailsPageProps } from '@/interfaces/PropertyDetailsPageProps.interface';

export default async function PropertyDetailsPage({
	params,
	searchParams,
}: PropertyDetailsPageProps) {
	const { slug } = await params;
	const property = await getPropertyBySlug(slug);

	const cookieStore = await cookies();
	const locale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || 'es';
	const dictionary = await getDictionary(locale);

	if (!property) {
		// If no property is found by this slug, we assume it's a location route
		// e.g. /properties/punta-cana
		// We format 'punta-cana' to 'punta cana' for the database ilike search
		const locationStr = slug.replace(/-/g, ' ');
		const queryParams = await searchParams;

		const combinedParams = Promise.resolve({
			...queryParams,
			location: locationStr,
		});

		return <PropertiesPage searchParams={combinedParams} />;
	}

	const localizedTitle =
		(property[`title_${locale}` as keyof Property] as string) || property.title;
	const localizedLocation =
		(property[`location_${locale}` as keyof Property] as string) ||
		property.location;

	return (
		<div className='bg-clear-day min-h-screen text-nordic selection:bg-mosque/20'>
			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8'>
					<div className='lg:col-span-8 space-y-4'>
						<PropertyGallery
							images={property.images ?? []}
							title={localizedTitle}
							badge={property.badge}
							imageUrl={property.imageUrl}
						/>
					</div>

					<div className='lg:col-span-4 relative'>
						<div className='sticky top-28 space-y-6'>
							<div className='bg-white p-6 rounded-xl shadow-sm border border-mosque/5'>
								<div className='mb-4'>
									<h1 className='text-4xl font-display font-light text-nordic mb-2'>
										${property.price.toLocaleString()}
										{property.pricePeriod}
									</h1>
									<p className='text-nordic/60 font-medium flex items-center gap-1'>
										<span className='material-icons text-mosque text-sm'>
											location_on
										</span>
										{localizedLocation}
									</p>
								</div>

								<div className='h-px bg-slate-100 my-6'></div>

								<div className='flex items-center gap-4 mb-6'>
									<div className='w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0'>
										<Image
											src='https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w'
											alt='Sarah Jenkins'
											width={56}
											height={56}
											className='object-cover w-full h-full'
										/>
									</div>
									<div>
										<h3 className='font-semibold text-nordic'>Sarah Jenkins</h3>
										<div className='flex items-center gap-1 text-xs text-mosque font-medium'>
											<span className='material-icons text-[14px]'>star</span>
											<span>{dictionary.property_details.top_rated_agent}</span>
										</div>
									</div>
									<div className='ml-auto flex gap-3'>
										<button className='w-12 h-12 rounded-full bg-mosque/10 text-mosque hover:bg-mosque hover:text-white transition-colors flex items-center justify-center'>
											<span className='material-icons'>chat</span>
										</button>
										<button className='w-12 h-12 rounded-full bg-mosque/10 text-mosque hover:bg-mosque hover:text-white transition-colors flex items-center justify-center'>
											<span className='material-icons'>call</span>
										</button>
									</div>
								</div>

								<div className='space-y-3'>
									<button className='w-full bg-mosque hover:bg-primary-hover text-white py-4 px-6 rounded-lg font-medium transition-all shadow-lg shadow-mosque/20 flex items-center justify-center gap-2 group'>
										<span className='material-icons text-xl group-hover:scale-110 transition-transform'>
											calendar_today
										</span>
										{dictionary.property_details.schedule_visit}
									</button>
									<button className='w-full bg-transparent border border-nordic/10 hover:border-mosque text-nordic/80 hover:text-mosque py-4 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2'>
										<span className='material-icons text-xl'>mail_outline</span>
										{dictionary.property_details.contact_agent}
									</button>
								</div>
							</div>

							<div className='bg-white p-2 rounded-xl shadow-sm border border-mosque/5'>
								<PropertyMap
									location={localizedLocation}
									lat={property.lat}
									lng={property.lng}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-12 gap-8 -mt-8'>
					<div className='lg:col-span-8 space-y-8'>
						<div className='bg-white p-8 rounded-xl shadow-sm border border-mosque/5'>
							<h2 className='text-lg font-semibold mb-6 text-nordic'>
								{dictionary.property_details.features}
							</h2>
							<div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
								<div className='flex flex-col items-center justify-center p-4 bg-mosque/5 rounded-lg border border-mosque/10'>
									<span className='material-icons text-mosque text-2xl mb-2'>
										square_foot
									</span>
									<span className='text-xl font-bold text-nordic'>
										{property.area}
									</span>
									<span className='text-xs uppercase tracking-wider text-nordic/50'>
										{dictionary.property_details.square_meters}
									</span>
								</div>
								<div className='flex flex-col items-center justify-center p-4 bg-mosque/5 rounded-lg border border-mosque/10'>
									<span className='material-icons text-mosque text-2xl mb-2'>
										bed
									</span>
									<span className='text-xl font-bold text-nordic'>
										{property.beds}
									</span>
									<span className='text-xs uppercase tracking-wider text-nordic/50'>
										{dictionary.property_details.bedrooms}
									</span>
								</div>
								<div className='flex flex-col items-center justify-center p-4 bg-mosque/5 rounded-lg border border-mosque/10'>
									<span className='material-icons text-mosque text-2xl mb-2'>
										shower
									</span>
									<span className='text-xl font-bold text-nordic'>
										{property.baths}
									</span>
									<span className='text-xs uppercase tracking-wider text-nordic/50'>
										{dictionary.property_details.bathrooms}
									</span>
								</div>
								<div className='flex flex-col items-center justify-center p-4 bg-mosque/5 rounded-lg border border-mosque/10'>
									<span className='material-icons text-mosque text-2xl mb-2'>
										directions_car
									</span>
									<span className='text-xl font-bold text-nordic'>2</span>
									<span className='text-xs uppercase tracking-wider text-nordic/50'>
										{dictionary.property_details.garage}
									</span>
								</div>
							</div>
						</div>

						<div className='bg-white p-8 rounded-xl shadow-sm border border-mosque/5'>
							<h2 className='text-lg font-semibold mb-4 text-nordic'>
								{dictionary.property_details.about}
							</h2>
							<div className='prose prose-slate max-w-none text-nordic/70 leading-relaxed'>
								<p className='mb-4'>
									{dictionary.property_details.desc_1
										.replace('{title}', localizedTitle)
										.replace('{location}', localizedLocation)}
								</p>
								<p>{dictionary.property_details.desc_2}</p>
							</div>
							<button className='mt-4 text-mosque font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all'>
								{dictionary.property_details.read_more}
								<span className='material-icons text-sm'>arrow_forward</span>
							</button>
						</div>

						<div className='bg-white p-8 rounded-xl shadow-sm border border-mosque/5'>
							<h2 className='text-lg font-semibold mb-6 text-nordic'>
								{dictionary.property_details.amenities}
							</h2>
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8'>
								{Object.values(dictionary.property_details.amenities_list).map(
									(amenity, i) => (
										<div
											key={i}
											className='flex items-center gap-3 text-nordic/70'
										>
											<span className='material-icons text-mosque/60 text-sm'>
												check_circle
											</span>
											<span>{amenity as string}</span>
										</div>
									),
								)}
							</div>
						</div>

						<div className='bg-mosque/5 p-6 rounded-xl border border-mosque/10 flex flex-col sm:flex-row items-center justify-between gap-6'>
							<div className='flex items-start gap-4'>
								<div className='p-3 bg-white rounded-full text-mosque shadow-sm'>
									<span className='material-icons'>calculate</span>
								</div>
								<div>
									<h3 className='font-semibold text-nordic'>
										{dictionary.property_details.estimated_payment}
									</h3>
									<p className='text-sm text-nordic/60'>
										{dictionary.property_details.starting_from}{' '}
										<strong className='text-mosque'>
											${Math.floor(property.price / 250).toLocaleString()}/mo
										</strong>{' '}
										{dictionary.property_details.with_down}
									</p>
								</div>
							</div>
							<button className='whitespace-nowrap px-4 py-2 bg-white border border-nordic/10 rounded-lg text-sm font-semibold hover:border-mosque transition-colors text-nordic'>
								{dictionary.property_details.calculate_mortgage}
							</button>
						</div>
					</div>
				</div>
			</main>

			<footer className='bg-white border-t border-slate-200 mt-12 py-12'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6'>
					<div className='text-sm text-nordic/50'>
						© 2023 LuxeEstate Inc. All rights reserved.
					</div>
				</div>
			</footer>
		</div>
	);
}
