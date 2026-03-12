import { createBrowserClient } from '@supabase/ssr';

/**
 * Browser-side Supabase client (Client Components).
 * Manages auth tokens in cookies automatically via @supabase/ssr.
 */
export function createClient() {
	return createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
	);
}
