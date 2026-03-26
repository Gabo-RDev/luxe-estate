import { useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useI18n } from '@/lib/i18n/i18n-context';

export function useNavigation() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { dictionary } = useI18n();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isProfileOpen, setIsProfileOpen] = useState(false);

	const handleLogoClick = (e: React.MouseEvent) => {
		if (pathname === '/' && !searchParams.toString()) {
			e.preventDefault();
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	const navLinks = [
		{ label: dictionary.nav.buy, href: '/properties' },
		{ label: dictionary.nav.rent, href: '#' },
		{ label: dictionary.nav.sell, href: '#' },
		{ label: dictionary.nav.saved, href: '#' },
	];

	return {
		pathname,
		dictionary,
		isMobileMenuOpen,
		setIsMobileMenuOpen,
		isProfileOpen,
		setIsProfileOpen,
		handleLogoClick,
		navLinks,
	};
}
