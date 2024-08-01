import LeaderboardUser from './leaderboard-user';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';

export default function Leaderboard() {
	return (
		<Card>
			<CardHeader>Leaderboard</CardHeader>
			<CardContent>
				<LeaderboardUser />
			</CardContent>
			<CardFooter></CardFooter>
		</Card>
	);
}
