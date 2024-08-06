import LeaderboardUser from './leaderboard-user';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card';

export default function Leaderboard() {
	const users: User[] = [
		{
			id: '0',
			name: 'Name',
			points: 14,
			avatar: 'https://cdn.discordapp.com/embed/avatars/0.png',
		},
		{
			id: '1',
			name: 'Steve Jobs',
			points: 7000000000,
			avatar:
				'https://cdn.vox-cdn.com/thumbor/yIoKynT0Jl-zE7yWwzmW2fy04xc=/0x0:706x644/1400x1400/filters:focal(353x322:354x323)/cdn.vox-cdn.com/uploads/chorus_asset/file/13874040/stevejobs.1419962539.png',
		},
		{
			id: '2',
			name: 'Lior',
			points: 53,
			avatar:
				'https://cdn.discordapp.com/avatars/454356237614841870/99ce4376815e1338e64745135a5d7930.webp?size=160',
		},
		{
			id: '3',
			name: 'Empty',
			points: 0,
			avatar: '',
		},
		{
			id: '4',
			name: 'Human',
			points: 50,
			avatar:
				'https://www.whitehouse.gov/wp-content/uploads/2024/07/P20240724AS-1343.jpg?w=750&h=500&crop=1',
		},
	];
	return (
		<Card className="w-full" side={'right'}>
			<CardHeader>
				<CardTitle>Leaderboard</CardTitle>
				<CardDescription></CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				{users
					.sort((a, b) => b.points - a.points)
					.map((user, idx) => {
						return <LeaderboardUser {...user} index={idx + 1} key={idx} />;
					})}
			</CardContent>
			<CardFooter>
				<h6 className="ml-auto font-mono text-xs font-light text-stone-400">
					Updates automatically.
				</h6>
			</CardFooter>
		</Card>
	);
}
