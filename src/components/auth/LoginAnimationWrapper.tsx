'use client';

import { motion } from 'framer-motion';

export function LoginAnimationWrapper({ children }: { children: React.ReactNode }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: 'easeOut' }}
			className="w-full max-w-md z-10 flex flex-col items-center"
		>
			{children}
		</motion.div>
	);
}
