import { Button } from './ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export default function Sidebar() {
	return (
		<Tabs
			className="flex w-full flex-col items-center justify-center"
			defaultValue="user">
			<TabsList className="w-[80%]">
				<TabsTrigger value="user" className="w-full">
					User
				</TabsTrigger>
				<TabsTrigger value="task" className="w-full">
					Task
				</TabsTrigger>
			</TabsList>
			<TabsContent value="user" className="w-full">
				<Card side={'left'}>
					<CardHeader>
						<CardTitle>User</CardTitle>
						<CardDescription></CardDescription>
					</CardHeader>
					<CardContent className="">
						<Label htmlFor="name">Name</Label>
						<Input defaultValue={'Name'} id="name" className="mb-6" />
						<Label htmlFor="pfp">Profile Picture</Label>
						<Input id="pfp" type="file" />
					</CardContent>
					<CardFooter>
						{/* TODO: Make it popup with a thing saying "saving" */}
						<Button variant={'outline'} className="ml-auto">
							Save
						</Button>
					</CardFooter>
				</Card>
			</TabsContent>
			<TabsContent value="task" className="w-full">
				<Card side={'left'}>
					<CardHeader>
						<CardTitle>Tasks</CardTitle>
						<CardDescription></CardDescription>
					</CardHeader>
					<CardContent></CardContent>
					<CardFooter></CardFooter>
				</Card>
			</TabsContent>
		</Tabs>
	);
}
