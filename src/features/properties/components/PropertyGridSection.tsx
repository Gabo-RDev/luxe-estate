import { getProperties, PAGE_SIZE } from '@/features/properties/properties.api';
import PropertyGrid from '@/features/properties/components/PropertyGrid';
import Pagination from '@/components/ui/Pagination';
import { Suspense } from 'react';

interface PropertyGridSectionProps {
	currentPage: number;
}

// Skeleton that matches the 3-column grid for a smooth loading state
function PropertyGridSkeleton() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{Array.from({ length: 9 }).map((_, i) => (
				<div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-nordic/5 animate-pulse">
					<div className="aspect-4/3 bg-slate-200" />
					<div className="p-4 space-y-3">
						<div className="h-4 bg-slate-200 rounded w-3/4" />
						<div className="h-3 bg-slate-100 rounded w-1/2" />
						<div className="h-3 bg-slate-100 rounded w-2/3" />
					</div>
				</div>
			))}
		</div>
	);
}

async function GridWithData({ currentPage }: { currentPage: number }) {
	const { data: properties, totalPages } = await getProperties(currentPage, PAGE_SIZE);

	return (
		<>
			<PropertyGrid properties={properties} currentPage={currentPage} />
			<Suspense fallback={null}>
				<Pagination currentPage={currentPage} totalPages={totalPages} />
			</Suspense>
		</>
	);
}

export default function PropertyGridSection({ currentPage }: PropertyGridSectionProps) {
	return (
		<Suspense fallback={<PropertyGridSkeleton />}>
			<GridWithData currentPage={currentPage} />
		</Suspense>
	);
}
