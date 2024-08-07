import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Skeleton } from './ui/skeleton';

export default function LeaderboardUser({
	name,
	avatar,
	score = 0,
	index,
}: {
	name: string;
	avatar: string;
	score?: number;
	index: number;
}) {
	return (
		<div className="flex flex-row items-center gap-2">
			<h1 className="font-mono text-xl font-semibold">{index}.</h1>
			<Avatar>
				<AvatarImage alt={name} src={avatar} className="object-cover" />
				<AvatarFallback className="capitalize">{name}</AvatarFallback>
			</Avatar>
			<div className="flex flex-col">
				<h2 className="-mb-1 text-lg font-semibold capitalize">{name}</h2>
				<p className="text-secondary-foreground font-mono text-base">{score}</p>
			</div>
		</div>
	);
}

export function LoadingLBUser({ index }: { index: number }) {
	return (
		<div className="flex flex-row items-center gap-2 py-1">
			<h1 className="font-mono text-xl font-semibold">{index}.</h1>
			<Skeleton className="aspect-square size-10 rounded-full" />
			<div className="flex w-[50%] flex-col">
				<Skeleton className="mb-1 h-[1.125rem]" />{' '}
				<Skeleton className="h-3 w-[15%] rounded-sm" />
			</div>
		</div>
	);
}
