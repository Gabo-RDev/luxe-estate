'use client';

import { createClient } from '@/lib/supabase/client';
import { Dictionary } from '@/types/I18n';
import { GoogleIcon, GithubIcon } from '@/components/ui/icons';

export function SocialAuthButtons({ dictionary }: { dictionary: Dictionary }) {
	const supabase = createClient();

	const handleGoogleLogin = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${window.location.origin}/auth/callback`,
			},
		});
	};

	const handleGithubLogin = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: `${window.location.origin}/auth/callback`,
			},
		});
	};

	return (
		<div className='space-y-4'>
			<button
				onClick={handleGoogleLogin}
				className='w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-lg p-3.5 text-[#19322F] font-medium transition-colors hover:bg-gray-50 cursor-pointer hover:border-mosque'
			>
				<GoogleIcon className='w-5 h-5' />
				<span>{dictionary.auth.continue_google}</span>
			</button>
			<button
				onClick={handleGithubLogin}
				className='w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-lg p-3.5 text-[#19322F] font-medium transition-colors hover:bg-gray-50 cursor-pointer hover:border-mosque'
			>
				<GithubIcon className='w-5 h-5 text-[#19322F]' />
				<span>{dictionary.auth.continue_github}</span>
			</button>
		</div>
	);
}
