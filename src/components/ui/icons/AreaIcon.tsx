import { IconProps } from './GoogleIcon';

export const AreaIcon = ({ size = 20, className, ...props }: IconProps) => (
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
		<rect
			x='3'
			y='3'
			width='18'
			height='18'
			rx='2'
		/>
		<path d='M3 9h18' />
		<path d='M9 3v18' />
	</svg>
);
