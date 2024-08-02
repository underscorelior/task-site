import LeaderboardUser from './leaderboard-user';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';

export default function Leaderboard() {
	const test_user: User = {
		name: 'test',
		points: 1000,
		avatar:
			'https://cdn.discordapp.com/avatars/454356237614841870/99ce4376815e1338e64745135a5d7930.webp?size=160',
	};
	return (
		<Card className="w-full">
			<CardHeader>Leaderboard</CardHeader>
			<CardContent>
				<LeaderboardUser
					name="Lior"
					points={10000}
					index={1}
					avatar="https://cdn.discordapp.com/avatars/454356237614841870/99ce4376815e1338e64745135a5d7930.webp?size=160"
				/>
				<LeaderboardUser
					name="Lior"
					points={2000}
					index={2}
					avatar="https://cdn.discordapp.com/avatars/454356237614841870/99ce4376815e1338e64745135a5d7930.webp?size=160"
				/>
				<LeaderboardUser {...test_user} index={3} />
				<LeaderboardUser
					name="Lior"
					points={100}
					index={4}
					avatar="https://cdn.discordapp.com/avatars/454356237614841870/99ce4376815e1338e64745135a5d7930.webp?size=160"
				/>
			</CardContent>
			<CardFooter></CardFooter>
		</Card>
	);
}
