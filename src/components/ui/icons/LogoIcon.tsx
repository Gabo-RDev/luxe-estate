import { IconProps } from './GoogleIcon';

export const LogoIcon = ({ size = 20, className, ...props }: IconProps) => (
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
			x='2'
			y='10'
			width='20'
			height='12'
			rx='2'
		/>
		<path d='M6 10V5c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5' />
		<line
			x1='6'
			y1='14'
			x2='6'
			y2='14'
			strokeWidth='3'
		/>
		<line
			x1='18'
			y1='14'
			x2='18'
			y2='14'
			strokeWidth='3'
		/>
		<line
			x1='12'
			y1='14'
			x2='12'
			y2='14'
			strokeWidth='3'
		/>
	</svg>
);
