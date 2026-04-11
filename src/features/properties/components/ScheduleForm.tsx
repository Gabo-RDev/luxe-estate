'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { scheduleVisit } from '@/app/properties/[slug]/schedule/actions';

interface ScheduleFormProps {
	propertySlug: string;
	propertyId: string;
	propertyTitle: string;
}

const TIME_SLOTS = [
	'09:00 AM',
	'09:30 AM',
	'10:00 AM',
	'10:30 AM',
	'11:00 AM',
	'11:30 AM',
	'01:00 PM',
	'02:00 PM',
	'03:00 PM',
	'03:30 PM',
	'04:00 PM',
];

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function getDaysInMonth(year: number, month: number) {
	return new Date(year, month + 1, 0).getDate();
}

/** Get the day-of-week index for the 1st of the month (0=Mon…6=Sun) */
function getFirstDayOfWeekIndex(year: number, month: number) {
	const jsDay = new Date(year, month, 1).getDay(); // 0=Sun
	return jsDay === 0 ? 6 : jsDay - 1; // convert to Mon=0
}



export default function ScheduleForm({
	propertySlug,
	propertyId,
	propertyTitle,
}: ScheduleFormProps) {
	const router = useRouter();
	const today = new Date();

	const [currentYear, setCurrentYear] = useState(today.getFullYear());
	const [currentMonth, setCurrentMonth] = useState(today.getMonth());
	const [selectedDay, setSelectedDay] = useState<number | null>(null);
	const [selectedTime, setSelectedTime] = useState<string | null>(null);
	const [message, setMessage] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitResult, setSubmitResult] = useState<'success' | 'error' | null>(null);
	const [errorMessage, setErrorMessage] = useState('');

	const daysInMonth = useMemo(
		() => getDaysInMonth(currentYear, currentMonth),
		[currentYear, currentMonth],
	);

	const firstDayIndex = useMemo(
		() => getFirstDayOfWeekIndex(currentYear, currentMonth),
		[currentYear, currentMonth],
	);

	const monthName = new Date(currentYear, currentMonth).toLocaleDateString('en-US', {
		month: 'long',
		year: 'numeric',
	});

	const goToPrevMonth = () => {
		if (currentMonth === 0) {
			setCurrentMonth(11);
			setCurrentYear((y) => y - 1);
		} else {
			setCurrentMonth((m) => m - 1);
		}
		setSelectedDay(null);
	};

	const goToNextMonth = () => {
		if (currentMonth === 11) {
			setCurrentMonth(0);
			setCurrentYear((y) => y + 1);
		} else {
			setCurrentMonth((m) => m + 1);
		}
		setSelectedDay(null);
	};

	const isDayPast = (day: number) => {
		const d = new Date(currentYear, currentMonth, day);
		const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
		return d < todayMidnight;
	};

	const isSunday = (day: number) => {
		return new Date(currentYear, currentMonth, day).getDay() === 0;
	};

	const isDayDisabled = (day: number) => isDayPast(day) || isSunday(day);

	const handleConfirm = async () => {
		if (!selectedDay || !selectedTime) return;

		setIsSubmitting(true);
		setSubmitResult(null);
		setErrorMessage('');

		try {
			const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;

			const result = await scheduleVisit({
				propertyId,
				propertyTitle,
				visitDate: dateStr,
				visitTime: selectedTime,
				message: message || undefined,
			});

			if (!result.success) {
				setErrorMessage(result.error || 'Something went wrong.');
				setSubmitResult('error');
				return;
			}

			setSubmitResult('success');

			// Redirect back to property after a brief pause
			setTimeout(() => {
				router.push(`/properties/${propertySlug}`);
			}, 1800);
		} catch {
			setErrorMessage('Network error. Please try again.');
			setSubmitResult('error');
		} finally {
			setIsSubmitting(false);
		}
	};

	if (submitResult === 'success') {
		return (
			<div className='flex flex-col items-center justify-center py-16 text-center animate-fade-slide-up'>
				<div className='w-20 h-20 rounded-full bg-hintgreen flex items-center justify-center mb-6'>
					<span className='material-icons text-mosque text-4xl'>check</span>
				</div>
				<h2 className='text-2xl font-bold text-nordic mb-2'>Visit Confirmed!</h2>
				<p className='text-slate-500 mb-2'>
					{new Date(currentYear, currentMonth, selectedDay!).toLocaleDateString('en-US', {
						weekday: 'long',
						month: 'long',
						day: 'numeric',
						year: 'numeric',
					})}
					{' at '}
					{selectedTime}
				</p>
				<p className='text-sm text-slate-400'>Redirecting to property details…</p>
			</div>
		);
	}

	return (
		<div>
			<h1 className='text-3xl font-bold text-nordic mb-2'>Schedule a Viewing</h1>
			<p className='text-slate-500 mb-8'>
				Choose a date and time to tour the property in person.
			</p>

			{/* Calendar */}
			<div className='mb-8'>
				<div className='flex items-center justify-between mb-4'>
					<h3 className='text-sm font-semibold text-nordic uppercase tracking-wider'>
						{monthName}
					</h3>
					<div className='flex gap-1'>
						<button
							onClick={goToPrevMonth}
							className='p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-mosque transition-colors'
						>
							<span className='material-icons text-lg'>chevron_left</span>
						</button>
						<button
							onClick={goToNextMonth}
							className='p-1 rounded-full hover:bg-slate-100 text-nordic hover:text-mosque transition-colors'
						>
							<span className='material-icons text-lg'>chevron_right</span>
						</button>
					</div>
				</div>

				<div className='grid grid-cols-7 gap-y-2 gap-x-1 text-center mb-6'>
					{DAY_NAMES.map((d) => (
						<div key={d} className='text-xs font-medium text-slate-400 py-2'>
							{d}
						</div>
					))}

					{/* Empty cells for the offset */}
					{Array.from({ length: firstDayIndex }).map((_, i) => (
						<div key={`empty-${i}`} />
					))}

					{/* Actual day buttons */}
					{Array.from({ length: daysInMonth }).map((_, i) => {
						const day = i + 1;
						const disabled = isDayDisabled(day);
						const isSelected = selectedDay === day;
						const isToday =
							day === today.getDate() &&
							currentMonth === today.getMonth() &&
							currentYear === today.getFullYear();

						return (
							<button
								key={day}
								disabled={disabled}
								onClick={() => setSelectedDay(day)}
								className={`text-sm py-2 rounded-lg transition-all relative ${
									disabled
										? 'text-slate-300 cursor-not-allowed'
										: isSelected
										? 'bg-mosque text-white font-semibold shadow-lg shadow-mosque/30 transform scale-105'
										: 'text-slate-600 hover:bg-slate-100 transition-colors'
								}`}
							>
								{day}
								{isSelected && (
									<span className='absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full' />
								)}
								{isToday && !isSelected && (
									<span className='absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-mosque rounded-full' />
								)}
							</button>
						);
					})}
				</div>
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
					disabled={!selectedDay || !selectedTime || isSubmitting}
					className={`font-semibold py-3 px-8 rounded-lg shadow-lg transition-all text-sm flex items-center gap-2 ${
						!selectedDay || !selectedTime
							? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
							: 'bg-mosque hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-white shadow-mosque/20'
					}`}
				>
					{isSubmitting ? (
						<>
							<span className='material-icons text-sm animate-spin'>autorenew</span>
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
