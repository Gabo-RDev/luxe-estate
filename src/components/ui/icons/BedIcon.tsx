import { IconProps } from './GoogleIcon';

export const BedIcon = ({ size = 20, className, ...props }: IconProps) => (
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
		<path d='M2 4v16' />
		<path d='M2 8h18a2 2 0 0 1 2 2v10' />
		<path d='M2 17h20' />
		<path d='M6 8v9' />
	</svg>
);
