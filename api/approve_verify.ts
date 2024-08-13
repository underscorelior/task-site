import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { Database, Json } from '../database.types.ts';

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
		const { id, code, task_id, data: task } = req.query;

		if (!id) {
			return res
				.status(400)
				.json({ message: 'Missing id in query parameters' });
		}

		if (!task_id) {
			return res
				.status(400)
				.json({ message: 'Missing task_id in query parameters' });
		}

		if (Array.isArray(task)) {
			return res.status(400).json({ message: 'Invalid task' });
		}

		if (code && code == process.env.PERMISSION_CODE) {
			const { error } = await supabase.from('submit').delete().eq('id', id);

			if (error) throw error;

			const { error: taskError } = await supabase
				.from('tasks')
				.update(
					JSON.parse(task) as unknown as {
						category: string;
						description: string;
						lower: boolean | null;
						name: string | null;
						points: number;
						scores: Json;
						type: string;
					},
				)
				.eq('id', task_id)
				.select();

			if (taskError) throw taskError;

			return res
				.status(200)
				.json({ message: `Successfully approved task ${id}` });
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
