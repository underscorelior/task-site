import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Database } from '../database.types';
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
		const { name, code } = req.query;

		if (code && code == process.env.PERMISSION_CODE) {
			if (!name) {
				return res
					.status(400)
					.json({ message: 'Missing name in query parameters' });
			}

			const { data, error } = await supabase.from('users').select();

			if (error) throw error;

			if (data.some((user) => user.name == name))
				return res.status(200).json(
					data.find((user) => {
						if (user.name == name) return user;
					}),
				);
			else
				return res
					.status(404)
					.json({ message: `User with name ${name} not found` });
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
