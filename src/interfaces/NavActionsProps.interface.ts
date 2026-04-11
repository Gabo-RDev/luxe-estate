import type { User } from '@supabase/supabase-js';
import type { Dictionary } from '@/types/I18n';

export interface NavActionsProps {
	user: User | null;
	userRole?: string | null;
	dictionary: Dictionary;
}
