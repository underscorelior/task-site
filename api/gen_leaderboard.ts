import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../database.types';

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
		const out: Leaderboard = {};

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
				if (task.type == 'single') {
					for (const [name, score] of Object.entries(
						task.scores as { [name: string]: number },
					)) {
						if (score != 0) {
							out[name].score += task.points;
						}
					}
				} else {
					const max = Math.max(
						...Object.values(task.scores as { [name: string]: number }),
					);

					for (const [name, score] of Object.entries(
						task.scores as { [name: string]: number },
					)) {
						if (score == max) {
							out[name].score += task.points;
						}
					}
				}
			});
		} else return res.status(404).json({ message: 'No tasks found' });

		return res.status(200).json(out);
	} catch (error) {
		return res.status(500).json({
			message: 'An error occurred while processing the request',
			error: error.message,
		});
	}
}
