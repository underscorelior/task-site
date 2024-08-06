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
import { CreateSelect } from './create-select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import toast from 'react-hot-toast';
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from './ui/alert-dialog';

export default function Sidebar({
	hasCode,
	hasUser,
	setHasUser,
}: {
	hasCode: boolean;
	hasUser: boolean;
	setHasUser: (b: boolean) => void;
}) {
	const [user, setUser] = useState<User>();
	const [showCreate, setShowCreate] = useState<boolean>(false);

	useEffect(() => {
		async function fetchUser() {
			console.log(hasUser);
			if (hasCode) {
				if (localStorage.getItem('user_uuid')) {
					const res = await fetch(
						`/api/find_user?uuid=${localStorage.getItem('user_uuid')}`,
						{
							method: 'POST',
						},
					);

					const out = await res.json();
					console.log(out, res.status);
					if (res.status == 200) {
						setUser(out as User);
						setHasUser(true);
					} else {
						toast.error(out.message);
						setShowCreate(true);
					}
				} else {
					setShowCreate(true);
				}
			}
			console.table({ user, showCreate, hasCode, hasUser });
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
				<TabsTrigger
					value="task"
					className="w-full"
					disabled={!hasCode || !hasUser}>
					Task
				</TabsTrigger>
			</TabsList>
			<TabsContent value="user" className="w-full">
				<button
					onClick={() => console.table({ user, showCreate, hasCode, hasUser })}>
					AAA
				</button>
				<Card
					side={'left'}
					className="flex h-full min-h-[55vh] w-full flex-col">
					{!hasUser && !showCreate && (!user || user) ? (
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
									disabled={!hasCode || !hasUser}
								/>
								<Label htmlFor="pfp">Profile Picture</Label>
								<Input
									id="pfp"
									placeholder="Paste an image link here"
									disabled={!hasCode || !hasUser}
								/>
							</CardContent>
							<CardFooter className="mt-auto">
								{/* TODO: Make it popup with a thing saying "saving" */}
								<Button
									variant={'outline'}
									className="ml-auto"
									disabled={!hasCode || !hasUser}>
									Save
								</Button>
							</CardFooter>
						</>
					) : (
						<CreateUser
							setHasUser={setHasUser}
							setUser={setUser}
							setShowCreate={setShowCreate}
						/>
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
						<Button
							variant={'outline'}
							className="ml-auto"
							disabled={!hasCode || !hasUser}>
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
	setShowCreate,
}: {
	setHasUser: (b: boolean) => void;
	setUser: (u: User) => void;
	setShowCreate: (b: boolean) => void;
}) {
	const [name, setName] = useState<string>('');
	const [pfp, setPfp] = useState<string>('');

	async function submit() {
		let re = fetch(`/api/create_user?name=${name}&pfp=${pfp}`, {
			method: 'POST',
		});

		toast.promise(re, {
			loading: 'Loading...',
			success: 'Request completed',
			error: 'We ran into an error when creating your account',
		});

		const res = await re;
		const out = ((await res.json()) as [User])[0];

		if (res.status == 200) {
			setUser(out);
			setHasUser(true);
			setShowCreate(true);
			localStorage.setItem('user_uuid', out.id);
		} else {
			toast.error((await res.json()).message);
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
