import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export default function LeaderboardUser() {
	return (
		<div>
			<h1>#.</h1>
			<Avatar>
				<AvatarImage />
				<AvatarFallback>Name here</AvatarFallback>
			</Avatar>
			<h2>Name here</h2>
			<p>Point Value</p>
		</div>
	);
}
