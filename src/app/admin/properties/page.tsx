import { getAdminProperties } from '@/api/properties.api';
import { PAGE_SIZE } from '@/lib/constants';
import { AdminPropertyHeader } from '@/features/admin/components/AdminPropertyHeader';
import { AdminPropertyStats } from '@/features/admin/components/AdminPropertyStats';
import { AdminPropertyCard } from '@/features/admin/components/AdminPropertyCard';
import { TablePagination } from '@/components/ui/TablePagination';

interface AdminPropertiesPageProps {
	searchParams: Promise<{ page?: string }>;
}

export default async function AdminPropertiesPage({
	searchParams,
}: AdminPropertiesPageProps) {
	const params = await searchParams;
	const parsedPage = parseInt(params.page ?? '', 10);
	const currentPage = Number.isFinite(parsedPage) ? Math.max(1, parsedPage) : 1;

	const {
		data: properties,
		totalPages,
		totalCount,
	} = await getAdminProperties(currentPage, PAGE_SIZE);

	return (
		<div className='bg-clear-day text-nordic min-h-screen flex flex-col font-sans transition-colors'>
			<main
				id='admin-list-top'
				className='grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10'
			>
				<AdminPropertyHeader />

				<AdminPropertyStats
					totalListings={totalCount}
					activeProperties={18} // TODO: Replace with real aggregates if backend supports it
					pendingSale={4}
				/>

				{/* Property List Container */}
				<div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
					{/* Table Header */}
					<div className='hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50/50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
						<div className='col-span-6'>Property Details</div>
						<div className='col-span-2'>Price</div>
						<div className='col-span-2'>Status</div>
						<div className='col-span-2 text-right'>Actions</div>
					</div>

					{/* Property Items */}
					{properties?.map((property) => (
						<AdminPropertyCard
							key={property.id}
							property={property}
						/>
					))}

					{/* Empty State */}
					{(!properties || properties.length === 0) && (
						<div className='text-center py-20 text-nordic/40'>
							<span className='material-icons text-5xl mb-4 opacity-30'>
								holiday_village
							</span>
							<p className='text-sm uppercase tracking-widest font-semibold'>
								No properties found
							</p>
						</div>
					)}

					{/* Pagination */}
					{totalPages > 0 && (
						<TablePagination
							currentPage={currentPage}
							totalPages={totalPages}
							totalResults={totalCount}
							pageSize={PAGE_SIZE}
							scrollTargetId="admin-list-top"
						/>
					)}
				</div>
			</main>
		</div>
	);
}
