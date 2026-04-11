import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { scheduleVisit } from '@/app/properties/[slug]/schedule/actions';

function getDaysInMonth(year: number, month: number) {
	return new Date(year, month + 1, 0).getDate();
}

/** Get the day-of-week index for the 1st of the month (0=Mon…6=Sun) */
function getFirstDayOfWeekIndex(year: number, month: number) {
	const jsDay = new Date(year, month, 1).getDay(); // 0=Sun
	return jsDay === 0 ? 6 : jsDay - 1; // convert to Mon=0
}

export function useScheduleForm(
	propertySlug: string,
	propertyId: string,
	propertyTitle: string,
) {
	const router = useRouter();
	const today = new Date();

	const [currentYear, setCurrentYear] = useState(today.getFullYear());
	const [currentMonth, setCurrentMonth] = useState(today.getMonth());
	const [selectedDay, setSelectedDay] = useState<number | null>(null);
	const [selectedTime, setSelectedTime] = useState<string | null>(null);
	const [message, setMessage] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitResult, setSubmitResult] = useState<'success' | 'error' | null>(
		null,
	);
	const [errorMessage, setErrorMessage] = useState('');

	const daysInMonth = useMemo(
		() => getDaysInMonth(currentYear, currentMonth),
		[currentYear, currentMonth],
	);

	const firstDayIndex = useMemo(
		() => getFirstDayOfWeekIndex(currentYear, currentMonth),
		[currentYear, currentMonth],
	);

	const monthName = new Date(currentYear, currentMonth).toLocaleDateString(
		'en-US',
		{
			month: 'long',
			year: 'numeric',
		},
	);

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
		const todayMidnight = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate(),
		);
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
			const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
				2,
				'0',
			)}-${String(selectedDay).padStart(2, '0')}`;

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

	return {
		today,
		currentYear,
		currentMonth,
		selectedDay,
		setSelectedDay,
		selectedTime,
		setSelectedTime,
		message,
		setMessage,
		isSubmitting,
		submitResult,
		errorMessage,
		daysInMonth,
		firstDayIndex,
		monthName,
		goToPrevMonth,
		goToNextMonth,
		isDayDisabled,
		handleConfirm,
		router,
	};
}
