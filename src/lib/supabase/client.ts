import { createBrowserClient } from '@supabase/ssr';
import { SESSION_DURATION_SECONDS } from '@/lib/constants';

/**
 * Browser-side Supabase client (Client Components).
 * Manages auth tokens in cookies automatically via @supabase/ssr.
 */
export function createClient() {
	return createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
		{
			cookieOptions: {
				maxAge: SESSION_DURATION_SECONDS,
			},
		},
	);
}
