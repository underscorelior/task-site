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

export default function Sidebar({
	hasCode,
	setHasUser,
}: {
	hasCode: boolean;
	setHasUser: (b: boolean) => void;
}) {
	const [user, setUser] = useState<User>();
	const [name, setName] = useState<string>('');
	const [pfp, setPfp] = useState<string>('');

	async function createAccount() {
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
			localStorage.setItem('username', out.name);
		} else {
			toast.error((await res.json()).message);
			setHasUser(false);
		}
	}

	async function fetchUser() {
		if (hasCode) {
			const re = fetch(
				`/api/find_user?name=${localStorage.getItem('username')?.toLowerCase()}`,
				{
					method: 'POST',
				},
			);

			toast.promise(re, {
				loading: 'Loading...',
				success: 'Request completed',
				error: 'We ran into an error when trying to look for your account',
			});

			const res = await re;

			const out = await res.json();
			console.log(out, res.status);
			if (res.status == 200) {
				setUser(out as User);
				setHasUser(true);
			} else if (res.status == 404) {
				createAccount();
			} else {
				toast.error(out.message);
			}
		}
	}

	useEffect(() => {
		if (
			localStorage.getItem('username') &&
			localStorage.getItem('username') !== 'undefined'
		) {
			fetchUser();
		} else if (localStorage.getItem('username') === 'undefined') {
			localStorage.removeItem('username');
		}
	}, [hasCode]);

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
					className="flex h-full min-h-[40vh] w-full flex-col">
					<CardHeader>
						<CardTitle>User</CardTitle>
						<CardDescription></CardDescription>
					</CardHeader>
					<CardContent className={`${!hasCode && 'text-muted-foreground'}`}>
						<Label htmlFor="name">Name</Label>
						<Input
							defaultValue={
								hasCode
									? user
										? user.name
										: localStorage.getItem('username') || ''
									: ''
							}
							placeholder="Enter your username"
							id="name"
							className="mb-6"
							disabled={!hasCode}
							onChange={(evt) => setName(evt.target.value.toLowerCase())}
						/>
						<Label htmlFor="pfp">Profile Picture</Label>
						<Input
							id="pfp"
							placeholder="Paste an image link here"
							onChange={(evt) => setPfp(evt.target.value)}
							disabled={!hasCode}
						/>
					</CardContent>
					<CardFooter className="mt-auto">
						{/* TODO: Make it popup with a thing saying "saving" */}
						<Button
							variant={'outline'}
							className="ml-auto"
							disabled={!hasCode}
							onClick={async () => {
								localStorage.setItem('username', name.toLowerCase());
								await fetchUser();
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
					<CardContent className="flex h-full items-center justify-center">
						<CreateSelect />
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
}
