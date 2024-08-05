const users = ['Steve Jobs', 'Lior', 'Human', 'Name', 'Empty'];

function user(): { name: string; amount: number }[] {
	return users.map((user) => {
		return { name: user, amount: Math.floor(Math.random() * 100) };
	});
}

export const data: Task[] = [
	{
		name: 'Exercise for an hour (one point per hour, PE does not count)',
		type: 'multi',
		points: 5,
		category: 'Health',
		users: user(),
	},
	{
		name: "Go outside for an hour (one point per hour, school doesn't count, you can't be inside a building)",
		type: 'multi',
		points: 3,
		category: 'Health',
		users: user(),
	},
	{
		name: 'Meditate for at least 20 minutes (one point per 20 minutes)',
		type: 'multi',
		points: 1,
		category: 'Health',
		users: user(),
	},
	{
		name: 'Do a T-25 video (fitness video)',
		type: 'multi',
		points: 1,
		category: 'Health',
		users: user(),
	},
	{
		name: 'Times homework was late (one point for each late assignment, least points win)',
		type: 'multi',
		points: 3,
		category: 'Productivity',
		users: user(),
	},
	{
		name: "Read a book that was not assigned in school (must finish book. can't be a children's book/manga 200 page minimum)",
		type: 'multi',
		points: 2,
		category: 'Productivity',
		users: user(),
	},
	{
		name: 'Go to sleep before 1:30 AM',
		type: 'daily',
		points: 2,
		category: 'Health',
		users: user(),
	},
	{
		name: 'Drink 6 glasses of water every day (although 8 is better)',
		type: 'daily',
		points: 4,
		category: 'Health',
		users: user(),
	},
	{
		name: 'Have at least 6 hours of sleep that night (obviously only one point a day)',
		type: 'daily',
		points: 2,
		category: 'Health',
		users: user(),
	},
	{
		name: 'Watch the news (max of one point per day)',
		type: 'daily',
		points: 1,
		category: 'Become Normal',
		users: user(),
	},
	{
		name: 'Go a day without video games (Does not conflict with the Play Among Us task unless you play more than 1 round of Among Us)',
		type: 'daily',
		points: 2,
		category: 'Productivity',
		users: user(),
	},
	{
		name: 'Be productive for 5 hours after school on a school day, 10 hours on non-school days',
		type: 'daily',
		points: 3,
		category: 'Productivity',
		users: user(),
	},
	{
		name: "Talk with someone you haven't talked to for 5+ years",
		type: 'single',
		points: 2,
		category: 'Become Normal',
		users: users.map((user) => {
			return { name: user, amount: Math.floor(Math.random() * 2) };
		}),
	},
	{
		name: 'Go to prom',
		type: 'single',
		points: 5,
		category: 'Become Normal',
		users: users.map((user) => {
			return { name: user, amount: Math.floor(Math.random() * 2) };
		}),
	},
	{
		name: "Go on a date (needs proof, can't be with other participants, must be IRL, must be romantic, must be over 1 hour, must be with preferred gender)",
		type: 'single',
		points: 5,
		category: 'Become Normal',
		users: users.map((user) => {
			return { name: user, amount: Math.floor(Math.random() * 2) };
		}),
	},
	{
		name: "Eat something which you haven't ate before",
		type: 'single',
		points: 1,
		category: 'Become Normal',
		users: users.map((user) => {
			return { name: user, amount: Math.floor(Math.random() * 2) };
		}),
	},
	{
		name: "Go to someplace far away (10+ miles) which you haven't gone before",
		type: 'single',
		points: 1,
		category: 'Become Normal',
		users: users.map((user) => {
			return { name: user, amount: Math.floor(Math.random() * 2) };
		}),
	},
];
