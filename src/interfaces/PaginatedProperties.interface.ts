import { Property } from '@/interfaces/Property.interface';

export interface PaginatedProperties {
	data: Property[];
	totalCount: number;
	totalPages: number;
	currentPage: number;
}
