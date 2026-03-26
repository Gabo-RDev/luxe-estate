import { Property } from '@/interfaces/Property.interface';
import { Dictionary, Locale } from '@/types/I18n';

export interface PropertyCardProps {
	property: Property;
	featuredMode?: boolean;
	dictionary: Dictionary;
	locale: Locale;
}
