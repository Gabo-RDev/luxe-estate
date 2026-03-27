import { createClient } from '@supabase/supabase-js';

// Admin client using the service role key to bypass RLS
// Do not use this in client components or exposed API routes without auth checks
export const supabaseAdmin = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_ROLE_KEY!
);
