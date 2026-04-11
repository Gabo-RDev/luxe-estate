import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
	const supabase = await createClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		redirect('/login');
	}

	const { user } = session;
	const fullName =
		user.user_metadata?.full_name || user.user_metadata?.name || 'User';
	const initials = fullName
		.split(' ')
		.map((n: string) => n[0])
		.join('')
		.toUpperCase()
		.slice(0, 2);

	return (
		<main className='flex-1 p-8 lg:p-12 xl:p-16 max-w-7xl mx-auto w-full'>
			<header className='flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16 bg-hint-of-green p-8 rounded-3xl shadow-sm border border-nordic/5'>
				<div className='flex items-center gap-6'>
					<div className='relative group'>
						{user.user_metadata?.avatar_url ? (
							<img
								alt={`Profile portrait of ${fullName}`}
								className='w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-white shadow-lg'
								src={user.user_metadata.avatar_url}
							/>
						) : (
							<img
								alt='Profile portrait of a young woman with a friendly smile'
								className='w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-white shadow-lg'
								data-alt='Profile portrait of a young woman with a friendly smile'
								src='https://lh3.googleusercontent.com/aida-public/AB6AXuAd_ouiePtERQTSfbcLEHNMJhNFxSXP8beK-4DetlBD_G0XENGPBbXjEfk08cNoUsGBoIWZRMRRoQTdL6tgGLyjrYglYUnUw7ce2O3Y6cHRIWZBN2BXU6YPG0jHhit2hPdam7opmhwpFjsGY68pDpCqMVQ6yj3wPulKs2X3PG2UcHOfoCZgt12BZpZ_XHj9-xT3VJHunaR-f6j8HYVS8FrTtKh_io3Iu2E7JIucJmHGGc4J0AF5MISFaObH51sFDruLCdwyyBAC3Cs'
							/>
						)}
						<button className='absolute bottom-0 right-0 w-8 h-8 lg:w-10 lg:h-10 bg-mosque text-white rounded-full flex items-center justify-center hover:bg-nordic transition-colors shadow-md'>
							<span className='material-icons text-sm lg:text-base'>edit</span>
						</button>
					</div>
					<div>
						<h1 className='text-3xl lg:text-4xl font-bold tracking-tight text-nordic mb-2'>
							{fullName === 'User' ? 'Elena Richardson' : fullName}
						</h1>
						<p className='text-nordic/70 font-light flex items-center gap-2'>
							<span className='material-icons text-sm'>location_on</span>{' '}
							{(user.user_metadata?.location as string) || 'San Francisco, CA'}
							<span className='mx-2'>•</span>
							Member since {new Date(user.created_at).getFullYear()}
						</p>
					</div>
				</div>
				<div className='flex gap-6 lg:gap-12 bg-white px-8 py-4 rounded-xl shadow-sm border border-nordic/5'>
					<div className='text-center'>
						<div className='text-2xl font-bold text-nordic'>12</div>
						<div className='text-xs uppercase tracking-wider text-nordic/50 font-medium'>
							Saved
						</div>
					</div>
					<div className='w-px bg-nordic/10'></div>
					<div className='text-center'>
						<div className='text-2xl font-bold text-mosque'>03</div>
						<div className='text-xs uppercase tracking-wider text-nordic/50 font-medium'>
							Visits
						</div>
					</div>
					<div className='w-px bg-nordic/10'></div>
					<div className='text-center'>
						<div className='text-2xl font-bold text-nordic'>1</div>
						<div className='text-xs uppercase tracking-wider text-nordic/50 font-medium'>
							Sold
						</div>
					</div>
				</div>
			</header>
			<div className='flex items-center gap-8 border-b border-nordic/10 mb-10 overflow-x-auto'>
				<button className='pb-4 px-2 text-nordic font-semibold border-b-2 border-mosque transition-colors whitespace-nowrap'>
					Saved Properties
				</button>
				<button className='pb-4 px-2 text-nordic/50 hover:text-nordic font-medium border-b-2 border-transparent hover:border-nordic/20 transition-colors whitespace-nowrap'>
					Scheduled Visits
				</button>
				<button className='pb-4 px-2 text-nordic/50 hover:text-nordic font-medium border-b-2 border-transparent hover:border-nordic/20 transition-colors whitespace-nowrap'>
					Preferences &amp; Settings
				</button>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
				<div className='group bg-surface-light rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-nordic/5'>
					<div className='relative h-64 overflow-hidden'>
						<img
							alt='Modern minimalist house exterior with large glass windows and pool'
							className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
							data-alt='Modern minimalist house exterior with large glass windows and pool'
							src='https://lh3.googleusercontent.com/aida-public/AB6AXuDY5c3oO38DokKCiZGOahYlceVCLTCEuUx4Bd1yPQcJPdx53wvBLx46euxTiwkVIkMqxnDOPflllhhs3ed7UiZy52kwVUTpuXxgdiclfK9Tkqlaqu98vnxcdNwLre6lkqywgPyMOGLnkuvlxbOslzOHa9LCVl43Pow0t65Zo7ISXp7abzdL8WNHVb4YcQojRyANBH_cgg4nxrp-OO14-sUi6Zv57WggKS8Wov9sfZZjqpGwLibOW363ruRNGm28k5JuNa6jPu2iLsU'
						/>
						<div className='absolute top-4 right-4'>
							<button className='w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-mosque shadow-sm hover:bg-white transition-colors'>
								<span className='material-icons'>favorite</span>
							</button>
						</div>
						<div className='absolute bottom-4 left-4 bg-nordic/90 backdrop-blur-sm text-white px-3 py-1 rounded text-sm font-medium'>
							$2,450,000
						</div>
					</div>
					<div className='p-6'>
						<div className='flex items-start justify-between mb-4'>
							<div>
								<h3 className='text-xl font-bold text-nordic mb-1'>
									The Glass Pavilion
								</h3>
								<p className='text-nordic/60 text-sm'>Montecito, California</p>
							</div>
						</div>
						<div className='flex items-center gap-4 text-nordic/70 text-sm border-t border-nordic/10 pt-4'>
							<div className='flex items-center gap-1.5'>
								<span className='material-icons text-base'>bed</span> 4 Beds
							</div>
							<div className='flex items-center gap-1.5'>
								<span className='material-icons text-base'>bathtub</span> 3.5
								Baths
							</div>
							<div className='flex items-center gap-1.5'>
								<span className='material-icons text-base'>square_foot</span>{' '}
								3,200 sqft
							</div>
						</div>
					</div>
				</div>
				<div className='group bg-surface-light rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-nordic/5'>
					<div className='relative h-64 overflow-hidden'>
						<img
							alt='Luxury bright living room with mid-century modern furniture'
							className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
							data-alt='Luxury bright living room with mid-century modern furniture'
							src='https://lh3.googleusercontent.com/aida-public/AB6AXuAWM5ok9o0Mm6XSR8UNo8-uSRfHLg_8kZb_U_2Hn_c8nJwgpTjSs57FUw2rZ8CPr6YCjmgAB9c_A3ir6KmagO7uhin57rUO1LnBTo8WnE8dmr1lL4mjJCk7l-gfZanXQ6fmlFcy-xvfnamkSdnsOw9jmV56tf7UxPzd374M6EnLOMh0E-0mr34lk0lB7u25P5cXqCcA4_K7pypFr-9EdQdr3NvwLIZlANWHrSDONl6vx8zHPe5HziP269xAtPPbUbRuePLd_bbIX18'
						/>
						<div className='absolute top-4 right-4'>
							<button className='w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-mosque shadow-sm hover:bg-white transition-colors'>
								<span className='material-icons'>favorite</span>
							</button>
						</div>
						<div className='absolute bottom-4 left-4 bg-nordic/90 backdrop-blur-sm text-white px-3 py-1 rounded text-sm font-medium'>
							$1,895,000
						</div>
					</div>
					<div className='p-6'>
						<div className='flex items-start justify-between mb-4'>
							<div>
								<h3 className='text-xl font-bold text-nordic mb-1'>
									Modern Loft
								</h3>
								<p className='text-nordic/60 text-sm'>SoHo, New York</p>
							</div>
						</div>
						<div className='flex items-center gap-4 text-nordic/70 text-sm border-t border-nordic/10 pt-4'>
							<div className='flex items-center gap-1.5'>
								<span className='material-icons text-base'>bed</span> 2 Beds
							</div>
							<div className='flex items-center gap-1.5'>
								<span className='material-icons text-base'>bathtub</span> 2
								Baths
							</div>
							<div className='flex items-center gap-1.5'>
								<span className='material-icons text-base'>square_foot</span>{' '}
								1,850 sqft
							</div>
						</div>
					</div>
				</div>
				<div className='group bg-surface-light rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-nordic/5'>
					<div className='relative h-64 overflow-hidden'>
						<img
							alt='Contemporary dark grey house facade surrounded by greenery'
							className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
							data-alt='Contemporary dark grey house facade surrounded by greenery'
							src='https://lh3.googleusercontent.com/aida-public/AB6AXuDv4b1Zc2wOTyM6fvVjsphfw0-uEDRN7o42ckLRR-fHYPwxM74HEHwQF2N3KB661cBYBx2AP4ZgROqms4o-QZOhFbNSSb3PAGpLG5jg3v1V8TMmiHUbG07yDRkHAm9L2mOzl4EQYyRntpdLn9j-jRyS0uQ8FIYIq3QlCN7348LexMmmyPrJ70RxH5X4EsN8Ij7ZVcXKEWftSUBKAfHLZK1-XxSV4pczQxzOv6670_gWowJL74RL0wwW1W7s_bxeU4KAh7dq6BfVSQ8'
						/>
						<div className='absolute top-4 right-4'>
							<button className='w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-mosque shadow-sm hover:bg-white transition-colors'>
								<span className='material-icons'>favorite</span>
							</button>
						</div>
						<div className='absolute bottom-4 left-4 bg-nordic/90 backdrop-blur-sm text-white px-3 py-1 rounded text-sm font-medium'>
							$3,100,000
						</div>
					</div>
					<div className='p-6'>
						<div className='flex items-start justify-between mb-4'>
							<div>
								<h3 className='text-xl font-bold text-nordic mb-1'>
									Forest Retreat
								</h3>
								<p className='text-nordic/60 text-sm'>Portland, Oregon</p>
							</div>
						</div>
						<div className='flex items-center gap-4 text-nordic/70 text-sm border-t border-nordic/10 pt-4'>
							<div className='flex items-center gap-1.5'>
								<span className='material-icons text-base'>bed</span> 5 Beds
							</div>
							<div className='flex items-center gap-1.5'>
								<span className='material-icons text-base'>bathtub</span> 4
								Baths
							</div>
							<div className='flex items-center gap-1.5'>
								<span className='material-icons text-base'>square_foot</span>{' '}
								4,500 sqft
							</div>
						</div>
					</div>
				</div>
			</div>
			<section className='mt-16'>
				<h2 className='text-2xl font-bold text-nordic mb-8 flex items-center gap-3'>
					<span className='w-2 h-8 bg-mosque rounded-full'></span>
					Upcoming Visits
				</h2>
				<div className='space-y-4'>
					<div className='flex flex-col md:flex-row bg-surface-light p-2 rounded-xl border border-nordic/5 items-center hover:bg-white transition-colors shadow-sm'>
						<div className='w-full md:w-48 h-32 md:h-24 rounded-lg overflow-hidden shrink-0 relative'>
							<img
								alt='Luxury apartment interior thumbnail'
								className='w-full h-full object-cover'
								data-alt='Luxury apartment interior thumbnail'
								src='https://lh3.googleusercontent.com/aida-public/AB6AXuDbWcpoQleagULcmldgmrlfj9wO_hTkyxSN2soRsjPwGPILgQ7miBurdDq_sOTvp9NP99rOpDjAen_Lec52eOxB72vD3mmBBIIoauoXXkp74OCgeLULtcOa-cClPz1MgtpUisMTgbJa7VKYGOt6AMW1I8YY62-O5fVxs3aAk3DpXM_dN70ECGYEIwUd77bJGJPs6ZSJNlG7eBDzEcSmoF626ltyTqqMCGZ1elTbYDhXZSDEmuPR9lfVHvhvXxDyoRpz44L-srMZJE4'
							/>
							<div className='absolute inset-0 bg-nordic/10'></div>
						</div>
						<div className='flex-1 p-4 flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4'>
							<div>
								<div className='flex items-center gap-2 text-mosque font-semibold text-sm mb-1 uppercase tracking-wide'>
									<span className='material-icons text-base'>
										calendar_today
									</span>{' '}
									Oct 24, 2:00 PM
								</div>
								<h4 className='text-lg font-bold text-nordic'>
									Skyline Penthouse Tour
								</h4>
								<p className='text-nordic/60 text-sm flex items-center gap-1 mt-1'>
									<span className='material-icons text-sm'>person</span> Agent:
									Sarah Jenkins
								</p>
							</div>
							<div className='flex gap-3 w-full md:w-auto'>
								<button className='flex-1 md:flex-none px-5 py-2.5 rounded-lg border border-nordic/10 text-nordic hover:bg-nordic/5 transition-colors text-sm font-medium'>
									Reschedule
								</button>
								<button className='flex-1 md:flex-none px-5 py-2.5 rounded-lg bg-mosque text-white hover:bg-nordic transition-colors text-sm font-medium shadow-sm shadow-mosque/30'>
									Get Directions
								</button>
							</div>
						</div>
					</div>
					<div className='flex flex-col md:flex-row bg-surface-light p-2 rounded-xl border border-nordic/5 items-center hover:bg-white transition-colors shadow-sm'>
						<div className='w-full md:w-48 h-32 md:h-24 rounded-lg overflow-hidden shrink-0 relative'>
							<img
								alt='Suburban modern home exterior thumbnail'
								className='w-full h-full object-cover'
								data-alt='Suburban modern home exterior thumbnail'
								src='https://lh3.googleusercontent.com/aida-public/AB6AXuDIiSwAxuRI3m0TUGBHaJW2w44OhWllfvhzDc3l8UgkD5XTevLFqUsybpArCBkQeepEIPn4yDOSOpcMv7qjyfZh2OGk7zAosHg8c5uataTwQI3B2Uomnqc9U1joCX_xLPkLtp2JU_oE5sWFH5DgFXvitu0wn5FyyYDkwlAb8We8-VnKA0cgIcplNZD0xn3F3rjV3LqFYFSdGjdOllhqvkGkO5D5YXR7-IkDFsLe9zkBSFPhnvEJ4BKsZlr9InSux74IZ_gdMkPalmM'
							/>
							<div className='absolute inset-0 bg-nordic/10'></div>
						</div>
						<div className='flex-1 p-4 flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4'>
							<div>
								<div className='flex items-center gap-2 text-mosque font-semibold text-sm mb-1 uppercase tracking-wide'>
									<span className='material-icons text-base'>
										calendar_today
									</span>{' '}
									Oct 28, 10:30 AM
								</div>
								<h4 className='text-lg font-bold text-nordic'>
									Lakeside Manor Viewing
								</h4>
								<p className='text-nordic/60 text-sm flex items-center gap-1 mt-1'>
									<span className='material-icons text-sm'>person</span> Agent:
									Michael Ross
								</p>
							</div>
							<div className='flex gap-3 w-full md:w-auto'>
								<button className='flex-1 md:flex-none px-5 py-2.5 rounded-lg border border-nordic/10 text-nordic hover:bg-nordic/5 transition-colors text-sm font-medium'>
									Reschedule
								</button>
								<button className='flex-1 md:flex-none px-5 py-2.5 rounded-lg bg-mosque text-white hover:bg-nordic transition-colors text-sm font-medium shadow-sm shadow-mosque/30'>
									Get Directions
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className='mt-16 bg-surface-light rounded-2xl p-8 border border-nordic/5'>
				<div className='flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8'>
					<div>
						<h2 className='text-xl font-bold text-nordic'>
							Account Preferences
						</h2>
						<p className='text-nordic/50 text-sm mt-1'>
							Manage your account settings and email preferences
						</p>
					</div>
					<button className='text-mosque font-medium text-sm hover:underline'>
						View all settings
					</button>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					<div>
						<label className='block text-xs font-bold text-nordic/40 uppercase tracking-wider mb-2'>
							Email Address
						</label>
						<div className='flex items-center gap-3 p-3 bg-clear-day rounded-lg border border-nordic/10'>
							<span className='material-icons text-nordic/40'>mail</span>
							<input
								className='bg-transparent border-none outline-none flex-1 text-nordic text-sm focus:ring-0 w-full'
								readOnly={true}
								type='email'
								value={user.email || 'elena.richardson@example.com'}
							/>
							<button className='text-xs text-mosque font-medium'>
								Change
							</button>
						</div>
					</div>
					<div>
						<label className='block text-xs font-bold text-nordic/40 uppercase tracking-wider mb-2'>
							Notifications
						</label>
						<div className='flex items-center justify-between p-3 bg-clear-day rounded-lg border border-nordic/10 h-[50px]'>
							<span className='text-sm text-nordic'>New Property Alerts</span>
							<label className='relative inline-flex items-center cursor-pointer'>
								<input
									defaultChecked={true}
									className='sr-only peer'
									type='checkbox'
									value=''
								/>
								<div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-mosque"></div>
							</label>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
