import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Leaderboard from './components/leaderboard';
import './globals.css';
import Sidebar from './components/sidebar';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from './components/ui/card';
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
import { Toaster } from 'react-hot-toast';

// TODO: MAKE SURE TO CHECK PERMS ON EVERY SINGLE REQUEST

export default function App() {
	const [hasCode, setHasCode] = useState<boolean>(true);
	const [hasUser, setHasUser] = useState<boolean>(false);

	useEffect(() => {
		if (localStorage.getItem('code') !== process.env.PERMISSION_CODE) {
			setHasCode(false);
		} else {
			setHasCode(true);
		}
	}, []);

	return (
		<main className="grid min-h-screen w-full grid-cols-[22.5%,61%,16.5%] items-center justify-center gap-x-4 overflow-x-hidden">
			<Toaster />
			{!hasCode && <CodeDialog setHasCode={setHasCode} />}
			<section className="w-full max-w-sm">
				<Sidebar hasCode={hasCode} setHasUser={setHasUser} />
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
							disabled={!hasCode || !hasUser}>
							Submit
						</TabsTrigger>
						<TabsTrigger
							value="verify"
							className="w-full"
							disabled={!hasCode || !hasUser}>
							Verify
						</TabsTrigger>
					</TabsList>
					<TabsContent value="table">
						<TaskTable />
					</TabsContent>
					<TabsContent value="submit">
						<Submit />
					</TabsContent>
					<TabsContent value="verify">
						<Card className="h-[80vh]">
							<CardHeader>
								<CardTitle className="text-3xl">Verify</CardTitle>
							</CardHeader>
							<CardContent></CardContent>
							<CardFooter></CardFooter>
						</Card>
					</TabsContent>
				</Tabs>
			</section>
			<section className="col-start-3 ml-auto flex h-full w-full max-w-sm items-center justify-center">
				<Leaderboard />
			</section>
		</main>
	);
}

export function CodeDialog({
	trigger = false,
	setHasCode,
}: {
	trigger?: boolean;
	setHasCode: (c: boolean) => void;
}) {
	const [code, setCode] = useState<string>('');
	const [wrong, setWrong] = useState<boolean>(false);

	function submit() {
		if (process.env.PERMISSION_CODE === code) {
			setHasCode(true);
			localStorage.setItem('code', code);
		} else {
			setWrong(true);
		}
	}

	return (
		<AlertDialog defaultOpen={!trigger}>
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
