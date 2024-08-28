type Task = {
	id?: number;
	name: string;
	description: string;
	type: 'daily' | 'multi' | 'single' | 'weekly';
	points: number;
	category: 'health' | 'normal' | 'cool' | 'productivity' | 'insane';
	users: {
		[name: string]: {
			score?: number;
			updated_at?: number;
			description?: string;
		};
	};
	lower: boolean;
};

interface User {
	name: string;
	avatar: string;
	score?: number; // FIXME: Calculate this later or not at all?
}

type Leaderboard = {
	[name: string]: {
		avatar: string;
		score: number;
	};
};

type Verify = {
	id: number;
	created_at: string;
	name: string;
	task: number;
	description: string;
	amount: number;
	verify: string[];
};
