'use client';

import React from 'react';
import { locales, localeNames } from '@/lib/i18n/config';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguageSelector } from '@/hooks/useLanguageSelector';

export function LanguageSelector() {
	const { locale, isOpen, setIsOpen, isPending, handleLanguageChange, flags } =
		useLanguageSelector();

	return (
		<div className='relative flex items-center cursor-pointer'>
			<motion.button
				onClick={() => setIsOpen(!isOpen)}
				className='flex items-center gap-1.5 text-[13px] text-gray-700 hover:text-mosque transition-colors py-1.5 px-2 rounded-md hover:bg-gray-50 cursor-pointer'
				disabled={isPending}
				whileTap={{ scale: 0.93 }}
			>
				<span className='text-base leading-none'>{flags[locale]}</span>
				<span className='font-medium'>{locale.toUpperCase()}</span>
				<motion.span
					className='material-icons text-[16px] text-gray-400'
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={{ duration: 0.22, ease: 'easeInOut' }}
				>
					expand_more
				</motion.span>
			</motion.button>

			<AnimatePresence>
				{isOpen && (
					<>
						{/* Backdrop to close on outside click */}
						<motion.div
							className='fixed inset-0 z-40'
							onClick={() => setIsOpen(false)}
							aria-hidden='true'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						/>

						{/* Dropdown */}
						<motion.div
							className='absolute right-0 top-full mt-1 w-36 bg-white rounded-xl shadow-lg border border-nordic/5 py-1.5 z-50 origin-top-right overflow-hidden'
							initial={{ opacity: 0, scale: 0.92, y: -6 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.92, y: -6 }}
							transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
						>
							{locales.map((l, i) => (
								<motion.button
									key={l}
									onClick={() => handleLanguageChange(l)}
									disabled={isPending}
									className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-gray-50 transition-colors cursor-pointer ${
										locale === l
											? 'font-semibold text-mosque bg-gray-50/50'
											: 'text-gray-700'
									}`}
									initial={{ opacity: 0, x: -8 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: i * 0.05, duration: 0.16, ease: 'easeOut' }}
								>
									<span className='text-base'>{flags[l]}</span>
									<span>{localeNames[l]}</span>
									{locale === l && (
										<motion.span
											className='material-icons text-[14px] text-mosque ml-auto'
											initial={{ scale: 0 }}
											animate={{ scale: 1 }}
											transition={{ type: 'spring', stiffness: 300, damping: 20 }}
										>
											check
										</motion.span>
									)}
								</motion.button>
							))}
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
}
