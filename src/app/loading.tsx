import PropertyGridSkeleton from '@/features/properties/components/PropertyGridSkeleton';

export default function GlobalLoading() {
	return (
		<div className="min-h-screen bg-clear-day pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
			<div className="mb-8 animate-pulse">
				<div className="h-10 bg-nordic/10 rounded w-1/4 mb-4"></div>
				<div className="h-4 bg-nordic/5 rounded w-2/4"></div>
			</div>
			<PropertyGridSkeleton />
		</div>
	);
}
