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
	const { data: { user } } = await supabase.auth.getUser();

	let redirectUrl: URL | undefined = undefined;

	// Role validation & route protection
	if (!user && request.nextUrl.pathname.startsWith('/admin')) {
		redirectUrl = new URL('/login', request.url);
	} else if (user && request.nextUrl.pathname === '/login') {
		redirectUrl = new URL('/', request.url);
	} else if (user) {
		// Try to fetch existing role (now guaranteed by DB trigger)
		const { data: roleData } = await supabase
			.from('user_roles')
			.select('role, status')
			.eq('user_id', user.id)
			.single();

		const userRole = roleData?.role;
		const userStatus = roleData?.status;

		// Protect admin routes
		if (request.nextUrl.pathname.startsWith('/admin')) {
			if (userRole !== 'administrator' || userStatus !== 'active') {
				redirectUrl = new URL('/', request.url);
			}
		}
	}

	if (redirectUrl) {
		const redirectResponse = NextResponse.redirect(redirectUrl);
		// Carry over any cookies set by Supabase standard middleware process
		supabaseResponse.cookies.getAll().forEach((cookie) => {
			redirectResponse.cookies.set(cookie.name, cookie.value);
		});
		return redirectResponse;
	}

	return supabaseResponse;
};
