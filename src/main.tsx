import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Leaderboard from './components/leaderboard';
import './globals.css';
import Sidebar from './components/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import Submit from './components/submit';
import { TaskTable } from './components/table';
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import toast, { Toaster } from 'react-hot-toast';
import { Label } from './components/ui/label';
import Verify from './components/verify';

export async function fetchTasks(setTasks: (t: Task[]) => void) {
	const res = await fetch(
		`/api/get_tasks?code=${encodeURIComponent(localStorage.code)}`,
		{ method: 'GET' },
	);

	if (res.status == 200) setTasks((await res.json()) as Task[]);
	else
		toast.error(
			`We ran into an error when loading tasks, ${(await res.json()).message}`,
		);
}

export default function App() {
	const [hasCode, setHasCode] = useState<boolean>(true);
	const [user, setUser] = useState<User | null>(null);
	const [tasks, setTasks] = useState<Task[]>([]);
	const [verify, setVerify] = useState<Verify[]>([]);
	const [open, setOpen] = useState<boolean>(true);

	useEffect(() => {
		async function fetchUser() {
			const re = fetch(
				`/api/get_user?name=${localStorage.getItem('name')}&code=${encodeURIComponent(localStorage.code)}`,
				{
					method: 'POST',
				},
			);

			toast.promise(re, {
				loading: 'Loading user data...',
				success: '',
				error: '',
			});

			const res = await re;

			if (res.status == 200) setUser((await res.json()) as User);
			else
				toast.error(
					`We ran into an error loading your user data, ${(await res.json()).message}`,
				);
		}

		async function fetchVerify() {
			const res = await fetch(
				'/api/get_submissions?code=${encodeURIComponent(localStorage.code)}',
				{ method: 'GET' },
			);

			if (res.status == 200) setVerify((await res.json()) as Verify[]);
			else
				toast.error(
					`We ran into an error when loading tasks, ${(await res.json()).message}`,
				);
		}

		fetchTasks(setTasks);
		fetchVerify();

		if (localStorage.getItem('code') !== process.env.PERMISSION_CODE) {
			setHasCode(false);
		} else {
			setHasCode(true);
			fetchUser();
		}
	}, []);

	return (
		<main className="grid min-h-screen w-full grid-cols-[19%,62%,19%] items-center justify-center gap-x-4 overflow-x-hidden">
			<Toaster />
			{!hasCode && (
				<CodeDialog
					setHasCode={setHasCode}
					setUser={setUser}
					open={open}
					setOpen={setOpen}
				/>
			)}
			<section className="w-full max-w-sm">
				<Sidebar
					hasCode={hasCode}
					user={user as User}
					setUser={setUser}
					tasks={tasks}
					setTasks={setTasks}
				/>
			</section>
			<section className="mx-auto w-full max-w-7xl">
				<Tabs defaultValue="table">
					<TabsList className="w-[33.33%]">
						<TabsTrigger value="table" className="w-full">
							Table
						</TabsTrigger>
						<TabsTrigger
							value="submit"
							className="w-full"
							disabled={!hasCode || user == null}>
							Submit
						</TabsTrigger>
						<TabsTrigger
							value="verify"
							className="w-full"
							disabled={!hasCode || user == null}>
							Verify
						</TabsTrigger>
					</TabsList>
					<TabsContent value="table" className="h-full w-full">
						<TaskTable tasks={tasks} />
						{!hasCode && (
							<div className="mt-auto flex h-full w-full items-center justify-end">
								<Button className="m-10 mx-auto" onClick={() => setOpen(true)}>
									Open Login
								</Button>
							</div>
						)}
					</TabsContent>
					<TabsContent value="submit">
						<Submit
							user={user as User}
							tasks={tasks}
							setTasks={setTasks}
							verify={verify}
							setVerify={setVerify}
						/>
					</TabsContent>
					<TabsContent value="verify">
						<Verify
							user={user as User}
							tasks={tasks}
							setTasks={setTasks}
							verify={verify}
							setVerify={setVerify}
						/>
					</TabsContent>
				</Tabs>
			</section>
			<section className="col-start-3 ml-auto flex h-full w-full max-w-sm items-center justify-center">
				<Leaderboard user={user} tasks={tasks} />
			</section>
		</main>
	);
}

export function CodeDialog({
	trigger = false,
	setHasCode,
	setUser,
	open,
	setOpen,
}: {
	trigger?: boolean;
	setHasCode: (c: boolean) => void;
	setUser: (u: User) => void;
	open: boolean;
	setOpen: (o: boolean) => void;
}) {
	const [code, setCode] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [wrong, setWrong] = useState<boolean>(false);

	async function submit() {
		if (process.env.PERMISSION_CODE === code) {
			localStorage.setItem('code', code);
		} else {
			setWrong(true);
			return;
		}

		const re = fetch(
			`/api/get_user?name=${name.toLowerCase()}&code=${encodeURIComponent(localStorage.code)}`,
			{
				method: 'POST',
			},
		);

		toast.promise(re, {
			loading: 'Loading',
			success: '',
			error: '',
		});

		if (name && (await re).status == 200) {
			localStorage.setItem('name', name.toLowerCase());
		} else {
			setWrong(true);
			return;
		}

		setHasCode(true);
		setUser((await (await re).json()) as User);
	}

	return (
		<AlertDialog onOpenChange={setOpen} open={open}>
			{trigger && <AlertDialogTrigger>Insert Code</AlertDialogTrigger>}
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Enter Code</AlertDialogTitle>
					<AlertDialogDescription>
						You will be unable to register as a user, edit tasks, or submit
						completions without the code.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<div>
					<Label htmlFor="code">Code</Label>
					<Input
						id="code"
						placeholder="Put code here"
						onChange={(evt) => setCode(evt.target.value)}
						className="mb-0"
					/>
					{wrong && (
						<p className="text-sm text-red-400">
							The code you have inputted is incorrect.
						</p>
					)}
				</div>
				<div>
					<Label htmlFor="name">Name</Label>
					<Input
						id="name"
						placeholder="Put name here"
						onChange={(evt) => setName(evt.target.value)}
						className="mb-0"
					/>
				</div>
				<AlertDialogFooter>
					<AlertDialogCancel>Continue</AlertDialogCancel>
					<Button onClick={() => submit()}>Submit</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
