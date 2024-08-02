import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export default function LeaderboardUser({
	name,
	avatar,
	points,
	index,
}: {
	name: string;
	avatar: string;
	points: number;
	index: number;
}) {
	return (
		<div className="flex flex-row items-center gap-2">
			<h1 className="font-mono text-2xl font-semibold">{index}.</h1>
			<Avatar>
				<AvatarImage alt={name} src={avatar} />
				<AvatarFallback>{name}</AvatarFallback>
			</Avatar>
			<div className="flex flex-col">
				<h2 className="text-xl font-semibold">{name}</h2>
				<p className="text-secondary-foreground font-mono">{points}</p>
			</div>
		</div>
	);
}
