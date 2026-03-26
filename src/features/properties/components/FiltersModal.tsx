'use client';

import { startTransition, useCallback } from 'react';
import { AMENITIES_LIST, PRICE_BOUNDS } from '@/lib/constants';
import { formatPrice } from '@/utils/formatters';
import { useI18n } from '@/lib/i18n/i18n-context';
import { useFiltersModal } from '@/hooks/useFiltersModal';

import { FiltersModalProps } from '@/interfaces/FiltersModalProps.interface';

export default function FiltersModal({ isOpen, onClose }: FiltersModalProps) {
	const { dictionary } = useI18n();
	const {
		state,
		dispatch,
		minPct,
		maxPct,
		rangePct,
		handleApplyFilters,
		handleClearFilters,
	} = useFiltersModal(isOpen, onClose);
	const { location, minPrice, maxPrice, propertyType, beds, baths, amenities } =
		state;

	const handleToggleAmenity = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({ type: 'TOGGLE_AMENITY', payload: e.target.value });
	}, [dispatch]);

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center p-4 transition-all'>
			{/* Modal Overlay */}
			<div
				className='fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity cursor-pointer'
				onClick={onClose}
			></div>

			{/* Main Modal Container */}
			<div className='relative z-20 w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] font-display text-gray-800 animate-in fade-in zoom-in duration-200'>
				{/* Header */}
				<header className='px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-30'>
					<h1 className='text-2xl font-semibold tracking-tight text-gray-900 '>
						{dictionary.filters.title}
					</h1>
					<button
						onClick={onClose}
						className='w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500 cursor-pointer'
						aria-label='Close filters'
					>
						<span className='material-icons'>close</span>
					</button>
				</header>

				{/* Scrollable Content */}
				<div className='flex-1 overflow-y-auto p-8 space-y-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
					{/* Section 1: Location */}
					<section>
						<label className='block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3'>
							{dictionary.filters.location}
						</label>
						<div className='relative group'>
							<span className='material-icons absolute left-4 top-3.5 text-gray-400 group-focus-within:text-[#006611] transition-colors'>
								location_on
							</span>
							<input
								className='w-full pl-12 pr-4 py-3 bg-[#f5f8f6] border-0 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#006611] focus:bg-white transition-all shadow-sm'
								placeholder={dictionary.filters.location_placeholder}
								type='text'
								value={location}
								onChange={(e) =>
									dispatch({ type: 'SET_LOCATION', payload: e.target.value })
								}
							/>
						</div>
					</section>

					{/* Section 2: Price Range */}
					<section>
						<div className='flex justify-between items-end mb-4'>
							<label className='block text-xs font-semibold text-gray-500 uppercase tracking-wider'>
								{dictionary.filters.price_range}
							</label>
							<span className='text-sm font-medium text-[#006611]'>
								{formatPrice(minPrice)} – {formatPrice(maxPrice)}
							</span>
						</div>

						{/* Double Range Slider Implementation */}
						<div className='relative h-12 flex items-center mb-6 px-3 group'>
							<div className='absolute left-3 right-3 h-1 bg-gray-200 rounded-full'>
								<div
									className='absolute h-full bg-[#006611] rounded-full'
									style={{
										left: `${minPct}%`,
										width: `${rangePct}%`,
									}}
								></div>
								{/* Visual handles */}
								<div
									className='absolute w-6 h-6 bg-white border-2 border-[#006611] rounded-full shadow-md pointer-events-none transition-transform z-10'
									style={{
										left: `calc(${minPct}% - 12px)`,
										top: '50%',
										transform: 'translateY(-50%)',
									}}
								></div>
								<div
									className='absolute w-6 h-6 bg-white border-2 border-[#006611] rounded-full shadow-md pointer-events-none transition-transform z-10'
									style={{
										left: `calc(${maxPct}% - 12px)`,
										top: '50%',
										transform: 'translateY(-50%)',
									}}
								></div>
							</div>
							{/* Min Range Input */}
							<input
								type='range'
								min={PRICE_BOUNDS.MIN}
								max={PRICE_BOUNDS.MAX}
								step={PRICE_BOUNDS.STEP}
								value={minPrice}
								onChange={(e) =>
									startTransition(() => {
										dispatch({
											type: 'SET_MIN_PRICE',
											payload: Math.min(
												Number(e.target.value),
												maxPrice - PRICE_BOUNDS.GAP,
											),
										})
									})
								}
								style={{ pointerEvents: 'none' }}
								className={`absolute left-0 w-full h-1 opacity-0 appearance-none ${minPrice > PRICE_BOUNDS.MAX / 2 ? 'z-20' : 'z-30'} [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6`}
							/>
							{/* Max Range Input */}
							<input
								type='range'
								min={PRICE_BOUNDS.MIN}
								max={PRICE_BOUNDS.MAX}
								step={PRICE_BOUNDS.STEP}
								value={maxPrice}
								onChange={(e) =>
									startTransition(() => {
										dispatch({
											type: 'SET_MAX_PRICE',
											payload: Math.max(
												Number(e.target.value),
												minPrice + PRICE_BOUNDS.GAP,
											),
										})
									})
								}
								style={{ pointerEvents: 'none' }}
								className={`absolute left-0 w-full h-1 opacity-0 appearance-none ${minPrice > PRICE_BOUNDS.MAX / 2 ? 'z-30' : 'z-20'} [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6`}
							/>
						</div>

						<div className='grid grid-cols-2 gap-4'>
							<div className='bg-[#f5f8f6] p-3 rounded-lg border border-transparent focus-within:border-[#006611]/30 transition-colors'>
								<label className='block text-[10px] text-gray-500 uppercase font-medium mb-1'>
									{dictionary.filters.min_price}
								</label>
								<div className='flex items-center'>
									<span className='text-gray-400 mr-1'>$</span>
									<input
										className='w-full bg-transparent border-0 p-0 text-gray-900 font-medium focus:ring-0 text-sm'
										type='number'
										min={0}
										max={PRICE_BOUNDS.MAX}
										value={minPrice || ''}
										onChange={(e) =>
											dispatch({
												type: 'SET_MIN_PRICE',
												payload: Number(e.target.value),
											})
										}
										onBlur={(e) => {
											const val = Number(e.target.value);
											const clamped = Math.max(
												PRICE_BOUNDS.MIN,
												Math.min(val, maxPrice - PRICE_BOUNDS.GAP),
											);
											dispatch({ type: 'SET_MIN_PRICE', payload: clamped });
										}}
									/>
								</div>
							</div>
							<div className='bg-[#f5f8f6] p-3 rounded-lg border border-transparent focus-within:border-[#006611]/30 transition-colors'>
								<label className='block text-[10px] text-gray-500 uppercase font-medium mb-1'>
									{dictionary.filters.max_price}
								</label>
								<div className='flex items-center'>
									<span className='text-gray-400 mr-1'>$</span>
									<input
										className='w-full bg-transparent border-0 p-0 text-gray-900 font-medium focus:ring-0 text-sm'
										type='number'
										min={0}
										max={PRICE_BOUNDS.MAX}
										value={maxPrice || ''}
										onChange={(e) =>
											dispatch({
												type: 'SET_MAX_PRICE',
												payload: Number(e.target.value),
											})
										}
										onBlur={(e) => {
											const val = Number(e.target.value);
											const clamped = Math.min(
												PRICE_BOUNDS.MAX,
												Math.max(val, minPrice + PRICE_BOUNDS.GAP),
											);
											dispatch({ type: 'SET_MAX_PRICE', payload: clamped });
										}}
									/>
								</div>
							</div>
						</div>
					</section>

					{/* Section 3: Property Details */}
					<section className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						{/* Property Type */}
						<div className='space-y-3'>
							<label className='block text-xs font-semibold text-gray-500 uppercase tracking-wider'>
								{dictionary.filters.property_type}
							</label>
							<div className='relative'>
								<select
									className='w-full bg-[#f5f8f6] border-0 rounded-lg py-3 pl-4 pr-10 text-gray-900 appearance-none focus:ring-2 focus:ring-[#006611] cursor-pointer capitalize'
									value={propertyType}
									onChange={(e) =>
										dispatch({
											type: 'SET_PROPERTY_TYPE',
											payload: e.target.value,
										})
									}
								>
									<option value='all'>{dictionary.filters.any_type}</option>
									{Object.entries(dictionary.categories)
										.filter(([key]) => key !== 'all')
										.map(([key, label]) => (
											<option
												key={key}
												value={key}
											>
												{label as string}
											</option>
										))}
								</select>
								<span className='material-icons absolute right-3 top-3 text-gray-400 pointer-events-none'>
									expand_more
								</span>
							</div>
						</div>

						{/* Rooms */}
						<div className='space-y-4'>
							{/* Beds */}
							<div className='flex justify-between items-center'>
								<span className='text-sm font-medium text-gray-900 '>
									{dictionary.filters.bedrooms}
								</span>
								<div className='flex items-center space-x-3 bg-[#f5f8f6] rounded-full p-1'>
									<button
										onClick={() =>
											dispatch({
												type: 'SET_BEDS',
												payload: Math.max(0, beds - 1),
											})
										}
										className='w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-[#006611] transition-colors active:scale-90'
									>
										<span className='material-icons text-base'>remove</span>
									</button>
									<span className='text-sm font-semibold w-6 text-center text-[#006611]'>
										{beds === 0 ? dictionary.filters.any : `${beds}+`}
									</span>
									<button
										onClick={() =>
											dispatch({ type: 'SET_BEDS', payload: beds + 1 })
										}
										className='w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-[#006611] hover:bg-[#006611] hover:text-white transition-colors active:scale-90'
									>
										<span className='material-icons text-base'>add</span>
									</button>
								</div>
							</div>

							{/* Baths */}
							<div className='flex justify-between items-center'>
								<span className='text-sm font-medium text-gray-900 '>
									{dictionary.filters.bathrooms}
								</span>
								<div className='flex items-center space-x-3 bg-[#f5f8f6] rounded-full p-1'>
									<button
										onClick={() =>
											dispatch({
												type: 'SET_BATHS',
												payload: Math.max(0, baths - 1),
											})
										}
										className='w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-[#006611] transition-colors active:scale-90'
									>
										<span className='material-icons text-base'>remove</span>
									</button>
									<span className='text-sm font-semibold w-6 text-center text-[#006611]'>
										{baths === 0 ? dictionary.filters.any : `${baths}+`}
									</span>
									<button
										onClick={() =>
											dispatch({ type: 'SET_BATHS', payload: baths + 1 })
										}
										className='w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-[#006611] hover:bg-[#006611] hover:text-white transition-colors active:scale-90'
									>
										<span className='material-icons text-base'>add</span>
									</button>
								</div>
							</div>
						</div>
					</section>

					{/* Section 4: Amenities */}
					<section>
						<label className='block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4'>
							{dictionary.filters.amenities}
						</label>
						<div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
							{AMENITIES_LIST.map(
								(item: { id: string; label: string; icon: string }) => (
									<label
										key={item.id}
										className='cursor-pointer group relative'
									>
										<input
											type='checkbox'
											value={item.id}
											checked={amenities.includes(item.id)}
											onChange={handleToggleAmenity}
											className='sr-only'
										/>
										<div
											className={`h-full px-4 py-3 rounded-lg border transition-all flex items-center justify-center gap-2 ${
												amenities.includes(item.id)
													? 'border-[#006611] bg-[#006611]/5 text-[#006611]'
													: 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 '
											}`}
										>
											<span
												className={`material-icons text-lg ${amenities.includes(item.id) ? 'text-[#006611]' : 'text-gray-400'}`}
											>
												{item.icon}
											</span>
											{item.label}
										</div>
										{amenities.includes(item.id) ? (
											<div className='absolute top-2 right-2 w-2 h-2 bg-[#006611] rounded-full'></div>
										) : null}
									</label>
								),
							)}
						</div>
					</section>
				</div>

				{/* Footer */}
				<footer className='bg-white border-t border-gray-100 px-8 py-6 sticky bottom-0 z-30 flex items-center justify-between'>
					<button
						onClick={handleClearFilters}
						className='text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors underline decoration-gray-300 underline-offset-4 cursor-pointer'
					>
						{dictionary.filters.clear_all}
					</button>
					<button
						onClick={handleApplyFilters}
						className='bg-[#006611] hover:bg-[#006611]/90 text-white px-8 py-3 rounded-lg font-medium shadow-lg shadow-[#006611]/30 transition-all hover:shadow-[#006611]/40 flex items-center gap-2 transform active:scale-95 cursor-pointer'
					>
						{dictionary.filters.show_homes}
						<span className='material-icons text-sm'>arrow_forward</span>
					</button>
				</footer>
			</div>
		</div>
	);
}
