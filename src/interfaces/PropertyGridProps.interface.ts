import { Property } from '@/interfaces/Property.interface';
import { Dictionary, Locale } from '@/types/I18n';

export interface PropertyGridProps {
	properties: Property[];
	currentPage: number;
	dictionary: Dictionary;
	locale: Locale;
}
