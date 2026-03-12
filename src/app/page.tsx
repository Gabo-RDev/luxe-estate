import { Suspense } from 'react';
import Pagination from '@/components/ui/Pagination';
import { PropertyGrid, SearchHero, PropertyCard } from '@/features/properties/components';
import Navigation from '@/components/layout/Navigation';
import {
	getFeaturedProperties,
	getProperties,
	PAGE_SIZE,
} from '@/features/properties/properties.api';

interface HomeProps {
	searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
	const params = await searchParams;
	const parsedPage = parseInt(params.page ?? '', 10);
	const currentPage = Number.isFinite(parsedPage) ? Math.max(1, parsedPage) : 1;

	// Both calls happen in parallel on the server
	const [featuredProperties, { data: newProperties, totalPages }] =
		await Promise.all([
			getFeaturedProperties(),
			getProperties(currentPage, PAGE_SIZE),
		]);

	return (
		<div className='min-h-screen'>
			<Navigation />

			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20'>
				<SearchHero />

				{/* Featured Collections */}
				<section className='mb-16'>
					<div className='flex items-end justify-between mb-8'>
						<div>
							<h2 className='text-2xl font-light text-nordic'>
								Featured Collections
							</h2>
							<p className='text-nordic/70 mt-1 text-sm'>
								Curated properties for the discerning eye.
							</p>
						</div>
						<a
							className='hidden sm:flex items-center gap-1 text-sm font-medium text-mosque hover:opacity-70 transition-opacity'
							href='#'
						>
							View all{' '}
							<span className='material-icons text-sm'>arrow_forward</span>
						</a>
					</div>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
						{featuredProperties.map((property) => (
							<PropertyCard
								key={property.id}
								property={property}
								featuredMode={true}
							/>
						))}
					</div>
				</section>

				{/* New in Market — id used for smooth scroll target */}
				<section id='new-in-market'>
					<div className='flex items-end justify-between mb-8'>
						<div>
							<h2 className='text-2xl font-light text-nordic'>New in Market</h2>
							<p className='text-nordic/70 mt-1 text-sm'>
								Fresh opportunities added this week.
							</p>
						</div>
						<div className='hidden md:flex bg-white p-1 rounded-lg shadow-sm border border-nordic/5'>
							<button className='px-4 py-1.5 rounded-md text-sm font-medium bg-nordic text-white'>
								All
							</button>
							<button className='px-4 py-1.5 rounded-md text-sm font-medium text-nordic/70 hover:text-nordic'>
								Buy
							</button>
							<button className='px-4 py-1.5 rounded-md text-sm font-medium text-nordic/70 hover:text-nordic'>
								Rent
							</button>
						</div>
					</div>

					{/* Client wrapper: handles fade animation + scroll-to-section on page change */}
					<PropertyGrid
						properties={newProperties}
						currentPage={currentPage}
					/>

					{/* Pagination — scroll={false} on all Links to avoid jump-to-top */}
					<Suspense fallback={null}>
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
						/>
					</Suspense>
				</section>
			</main>
		</div>
	);
}
