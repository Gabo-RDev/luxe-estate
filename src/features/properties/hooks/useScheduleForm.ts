import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { scheduleVisit } from '@/app/properties/[slug]/schedule/actions';

export function useScheduleForm(
	propertySlug: string,
	propertyId: string,
	propertyTitle: string,
) {
	const router = useRouter();

	const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
	const [selectedTime, setSelectedTime] = useState<string | null>(null);
	const [message, setMessage] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitResult, setSubmitResult] = useState<'success' | 'error' | null>(null);
	const [errorMessage, setErrorMessage] = useState('');

	const handleConfirm = async () => {
		if (!selectedDate || !selectedTime) return;

		setIsSubmitting(true);
		setSubmitResult(null);
		setErrorMessage('');

		try {
			const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(
				2,
				'0',
			)}-${String(selectedDate.getDate()).padStart(2, '0')}`;

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
	};
}
