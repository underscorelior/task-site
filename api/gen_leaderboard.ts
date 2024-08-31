import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Database } from '../database.types';
import { createClient } from '@supabase/supabase-js';

type Leaderboard = {
	[name: string]: {
		avatar: string;
		score: number;
	};
};

const supabase = createClient<Database>(
	process.env.SUPABASE_URL || '',
	process.env.SUPABASE_KEY || '',
);

const allowCors = (fn) => async (req, res) => {
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET,OPTIONS,PATCH,DELETE,POST,PUT',
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
	);
	if (req.method === 'OPTIONS') {
		res.status(200).end();
		return;
	}
	return await fn(req, res);
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
	try {
		const { code } = req.query;

		const out: Leaderboard = {};
		if (code && code == process.env.PERMISSION_CODE) {
			const { data: users, error: userError } = await supabase
				.from('users')
				.select();

			if (userError) throw userError;

			if (users)
				users.forEach((user) => {
					out[user.name] = { avatar: user.avatar || '', score: 0 };
				});
			else return res.status(404).json({ message: 'No users found' });

			const { data: tasks, error: taskError } = await supabase
				.from('tasks')
				.select();

			if (taskError) throw taskError;

			if (tasks) {
				tasks.forEach((task) => {
					if (task.type === 'single') {
						for (const [name, user] of Object.entries(
							task.users as { [name: string]: { score: number } },
						)) {
							if (user.score !== 0) {
								out[name].score += task.points;
							}
						}
					} else if (task.lower) {
						const minScore = Math.min(
							...Object.values(
								task.users as { [name: string]: { score: number } },
							).map((user) => user.score),
						);

						for (const [name, user] of Object.entries(
							task.users as { [name: string]: { score: number } },
						)) {
							if (user.score === minScore) {
								out[name].score += task.points;
							}
						}
					} else {
						const maxScore = Math.max(
							...Object.values(
								task.users as { [name: string]: { score: number } },
							).map((user) => user.score),
						);

						for (const [name, user] of Object.entries(
							task.users as { [name: string]: { score: number } },
						)) {
							if (user.score === maxScore) {
								out[name].score += task.points;
							}
						}
					}
				});
			} else return res.status(404).json({ message: 'No tasks found' });

			return res.status(200).json(out);
		} else {
			throw 'Code missing or invalid.';
		}
	} catch (error) {
		return res.status(500).json({
			message: 'An error occurred while processing the request',
			error: error.message,
		});
	}
}
