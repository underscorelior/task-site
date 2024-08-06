import { useEffect, useState } from 'react';
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
import toast from 'react-hot-toast';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from './ui/alert-dialog';

export default function Sidebar({ hasCode }: { hasCode: boolean }) {
	const [user, setUser] = useState<User>();
	const [hasUser, setHasUser] = useState<boolean>(false);

	useEffect(() => {
		async function fetchUser() {
			if (hasCode)
				if (localStorage.getItem('user_uuid')) {
					const res = await fetch(
						`/api/find_user?uuid=${localStorage.getItem('user_uuid')}`,
						{
							method: 'POST',
						},
					);

					const out = await res.json();

					if (out.status == 200) {
						setUser(out);
						setHasUser(true);
					} else {
						toast.error(out.message);
						setHasUser(false);
					}
				} else {
					setHasUser(false);
				}
		}
		fetchUser();
	}, []);

	return (
		<Tabs
			className="flex w-full flex-col items-center justify-center pl-2"
			defaultValue="user">
			<TabsList className="w-[80%]">
				<TabsTrigger value="user" className="w-full">
					User
				</TabsTrigger>
				<TabsTrigger value="task" className="w-full" disabled={!hasCode}>
					Task
				</TabsTrigger>
			</TabsList>
			<TabsContent value="user" className="w-full">
				<Card
					side={'left'}
					className="flex h-full min-h-[55vh] w-full flex-col">
					{hasUser ? (
						<>
							<CardHeader>
								<CardTitle>User</CardTitle>
								<CardDescription></CardDescription>
							</CardHeader>
							<CardContent className={`${!hasCode && 'text-muted-foreground'}`}>
								<Label htmlFor="name">Name</Label>
								<Input
									defaultValue={hasCode && hasUser && user ? user.name : ''}
									placeholder="Enter your username"
									id="name"
									className="mb-6"
									disabled={!hasCode}
								/>
								<Label htmlFor="pfp">Profile Picture</Label>
								<Input
									id="pfp"
									placeholder="Paste an image link here"
									disabled={!hasCode}
								/>
							</CardContent>
							<CardFooter className="mt-auto">
								{/* TODO: Make it popup with a thing saying "saving" */}
								<Button
									variant={'outline'}
									className="ml-auto"
									disabled={!hasCode}>
									Save
								</Button>
							</CardFooter>
						</>
					) : (
						<CreateUser setHasUser={setHasUser} setUser={setUser} />
					)}
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
						<Button variant={'outline'} className="ml-auto" disabled={!hasCode}>
							Save
						</Button>
					</CardFooter>
				</Card>
			</TabsContent>
		</Tabs>
	);
}

function CreateUser({
	setHasUser,
	setUser,
}: {
	setHasUser: (b: boolean) => void;
	setUser: (u: User) => void;
}) {
	const [name, setName] = useState<string>('');
	const [pfp, setPfp] = useState<string>('');

	async function submit() {
		const res = await fetch(`/api/create_user?name=${name}&pfp=${pfp}`, {
			method: 'POST',
		});

		const out = await res.json();
		console.log(out);

		if (out.status == 200) {
			setUser(out);
			setHasUser(true);
			console.log(out + ' BBB');
		} else {
			toast.error(out.message);
			setHasUser(false);
		}
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger className="my-auto">
				<Button size={'lg'}>Create account</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Create Account</AlertDialogTitle>
					<AlertDialogDescription></AlertDialogDescription>
				</AlertDialogHeader>
				<Label htmlFor="createname">
					Name <span className="text-red-600">*</span>
				</Label>
				<Input
					id="createname"
					placeholder="Username"
					onChange={(evt) => setName(evt.target.value)}
				/>
				<Label htmlFor="createpfp">PFP</Label>
				<Input
					id="createpfp"
					placeholder="User profile picture (optional)"
					onChange={(evt) => setPfp(evt.target.value)}
				/>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<Button onClick={submit} disabled={!name}>
						Create
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
