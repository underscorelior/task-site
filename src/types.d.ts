interface Task {
	name: string;
	type: 'daily' | 'multi' | 'single';
	points: number;
	category: string; // TODO: maybe set this to be a list of set strings
}

interface User {
	name: string;
	avatar: string;
	points: number;
}
