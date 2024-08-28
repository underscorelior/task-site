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
import { CreateSelect } from './create-select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import toast from 'react-hot-toast';
import { ModeToggle } from "./mode-toggle";

export default function Sidebar({
	hasCode,
	tasks,
	setTasks,
	user,
	setUser,
}: {
	hasCode: boolean;
	tasks: Task[];
	setTasks: (t: Task[]) => void;
	user: User | null;
	setUser: (u: User | null) => void;
}) {
	const [avatar, setAvatar] = useState<string>('');

	async function updateUser() {
		const re = fetch(
			`/api/update_user?name=${user?.name.toLowerCase()}&avatar=${encodeURIComponent(avatar)}&code=${encodeURIComponent(localStorage.code)}`,
			{
				method: 'POST',
			},
		);

		toast.promise(re, {
			loading: 'Loading',
			success: '',
			error: '',
		});

		const res = await re;

		if (res.status == 200) setUser((await res.json()) as User);
		else toast.error(`We ran into an error, ${(await res.json()).message}`);
	}

	return (
		<Tabs
			className="flex w-full flex-col items-center justify-center pl-2"
			defaultValue="user">
			<TabsList className="w-[80%]">
				<TabsTrigger value="user" className="w-full">
					User
				</TabsTrigger>
				<TabsTrigger
					value="task"
					className="w-full"
					disabled={!hasCode || user == null}>
					Task
				</TabsTrigger>
			</TabsList>
			<TabsContent value="user" className="w-full">
				<Card
					side={'left'}
					className="flex h-full min-h-[40vh] w-full flex-col">
					<div className="flex flex-row justify-between">
						<CardHeader className="pt-8">
							<CardTitle>User</CardTitle>
							<CardDescription></CardDescription>
						</CardHeader>
						<div className="w-fit p-6"><ModeToggle></ModeToggle></div>
					</div>
					<CardContent className={`${!hasCode && 'text-muted-foreground'}`}>
						<Label htmlFor="name">Name</Label>
						<Input
							value={hasCode && user ? user.name : localStorage.name || ''}
							placeholder="Loading user information..."
							id="name"
							className="mb-6 capitalize"
							readOnly
							disabled={!hasCode}
						/>
						<Label htmlFor="avatar">User Avatar</Label>
						<Input
							id="avatar"
							placeholder="Paste an image link here"
							onChange={(evt) => setAvatar(evt.target.value)}
							disabled={!hasCode}
						/>
					</CardContent>
					<CardFooter className="mt-auto">
						<Button
							variant={'outline'}
							className="ml-auto"
							disabled={!hasCode || avatar == ''}
							onClick={async () => {
								if (hasCode && user) {
									await updateUser();
								}
							}}>
							Save
						</Button>
					</CardFooter>
				</Card>
			</TabsContent>
			<TabsContent value="task" className="w-full">
				<Card
					side={'left'}
					className="flex h-full min-h-[40vh] w-full flex-col">
					<CardHeader>
						<CardTitle>Tasks</CardTitle>
						<CardDescription></CardDescription>
					</CardHeader>
					<CardContent className="flex h-full w-full items-center justify-center">
						<CreateSelect tasks={tasks} setTasks={setTasks} />
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
}
