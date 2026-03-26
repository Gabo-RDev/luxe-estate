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
	const { data: { user } } = await supabase.auth.getUser();

	const cookieStore = await cookies();
	const localeCookie = cookieStore.get('NEXT_LOCALE')?.value as Locale;
	const locale = locales.includes(localeCookie) ? localeCookie : defaultLocale;
	const dictionary = await getDictionary(locale);

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
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap'
					rel='stylesheet'
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0'
					rel='stylesheet'
				/>
			</head>
			<body className='antialiased selection:bg-mosque selection:text-white overflow-x-hidden'>
				<I18nProvider
					locale={locale}
					dictionary={dictionary}
				>
					<Navigation user={user} />
					{children}
				</I18nProvider>
			</body>
		</html>
	);
}
