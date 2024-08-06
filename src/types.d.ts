type Task = {
	id?: number; // TODO: Make it required later
	name: string;
	description: string;
	type: 'daily' | 'multi' | 'single' | 'weekly';
	points: number;
	category: 'health' | 'normal' | 'cool' | 'productivity' | 'insane';
	users: { name: string; amount: number }[]; // TODO: Remove
	scores?: {
		// TODO: Make it required later
		[id: string]: number;
	};
};

interface User {
	id: string;
	name: string;
	avatar: string;
	points: number; // FIXME: Calculate this later or not at all?
}
