import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';
import { SESSION_DURATION_SECONDS } from '@/lib/constants';

/**
 * Refreshes the user session if it's expired.
 * This should be called from Next.js middleware.
 */
export const updateSession = async (request: NextRequest) => {
	// Let's create an initial response that we can modify
	let supabaseResponse = NextResponse.next({
		request,
	});

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
		{
			cookieOptions: {
				maxAge: SESSION_DURATION_SECONDS,
			},
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) =>
						request.cookies.set(name, value),
					);
					supabaseResponse = NextResponse.next({
						request,
					});
					cookiesToSet.forEach(({ name, value, options }) =>
						supabaseResponse.cookies.set(name, value, options),
					);
				},
			},
		},
	);

	// This will refresh the session if it is expired.
	// We call getUser() because it's the safest way to ensure the session is valid
	// and trigger the `setAll` call if a refresh happens.
	// IMPORTANT: Don't call .getSession() or it won't refresh correctly in some edge cases.
	await supabase.auth.getUser();

	return supabaseResponse;
};
