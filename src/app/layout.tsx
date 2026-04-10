import Navigation from '@/components/layout/Navigation';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { defaultLocale, locales } from '@/lib/i18n/config';
import { Locale } from '@/types/I18n';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { I18nProvider } from '@/lib/i18n/i18n-context';
import { Geist } from 'next/font/google';
import '@/styles/globals.css';
import { createClient } from '@/lib/supabase/server';

const geist = Geist({
	subsets: ['latin'],
	variable: '--font-geist',
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Luxe Estate',
	description: 'Premium Real Estate',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const supabase = await createClient();
	const cookieStore = await cookies();
	const localeCookie = cookieStore.get('NEXT_LOCALE')?.value as Locale;
	const locale = locales.includes(localeCookie) ? localeCookie : defaultLocale;

	const [
		{
			data: { user },
		},
		dictionary,
		{ data: roleData },
	] = await Promise.all([
		supabase.auth.getUser(),
		getDictionary(locale),
		supabase.from('user_roles').select('role').maybeSingle(),
	]);

	// Fetch role if user exists
	const userRole = user ? roleData?.role : null;

	return (
		<html
			lang={locale}
			suppressHydrationWarning
			className={geist.variable}
		>
			<head>
				{/* Material Icons — CSS icon font, must use link stylesheet */}
				<link
					href='https://fonts.googleapis.com/icon?family=Material+Icons'
					rel='stylesheet'
					crossOrigin='anonymous'
				/>
			</head>
			<body className='antialiased selection:bg-mosque selection:text-white overflow-x-hidden'>
				<I18nProvider
					locale={locale}
					dictionary={dictionary}
				>
					<Navigation
						user={user}
						userRole={userRole}
					/>
					{children}
				</I18nProvider>
			</body>
		</html>
	);
}
