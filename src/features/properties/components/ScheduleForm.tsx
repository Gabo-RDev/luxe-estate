'use client';

import { ScheduleFormProps } from '@/interfaces/ScheduleFormProps.interface';
import { TIME_SLOTS } from '@/lib/constants';
import { Calendar } from '@/components/ui/calendar';
import { useScheduleForm } from '../hooks/useScheduleForm';

export default function ScheduleForm({
	propertySlug,
	propertyId,
	propertyTitle,
}: ScheduleFormProps) {
	const {
		selectedDate,
		setSelectedDate,
		selectedTime,
		setSelectedTime,
		message,
		setMessage,
		isSubmitting,
		submitResult,
		errorMessage,
		handleConfirm,
		router,
	} = useScheduleForm(propertySlug, propertyId, propertyTitle);

	if (submitResult === 'success') {
		return (
			<div className='flex flex-col items-center justify-center py-16 text-center animate-fade-slide-up'>
				<div className='w-20 h-20 rounded-full bg-hintgreen flex items-center justify-center mb-6'>
					<span className='material-icons text-mosque text-4xl'>check</span>
				</div>
				<h2 className='text-2xl font-bold text-nordic mb-2'>
					Visit Confirmed!
				</h2>
				<p className='text-slate-500 mb-2'>
					{selectedDate?.toLocaleDateString('en-US', {
						weekday: 'long',
						month: 'long',
						day: 'numeric',
						year: 'numeric',
					})}
					{' at '}
					{selectedTime}
				</p>
				<p className='text-sm text-slate-400'>
					Redirecting to property details…
				</p>
			</div>
		);
	}

	return (
		<div>
			<h1 className='text-3xl font-bold text-nordic mb-2'>
				Schedule a Viewing
			</h1>
			<p className='text-slate-500 mb-8'>
				Choose a date and time to tour the property in person.
			</p>

			{/* Calendar */}
			<div className='mb-8 flex justify-center sm:justify-start'>
				<Calendar
					mode='single'
					selected={selectedDate}
					onSelect={setSelectedDate}
					disabled={(date) => {
						const today = new Date();
						today.setHours(0, 0, 0, 0);
						// Disable past dates and Sundays
						return date < today || date.getDay() === 0;
					}}
					className='rounded-md border p-3'
				/>
			</div>

			{/* Time Slots */}
			<div className='mb-8'>
				<h3 className='text-sm font-semibold text-nordic uppercase tracking-wider mb-4'>
					Available Times
				</h3>
				<div className='grid grid-cols-3 sm:grid-cols-4 gap-3'>
					{TIME_SLOTS.map((slot) => {
						const isSelected = selectedTime === slot;
						return (
							<button
								key={slot}
								onClick={() => setSelectedTime(slot)}
								className={`py-2 px-3 rounded-lg text-sm transition-all ${
									isSelected
										? 'bg-mosque/10 border border-mosque text-mosque font-medium shadow-sm'
										: 'border border-slate-200 text-slate-500 hover:border-mosque hover:text-mosque'
								}`}
							>
								{slot}
							</button>
						);
					})}
				</div>
			</div>

			{/* Message */}
			<div className='mb-8'>
				<label
					htmlFor='message'
					className='block text-sm font-semibold text-nordic uppercase tracking-wider mb-2'
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
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					className='w-full rounded-lg border-slate-200 bg-slate-50 text-nordic placeholder:text-slate-400 focus:ring-1 focus:ring-mosque focus:border-mosque transition-shadow resize-none text-sm'
				/>
			</div>

			{/* Error state */}
			{submitResult === 'error' && (
				<div className='mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2'>
					<span className='material-icons text-base'>error</span>
					{errorMessage || 'Something went wrong. Please try again.'}
				</div>
			)}

			{/* Actions */}
			<div className='pt-6 border-t border-slate-100 flex items-center justify-end gap-4'>
				<button
					onClick={() => router.back()}
					className='text-slate-500 hover:text-nordic font-medium px-4 py-2 text-sm transition-colors'
				>
					Cancel
				</button>
				<button
					onClick={handleConfirm}
					disabled={!selectedDate || !selectedTime || isSubmitting}
					className={`font-semibold py-3 px-8 rounded-lg shadow-lg transition-all text-sm flex items-center gap-2 ${
						!selectedDate || !selectedTime
							? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
							: 'bg-mosque hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-white shadow-mosque/20'
					}`}
				>
					{isSubmitting ? (
						<>
							<span className='material-icons text-sm animate-spin'>
								autorenew
							</span>
							<span>Confirming…</span>
						</>
					) : (
						<>
							<span>Confirm Visit</span>
							<span className='material-icons text-sm'>arrow_forward</span>
						</>
					)}
				</button>
			</div>
		</div>
	);
}
