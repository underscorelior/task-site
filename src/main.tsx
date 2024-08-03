import React from 'react';
import ReactDOM from 'react-dom/client';
import Leaderboard from './components/leaderboard';
import './globals.css';
import Sidebar from './components/sidebar';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';

export function App() {
	return (
		<main className="grid min-h-screen w-full grid-cols-[20%,55%,25%] items-center justify-center gap-x-4 overflow-x-hidden">
			<section className="w-full">
				<Sidebar />
			</section>
			<section className="w-full">
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
						<Card className="h-[75vh]">
							<CardHeader>
								<CardTitle>Table</CardTitle>
								<CardDescription></CardDescription>
							</CardHeader>
							<CardContent></CardContent>
							<CardFooter></CardFooter>
						</Card>
					</TabsContent>
					<TabsContent value="submit">
						<Card className="h-[75vh]">
							<CardHeader>
								<CardTitle>Submit</CardTitle>
								<CardDescription></CardDescription>
							</CardHeader>
							<CardContent></CardContent>
							<CardFooter></CardFooter>
						</Card>
					</TabsContent>
					<TabsContent value="verify">
						<Card className="h-[75vh]">
							<CardHeader>
								<CardTitle>Verify</CardTitle>
								<CardDescription></CardDescription>
							</CardHeader>
							<CardContent></CardContent>
							<CardFooter></CardFooter>
						</Card>
					</TabsContent>
				</Tabs>
			</section>
			<section className="col-start-3 flex h-full w-full items-center justify-center">
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
