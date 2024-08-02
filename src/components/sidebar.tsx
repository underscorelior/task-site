import { Button } from './ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card';
import { CreateSelect } from './ui/create-select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export default function Sidebar() {
	return (
		<Tabs
			className="flex w-full flex-col items-center justify-center pl-2"
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
				<Card
					side={'left'}
					className="flex h-full min-h-[55vh] w-full flex-col justify-between">
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
				<Card
					side={'left'}
					className="flex h-full min-h-[55vh] w-full flex-col justify-between">
					<CardHeader>
						<CardTitle>Tasks</CardTitle>
						<CardDescription></CardDescription>
					</CardHeader>
					<CardContent className="flex items-center justify-center">
						<CreateSelect />
					</CardContent>
					<CardFooter>
						{/* TODO: Make it popup with a thing saying "saving" */}
						<Button variant={'outline'} className="ml-auto">
							Save
						</Button>
					</CardFooter>
				</Card>
			</TabsContent>
		</Tabs>
	);
}
