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

const typeIDs = {
	single: 'One-time Task',
	multi: 'Task',
	daily: 'Daily Task',
	weekly: 'Weekly Task',
};

export function convertType(type: Task['type']): string {
	return typeIDs[type];
}

export function sortTaskArr(tasks: Task[]): Task[] {
	const out: Task[] = [];

	['health', 'normal', 'cool', 'productivity', 'insane'].forEach((i) => {
		const temp = tasks.filter((task) => task.category == i);
		temp.forEach((task) => out.push(task as Task));
	});

	return out;
}
