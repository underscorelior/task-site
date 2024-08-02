import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card';

export default function Sidebar() {
	return (
		<Card side={'left'}>
			<CardHeader>
				<CardTitle></CardTitle>
				<CardDescription></CardDescription>
			</CardHeader>
			<CardContent></CardContent>
			<CardFooter></CardFooter>
		</Card>
	);
}
