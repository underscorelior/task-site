import React from 'react';
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

export function App() {
	return (
		<main className="grid min-h-screen w-full grid-cols-[21%,62.5%,16.5%] items-center justify-center gap-x-4 overflow-x-hidden">
			<section className="w-full max-w-lg">
				<Sidebar />
			</section>
			<section className="mx-auto w-full max-w-5xl">
				<Tabs defaultValue="table">
					<TabsList className="w-[33.33%]">
						<TabsTrigger value="table" className="w-full">
							Table
						</TabsTrigger>
						<TabsTrigger value="submit" className="w-full">
							Submit
						</TabsTrigger>
						<TabsTrigger value="verify" className="w-full">
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

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
