import { Property } from '@/interfaces/Property.interface';
import { Dictionary, Locale } from '@/types/I18n';

export interface PropertyGridProps {
	properties: Property[];
	currentPage: number;
	isFavoriteMode?: boolean;
	dictionary: Dictionary;
	locale: Locale;
	viewMode?: string;
}
