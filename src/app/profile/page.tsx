import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getProperties } from '@/api/properties.api';
import { getUserVisits } from '@/app/properties/[slug]/schedule/actions';
import ProfileTabs from '@/features/profile/ProfileTabs';
import ProfileStats from '@/features/profile/ProfileStats';

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

	// Read favorites from cookies to fetch real saved properties
	const cookieStore = await cookies();
	let savedIds: string[] = [];
	try {
		const favCookie = cookieStore.get('favorites')?.value;
		if (favCookie) {
			savedIds = JSON.parse(decodeURIComponent(favCookie));
		}
	} catch (e) {
		console.error('Failed to parse favorites cookie', e);
	}

	// Fetch saved properties and scheduled visits in parallel
	const [savedPropertiesResult, visits] = await Promise.all([
		savedIds.length > 0
			? getProperties(1, 50, { savedIds })
			: Promise.resolve({ data: [] }),
		getUserVisits(),
	]);

	const savedProperties = savedPropertiesResult.data;

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
							<div className='w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-mosque/10 border-4 border-white shadow-lg flex items-center justify-center'>
								<span className='text-mosque text-3xl lg:text-4xl font-bold'>
									{fullName
										.split(' ')
										.map((n: string) => n[0])
										.join('')
										.toUpperCase()
										.slice(0, 2)}
								</span>
							</div>
						)}
					</div>
					<div>
						<h1 className='text-3xl lg:text-4xl font-bold tracking-tight text-nordic mb-2'>
							{fullName}
						</h1>
						<p className='text-nordic/70 font-light flex items-center gap-2'>
							<span className='material-icons text-sm'>location_on</span>{' '}
							{(user.user_metadata?.location as string) || 'Location not set'}
							<span className='mx-2'>•</span>
							Member since {new Date(user.created_at).getFullYear()}
						</p>
					</div>
				</div>
				<ProfileStats
					savedCount={savedIds.length}
					visitsCount={visits.length}
				/>
			</header>

			<ProfileTabs
				savedProperties={savedProperties}
				userEmail={user.email || ''}
				initialVisits={visits}
			/>
		</main>
	);
}
