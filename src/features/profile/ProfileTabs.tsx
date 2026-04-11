'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/interfaces/Property.interface';
import { cancelVisit } from '@/app/properties/[slug]/schedule/actions';

interface ScheduledVisit {
	id: string;
	property_id: string;
	property_title: string;
	visit_date: string;
	visit_time: string;
	message: string | null;
	status: string;
	created_at: string;
}

interface ProfileTabsProps {
	savedProperties: Property[];
	userEmail: string;
	initialVisits: ScheduledVisit[];
}

const TABS = [
	'Saved Properties',
	'Scheduled Visits',
	'Preferences & Settings',
] as const;
type TabName = (typeof TABS)[number];

function formatVisitDate(dateStr: string) {
	const d = new Date(dateStr + 'T00:00:00');
	return d.toLocaleDateString('en-US', {
		weekday: 'short',
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
}

export default function ProfileTabs({
	savedProperties,
	userEmail,
	initialVisits,
}: ProfileTabsProps) {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState<TabName>('Saved Properties');
	const [visits, setVisits] = useState<ScheduledVisit[]>(initialVisits);
	const [cancellingId, setCancellingId] = useState<string | null>(null);
	const [notificationsEnabled, setNotificationsEnabled] = useState(true);

	const handleCancelVisit = async (visitId: string) => {
		setCancellingId(visitId);
		try {
			const result = await cancelVisit(visitId);
			if (result.success) {
				// Optimistic removal
				setVisits((prev) => prev.filter((v) => v.id !== visitId));
				router.refresh();
			}
		} catch (e) {
			console.error('Failed to cancel visit', e);
		} finally {
			setCancellingId(null);
		}
	};

	return (
		<>
			{/* Tab Navigation */}
			<div className='flex items-center gap-8 border-b border-nordic/10 mb-10 overflow-x-auto'>
				{TABS.map((tab) => (
					<button
						key={tab}
						onClick={() => setActiveTab(tab)}
						className={`pb-4 px-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
							activeTab === tab
								? 'text-nordic font-semibold border-mosque'
								: 'text-nordic/50 hover:text-nordic border-transparent hover:border-nordic/20'
						}`}
					>
						{tab}
					</button>
				))}
			</div>

			{/* Tab Content */}
			{activeTab === 'Saved Properties' && (
				<div className='animate-fade-slide-up'>
					{savedProperties.length === 0 ? (
						<div className='text-center py-16'>
							<div className='w-20 h-20 rounded-full bg-hintgreen flex items-center justify-center mx-auto mb-6'>
								<span className='material-icons text-mosque text-4xl'>
									favorite_border
								</span>
							</div>
							<h3 className='text-xl font-bold text-nordic mb-2'>
								No Saved Properties
							</h3>
							<p className='text-nordic/60 mb-6 max-w-md mx-auto'>
								Start exploring and save properties you love to see them here.
							</p>
							<Link
								href='/properties'
								className='inline-flex items-center gap-2 px-6 py-3 bg-mosque text-white rounded-lg font-medium shadow-lg shadow-mosque/20 hover:shadow-mosque/40 transition-all'
							>
								<span className='material-icons text-base'>search</span>
								Browse Properties
							</Link>
						</div>
					) : (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
							{savedProperties.map((property) => (
								<Link
									key={property.id}
									href={`/properties/${property.slug}`}
									className='group bg-surface-light rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-nordic/5'
								>
									<div className='relative h-64 overflow-hidden'>
										{property.imageUrl ? (
											<Image
												alt={property.title}
												className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
												src={property.imageUrl}
												fill
												sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
											/>
										) : (
											<div className='absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-300 bg-gray-100'>
												<span className='material-icons text-5xl'>home</span>
												<span className='text-xs font-medium'>No image</span>
											</div>
										)}
										<div className='absolute bottom-4 left-4 bg-nordic/90 backdrop-blur-sm text-white px-3 py-1 rounded text-sm font-medium'>
											${property.price.toLocaleString('en-US')}
										</div>
									</div>
									<div className='p-6'>
										<div className='flex items-start justify-between mb-4'>
											<div>
												<h3 className='text-xl font-bold text-nordic mb-1'>
													{property.title}
												</h3>
												<p className='text-nordic/60 text-sm'>
													{property.location}
												</p>
											</div>
										</div>
										<div className='flex items-center gap-4 text-nordic/70 text-sm border-t border-nordic/10 pt-4'>
											<div className='flex items-center gap-1.5'>
												<span className='material-icons text-base'>bed</span>{' '}
												{property.beds} Beds
											</div>
											<div className='flex items-center gap-1.5'>
												<span className='material-icons text-base'>
													bathtub
												</span>{' '}
												{property.baths} Baths
											</div>
											<div className='flex items-center gap-1.5'>
												<span className='material-icons text-base'>
													square_foot
												</span>{' '}
												{property.area} m²
											</div>
										</div>
									</div>
								</Link>
							))}
						</div>
					)}
				</div>
			)}

			{activeTab === 'Scheduled Visits' && (
				<div className='animate-fade-slide-up'>
					{visits.length === 0 ? (
						<div className='text-center py-16'>
							<div className='w-20 h-20 rounded-full bg-hintgreen flex items-center justify-center mx-auto mb-6'>
								<span className='material-icons text-mosque text-4xl'>
									calendar_today
								</span>
							</div>
							<h3 className='text-xl font-bold text-nordic mb-2'>
								No Scheduled Visits
							</h3>
							<p className='text-nordic/60 mb-6 max-w-md mx-auto'>
								When you schedule a property visit, it will appear here.
							</p>
							<Link
								href='/properties'
								className='inline-flex items-center gap-2 px-6 py-3 bg-mosque text-white rounded-lg font-medium shadow-lg shadow-mosque/20 hover:shadow-mosque/40 transition-all'
							>
								<span className='material-icons text-base'>search</span>
								Find a Property
							</Link>
						</div>
					) : (
						<div className='space-y-4'>
							{visits.map((visit, index) => (
								<div
									key={visit.id}
									className='flex flex-col md:flex-row bg-surface-light p-4 md:p-2 rounded-xl border border-nordic/5 items-start md:items-center hover:bg-white transition-colors shadow-sm gap-4'
								>
									<div className='w-full md:w-48 h-20 md:h-20 rounded-lg overflow-hidden shrink-0 relative bg-hintgreen flex items-center justify-center'>
										<span className='material-icons text-mosque text-3xl'>
											home
										</span>
									</div>
									<div className='flex-1 p-2 md:p-4 flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4'>
										<div>
											<div className='flex items-center gap-2 text-mosque font-semibold text-sm mb-1 uppercase tracking-wide'>
												<span className='material-icons text-base'>
													calendar_today
												</span>
												{formatVisitDate(visit.visit_date)}, {visit.visit_time}
											</div>
											<h4 className='text-lg font-bold text-nordic'>
												{visit.property_title}
											</h4>
											{visit.message && (
												<p className='text-nordic/60 text-sm flex items-center gap-1 mt-1'>
													<span className='material-icons text-sm'>chat</span>
													{visit.message}
												</p>
											)}
										</div>
										<div className='flex gap-3 w-full md:w-auto'>
											<button
												onClick={() => handleCancelVisit(visit.id)}
												disabled={cancellingId === visit.id}
												className='flex-1 md:flex-none px-5 py-2.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors text-sm font-medium disabled:opacity-50'
											>
												{cancellingId === visit.id ? 'Cancelling...' : 'Cancel'}
											</button>
											<Link
												href={`/properties`}
												className='flex-1 md:flex-none px-5 py-2.5 rounded-lg bg-mosque text-white hover:bg-nordic transition-colors text-sm font-medium shadow-sm shadow-mosque/30 text-center'
											>
												View Property
											</Link>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			)}

			{activeTab === 'Preferences & Settings' && (
				<div className='animate-fade-slide-up'>
					<section className='bg-surface-light rounded-2xl p-8 border border-nordic/5'>
						<div className='flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8'>
							<div>
								<h2 className='text-xl font-bold text-nordic'>
									Account Preferences
								</h2>
								<p className='text-nordic/50 text-sm mt-1'>
									Manage your account settings and email preferences
								</p>
							</div>
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
										readOnly
										type='email'
										value={userEmail}
									/>
								</div>
							</div>
							<div>
								<label className='block text-xs font-bold text-nordic/40 uppercase tracking-wider mb-2'>
									Notifications
								</label>
								<div className='flex items-center justify-between p-3 bg-clear-day rounded-lg border border-nordic/10 h-12.5'>
									<span className='text-sm text-nordic'>
										New Property Alerts
									</span>
									<label className='relative inline-flex items-center cursor-pointer'>
										<input
											checked={notificationsEnabled}
											onChange={() => setNotificationsEnabled((v) => !v)}
											className='sr-only peer'
											type='checkbox'
										/>
										<div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-mosque"></div>
									</label>
								</div>
							</div>
						</div>
					</section>
				</div>
			)}
		</>
	);
}
