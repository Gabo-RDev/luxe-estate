import { getPropertyBySlug } from '@/api/properties.api';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { Locale } from '@/types/I18n';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { Property } from '@/interfaces/Property.interface';

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
		<div className='bg-clear-day dark:bg-background-dark min-h-screen flex flex-col antialiased selection:bg-mosque/20 selection:text-mosque'>
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

				<div className='w-full max-w-6xl bg-white dark:bg-[#162e2a] rounded-xl shadow-2xl shadow-mosque/5 overflow-hidden flex flex-col md:flex-row border border-slate-100 dark:border-slate-800'>
					{/* Left Column: Property Summary */}
					<div className='w-full md:w-5/12 bg-slate-50 dark:bg-[#112522] p-6 md:p-8 lg:p-10 flex flex-col gap-6 relative'>
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
							<div className='absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase text-mosque'>
								{property.listingType === 'rent' ? 'For Rent' : 'For Sale'}
							</div>
						</div>
						<div className='space-y-4 z-10'>
							<div>
								<h2 className='text-2xl font-bold text-nordic dark:text-white leading-tight'>
									{localizedTitle}
								</h2>
								<p className='text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1 text-sm'>
									<span className='material-icons text-base'>location_on</span>
									{localizedLocation}
								</p>
							</div>
							<div className='flex items-center justify-between py-4 border-y border-slate-200 dark:border-slate-700'>
								<div className='flex flex-col'>
									<span className='text-xs text-slate-400 uppercase tracking-wider font-medium'>
										Price
									</span>
									<span className='text-xl font-bold text-mosque'>
										${property.price.toLocaleString()}
										{property.pricePeriod}
									</span>
								</div>
								<div className='flex items-center gap-4 text-slate-600 dark:text-slate-300'>
									<div className='flex flex-col items-center'>
										<span className='material-icons text-slate-400'>bed</span>
										<span className='text-xs font-medium'>{property.beds}</span>
									</div>
									<div className='w-px h-8 bg-slate-200 dark:bg-slate-700'></div>
									<div className='flex flex-col items-center'>
										<span className='material-icons text-slate-400'>
											shower
										</span>
										<span className='text-xs font-medium'>
											{property.baths}
										</span>
									</div>
									<div className='w-px h-8 bg-slate-200 dark:bg-slate-700'></div>
									<div className='flex flex-col items-center'>
										<span className='material-icons text-slate-400'>
											square_foot
										</span>
										<span className='text-xs font-medium'>
											{property.area}{' '}
											{dictionary.property_details?.square_meters || 'sqft'}
										</span>
									</div>
								</div>
							</div>
							<div className='flex items-center gap-3 pt-2'>
								<div className='relative w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm shrink-0'>
									<Image
										src='https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w'
										alt='Host'
										fill
										className='object-cover'
									/>
								</div>
								<div>
									<p className='text-sm text-slate-500 dark:text-slate-400 font-medium'>
										Hosted by
									</p>
									<p className='text-nordic dark:text-white font-semibold'>
										Sarah Jenkins
									</p>
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

					{/* Right Column: Scheduling */}
					<div className='w-full md:w-7/12 p-6 md:p-8 lg:p-10 flex flex-col justify-between'>
						<div>
							<h1 className='text-3xl font-bold text-nordic dark:text-white mb-2'>
								Schedule a Viewing
							</h1>
							<p className='text-slate-500 dark:text-slate-400 mb-8'>
								Choose a date and time to tour the property in person.
							</p>

							<div className='mb-8'>
								<div className='flex items-center justify-between mb-4'>
									<h3 className='text-sm font-semibold text-nordic dark:text-white uppercase tracking-wider'>
										October 2023
									</h3>
									<div className='flex gap-1'>
										<button className='p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-mosque transition-colors'>
											<span className='material-icons text-lg'>
												chevron_left
											</span>
										</button>
										<button className='p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-nordic dark:text-white hover:text-mosque transition-colors'>
											<span className='material-icons text-lg'>
												chevron_right
											</span>
										</button>
									</div>
								</div>
								<div className='grid grid-cols-7 gap-y-2 gap-x-1 text-center mb-6'>
									<div className='text-xs font-medium text-slate-400 py-2'>
										Mon
									</div>
									<div className='text-xs font-medium text-slate-400 py-2'>
										Tue
									</div>
									<div className='text-xs font-medium text-slate-400 py-2'>
										Wed
									</div>
									<div className='text-xs font-medium text-slate-400 py-2'>
										Thu
									</div>
									<div className='text-xs font-medium text-slate-400 py-2'>
										Fri
									</div>
									<div className='text-xs font-medium text-slate-400 py-2'>
										Sat
									</div>
									<div className='text-xs font-medium text-slate-400 py-2'>
										Sun
									</div>
									<button className='text-sm text-slate-300 dark:text-slate-600 py-2 rounded-lg cursor-not-allowed'>
										28
									</button>
									<button className='text-sm text-slate-300 dark:text-slate-600 py-2 rounded-lg cursor-not-allowed'>
										29
									</button>
									<button className='text-sm text-slate-300 dark:text-slate-600 py-2 rounded-lg cursor-not-allowed'>
										30
									</button>
									<button className='text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 py-2 rounded-lg transition-colors'>
										1
									</button>
									<button className='text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 py-2 rounded-lg transition-colors'>
										2
									</button>
									<button className='text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 py-2 rounded-lg transition-colors'>
										3
									</button>
									<button className='text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 py-2 rounded-lg transition-colors'>
										4
									</button>
									<button className='text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 py-2 rounded-lg transition-colors'>
										5
									</button>
									<button className='text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 py-2 rounded-lg transition-colors'>
										6
									</button>
									<button className='text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 py-2 rounded-lg transition-colors'>
										7
									</button>
									<button className='relative bg-mosque text-white font-semibold shadow-lg shadow-mosque/30 py-2 rounded-lg transform scale-105'>
										8
										<span className='absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full'></span>
									</button>
									<button className='text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 py-2 rounded-lg transition-colors'>
										9
									</button>
									<button className='text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 py-2 rounded-lg transition-colors'>
										10
									</button>
									<button className='text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 py-2 rounded-lg transition-colors'>
										11
									</button>
								</div>
							</div>

							<div className='mb-8'>
								<h3 className='text-sm font-semibold text-nordic dark:text-white uppercase tracking-wider mb-4'>
									Available Times
								</h3>
								<div className='grid grid-cols-3 sm:grid-cols-4 gap-3'>
									<button className='border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 py-2 px-3 rounded-lg text-sm hover:border-mosque hover:text-mosque transition-all'>
										09:00 AM
									</button>
									<button className='border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 py-2 px-3 rounded-lg text-sm hover:border-mosque hover:text-mosque transition-all'>
										09:30 AM
									</button>
									<button className='bg-mosque/10 border border-mosque text-mosque font-medium py-2 px-3 rounded-lg text-sm shadow-sm'>
										10:00 AM
									</button>
									<button className='border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 py-2 px-3 rounded-lg text-sm hover:border-mosque hover:text-mosque transition-all'>
										10:30 AM
									</button>
									<button className='border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 py-2 px-3 rounded-lg text-sm hover:border-mosque hover:text-mosque transition-all'>
										11:30 AM
									</button>
									<button className='border border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 py-2 px-3 rounded-lg text-sm cursor-not-allowed opacity-50 decoration-slate-400 line-through'>
										01:00 PM
									</button>
									<button className='border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 py-2 px-3 rounded-lg text-sm hover:border-mosque hover:text-mosque transition-all'>
										02:00 PM
									</button>
									<button className='border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 py-2 px-3 rounded-lg text-sm hover:border-mosque hover:text-mosque transition-all'>
										03:30 PM
									</button>
								</div>
							</div>

							<div className='mb-8'>
								<label
									htmlFor='message'
									className='block text-sm font-semibold text-nordic dark:text-white uppercase tracking-wider mb-2'
								>
									Message for the agent{' '}
									<span className='text-slate-400 font-normal normal-case ml-1'>
										(Optional)
									</span>
								</label>
								<textarea
									id='message'
									rows={3}
									placeholder='Any specific questions or requests?'
									className='w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#112522] text-nordic dark:text-slate-200 placeholder:text-slate-400 focus:ring-1 focus:ring-mosque focus:border-mosque transition-shadow resize-none text-sm'
								></textarea>
							</div>
						</div>

						<div className='pt-6 border-t border-slate-100 dark:border-slate-700 flex items-center justify-end gap-4'>
							<Link href={`/properties/${p.slug}`}>
								<button className='text-slate-500 dark:text-slate-400 hover:text-nordic dark:hover:text-white font-medium px-4 py-2 text-sm transition-colors'>
									Cancel
								</button>
							</Link>
							<button className='bg-mosque hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg shadow-lg shadow-mosque/20 transition-all hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-sm flex items-center gap-2'>
								<span>Confirm Visit</span>
								<span className='material-icons text-sm'>arrow_forward</span>
							</button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
