import { useState } from 'react';
import { Button } from './ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card';
import { Combobox } from './ui/create-select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export default function Sidebar() {
	const [selected, setSelected] = useState<string>('');
	// const [tasks, setTasks] = useState<Task[]>([
	//     {

	//     }
	// ]);
	const [tasks, setTasks] = useState<{ name: string }[]>([
		{ name: 'AAA' },
		{ name: 'BBB' },
		{ name: 'CCC' },
		{ name: 'DDD' },
		{ name: 'EEE' },
	]);
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
				<Card side={'left'} className="pt-6">
					{/* <CardHeader>
						<CardTitle>User</CardTitle>
						<CardDescription></CardDescription>
					</CardHeader> */}
					<CardContent>
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
				<Card side={'left'} className="pb-3 pt-3">
					{/* <CardHeader>
						// <CardTitle>Tasks</CardTitle>
						<CardDescription></CardDescription>
					</CardHeader> */}
					<CardContent>
						{/* <Tabs defaultValue="edit">
							<TabsList className="w-full">
								<TabsTrigger value="edit" className="w-full">
									Edit
								</TabsTrigger>
								<TabsTrigger value="create" className="w-full">
									Create
								</TabsTrigger>
							</TabsList>
							<TabsContent value="edit">
								<h1>Editing Task</h1>
							</TabsContent>
							<TabsContent value="create">
								<h1>Create New Task</h1>
							</TabsContent>
						</Tabs> */}
					</CardContent>
					<Combobox
						options={tasks}
						placeholder="Select option..."
						selected={selected}
						onChange={setSelected}
					/>
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
