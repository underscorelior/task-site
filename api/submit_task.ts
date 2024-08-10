import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { Database, Json } from '../database.types';
import { createClient } from '@supabase/supabase-js';

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
		let { id, name, description, amount } = req.query;

		if (!id || Array.isArray(id)) {
			return res
				.status(400)
				.json({ message: 'Error with id in query parameters' });
		}

		if (!name || Array.isArray(name)) {
			return res
				.status(400)
				.json({ message: 'Error with name in query parameters' });
		}

		if (!description || Array.isArray(description)) {
			return res
				.status(400)
				.json({ message: 'Error with description in query parameters' });
		}

		if (!amount || Array.isArray(amount)) {
			return res
				.status(400)
				.json({ message: 'Error with amount in query parameters' });
		}

		// TODO: IF THE TASK IS A DAILY TASK, STORE IT IN ANOTHER TABLE SO REPETITION ISN'T POSSIBLE

		const { data, error } = await supabase
			.from('submit')
			.insert({
				task: parseInt(id),
				name,
				description,
				amount: parseInt(amount),
			})
			.select();

		if (error) throw error;

		if (data) {
			return res.status(200).json(data);
		} else {
			return res
				.status(400)
				.json({ message: 'We ran into an issue, please try again later' });
		}
	} catch (error) {
		return res.status(500).json({
			message: 'An error occurred while processing the request',
			error: error.message,
		});
	}
}
