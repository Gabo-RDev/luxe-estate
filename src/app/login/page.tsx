import Link from 'next/link';
import { SocialAuthButtons } from '@/components/auth/SocialAuthButtons';
import { LoginAnimationWrapper } from '@/components/auth/LoginAnimationWrapper';
import { cookies } from 'next/headers';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { defaultLocale, locales } from '@/lib/i18n/config';
import { Locale } from '@/types/I18n';

export default async function LoginPage() {
	const cookieStore = await cookies();
	const localeCookie = cookieStore.get('NEXT_LOCALE')?.value as Locale;
	const locale = locales.includes(localeCookie) ? localeCookie : defaultLocale;
	const dictionary = await getDictionary(locale);
	return (
		<div className='min-h-screen flex items-center justify-center p-4 antialiased text-nordic relative overflow-hidden bg-background'>
			{/* Concentric circles background mimicking the provided design */}
			<div className='absolute inset-0 pointer-events-none opacity-40 flex items-center justify-center'>
				<div className='absolute w-200 h-200 rounded-full border border-primary/5'></div>
				<div className='absolute w-300 h-300 rounded-full border border-primary/5'></div>
				<div className='absolute w-400 h-400 rounded-full border border-primary/5'></div>
				<div className='absolute -top-64 -right-64 w-150 h-150 bg-accent/20 rounded-full blur-3xl'></div>
				<div className='absolute -bottom-64 -left-64 w-125 h-125 bg-primary/10 rounded-full blur-3xl'></div>
			</div>

			<LoginAnimationWrapper>
				<div className='text-center mb-10'>
					<div className='inline-flex items-center justify-center w-14 h-14 bg-mosque rounded-xl mb-6 shadow-sm text-white'>
						<span className='material-symbols-rounded text-3xl'>
							real_estate_agent
						</span>
					</div>
					<h1 className='text-3xl font-bold tracking-tight text-[#19322F] mb-3'>
						{dictionary.auth.welcome}
					</h1>
					<p className='text-[#19322F]/60 text-[15px]'>
						{dictionary.auth.unlock}
					</p>
				</div>

				<div className='bg-white rounded-2xl shadow-sm p-8 sm:p-10 w-full border border-gray-100/50'>
					<SocialAuthButtons dictionary={dictionary} />

					<p className='mt-8 text-center text-[14px] text-[#19322F]/70'>
						{dictionary.auth.no_account}{' '}
						<Link
							className='font-semibold text-mosque hover:opacity-80 transition-opacity'
							href='#'
						>
							{dictionary.auth.signup}
						</Link>
					</p>
				</div>

				<div className='mt-8 text-center'>
					<nav className='flex justify-center gap-6 text-[13px] text-[#19322F]/50'>
						<Link
							className='hover:text-[#19322F] transition-colors'
							href='#'
						>
							{dictionary.auth.privacy}
						</Link>
						<Link
							className='hover:text-[#19322F] transition-colors'
							href='#'
						>
							{dictionary.auth.terms}
						</Link>
						<Link
							className='hover:text-[#19322F] transition-colors'
							href='#'
						>
							{dictionary.auth.help}
						</Link>
					</nav>
				</div>
			</LoginAnimationWrapper>
		</div>
	);
}
