type Task = {
	name: string;
	description?: string;
	type: 'daily' | 'multi' | 'single' | 'weekly';
	points: number;
	category: 'health' | 'normal' | 'cool' | 'productivity' | 'insane';
	amount?: number;
	users?: { name: string; amount: number }[];
};

interface User {
	name: string;
	avatar: string;
	points: number;
}
