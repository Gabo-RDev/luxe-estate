'use client';

interface ProfileStatsProps {
	savedCount: number;
	visitsCount: number;
}

export default function ProfileStats({ savedCount, visitsCount }: ProfileStatsProps) {
	return (
		<div className='flex gap-6 lg:gap-12 bg-white px-8 py-4 rounded-xl shadow-sm border border-nordic/5'>
			<div className='text-center'>
				<div className='text-2xl font-bold text-nordic'>
					{String(savedCount).padStart(2, '0')}
				</div>
				<div className='text-xs uppercase tracking-wider text-nordic/50 font-medium'>
					Saved
				</div>
			</div>
			<div className='w-px bg-nordic/10'></div>
			<div className='text-center'>
				<div className='text-2xl font-bold text-mosque'>
					{String(visitsCount).padStart(2, '0')}
				</div>
				<div className='text-xs uppercase tracking-wider text-nordic/50 font-medium'>
					Visits
				</div>
			</div>
			<div className='w-px bg-nordic/10'></div>
			<div className='text-center'>
				<div className='text-2xl font-bold text-nordic'>0</div>
				<div className='text-xs uppercase tracking-wider text-nordic/50 font-medium'>
					Sold
				</div>
			</div>
		</div>
	);
}
