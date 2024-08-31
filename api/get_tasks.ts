import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Database } from '../database.types';
import { createClient } from '@supabase/supabase-js';

type Task = {
	id?: number;
	name: string;
	description: string;
	type: 'daily' | 'multi' | 'single' | 'weekly';
	points: number;
	category: 'health' | 'normal' | 'cool' | 'productivity' | 'insane';
	users: {
		[name: string]: {
			score: number;
			updated_at?: string;
			description?: string;
		};
	};
	lower: boolean;
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

		const out: Task[] = [];

		if (code && code == process.env.PERMISSION_CODE) {
			const { data, error } = await supabase.from('tasks').select();

			if (error) throw error;

			if (data) {
				['health', 'normal', 'cool', 'productivity', 'insane'].forEach((i) => {
					const temp = data
						.filter((task) => task.category == i)
						.sort((a, b) => b.points - a.points);
					temp.forEach((task) => out.push(task as Task));
				});

				return res.status(200).json(out);
			} else return res.status(404).json({ message: `Tasks not found` });
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
