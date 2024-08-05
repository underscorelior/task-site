import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const categoryIDs = {
	health: 'Health',
	normal: 'Become Normal',
	cool: 'POV: Cool',
	productivity: 'Productivity',
	insane: 'INSANE',
};

export function convertCategory(category: Task['category']): string {
	return categoryIDs[category];
}
