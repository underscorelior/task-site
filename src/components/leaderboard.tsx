import { useEffect, useState } from 'react';
import LeaderboardUser, { LoadingLBUser } from './leaderboard-user';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card';
import toast from 'react-hot-toast';

export default function Leaderboard({
	user,
	tasks,
}: {
	user: User | null;
	tasks: Task[];
}) {
	const [LBData, setLBData] = useState<Leaderboard | null>(null);
	const [LBUsers, setLBUsers] = useState<User[]>([]);

	async function fetchData() {
		const res = await fetch(`/api/gen_leaderboard`, {
			method: 'GET',
		});

		if (res.status == 200) setLBData((await res.json()) as Leaderboard);
		else toast.error(`We ran into an error, ${(await res.json()).message}`);
	}

	useEffect(() => {
		if (user != null || tasks) fetchData();
	}, [user, tasks]);

	useEffect(() => {
		if (LBData != null) {
			setLBUsers(convertToLBUsers());
		}
	}, [LBData]);

	function convertToLBUsers(): User[] {
		const out: User[] = [];

		for (const [name, user] of Object.entries(LBData as Leaderboard)) {
			out.push({ name, ...user });
		}

		return out.sort((a, b) => (b.score || 0) - (a.score || 0));
	}

	return (
		<Card className="w-full" side={'right'}>
			<CardHeader>
				<CardTitle>Leaderboard</CardTitle>
				<CardDescription></CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				{LBData == null
					? [...Array(5).keys()].map((number, idx) => {
							return <LoadingLBUser key={idx} index={number + 1} />;
						})
					: LBUsers.map((user, idx) => {
							return (
								<LeaderboardUser {...user} index={idx + 1} key={user?.name} />
							);
						})}
			</CardContent>
			<CardFooter className="">
				<h6 className="ml-auto font-mono text-xs font-light text-stone-400">
					Updates automatically.
				</h6>
			</CardFooter>
		</Card>
	);
}
