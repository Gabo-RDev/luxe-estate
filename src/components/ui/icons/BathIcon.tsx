import { IconProps } from './GoogleIcon';

export const BathIcon = ({ size = 20, className, ...props }: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		className={className}
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path d='M9 6 6.5 3.5a1.5 1.5 0 0 0-1-1C4.305 2.5 3.5 3.305 3.5 4.5c0 .39.15.76.41 1.04L6.5 8H3a1 1 0 0 0-1 1v1h1c0 3.3 2.7 6 6 6s6-2.7 6-6h1V9a1 1 0 0 0-1-1h-3.5' />
		<path d='M10 16v2' />
		<path d='M8 20h4' />
	</svg>
);
