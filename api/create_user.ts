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

// TODO: Make it so that duplicate names wont be possible
export default async function handler(req: VercelRequest, res: VercelResponse) {
	try {
		let { name, pfp } = req.query;

		if (Array.isArray(name) || Array.isArray(pfp)) {
			throw 'We ran into an error when creating this account, please try again.';
		}

		if (!name) {
			return res
				.status(400)
				.json({ message: 'Missing name in query parameters' });
		}

		const { data, error } = await supabase
			.from('users')
			.insert({ name, pfp })
			.select();

		if (error) throw error;

		if (data) return res.status(200).json(data);
	} catch (error) {
		return res.status(500).json({
			message: 'An error occurred while processing the request',
			error: error.message,
		});
	}
}
