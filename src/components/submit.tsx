import { useState } from 'react';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card';
import { Label } from './ui/label';
import {
	SelectItem,
	SelectLabel,
	Select,
	SelectContent,
	SelectGroup,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import { ScrollArea } from './ui/scroll-area';
import { SingleTask, DailyTask, MultiTask } from './task';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function Submit() {
	const [type, setType] = useState<string>('');

	return (
		<Card className="flex h-[80vh] flex-col">
			<CardHeader>
				<CardTitle className="text-3xl">Submit</CardTitle>
			</CardHeader>
			<CardContent>
				<Label className="text-lg font-medium" id="type">
					Type
				</Label>
				<Select onValueChange={setType}>
					<SelectTrigger className="mb-4 mt-1 w-[40%]" id="type">
						<SelectValue placeholder="Select a type" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Type</SelectLabel>
							<SelectItem value="single">Single</SelectItem>
							<SelectItem value="daily">Daily</SelectItem>
							<SelectItem value="multi">Multi</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
				{type == 'single' ? (
					<Single />
				) : type == 'daily' ? (
					<Daily />
				) : type == 'multi' ? (
					<Multi />
				) : (
					<></>
				)}
			</CardContent>
			<CardFooter className="ml-auto mt-auto">
				<Button>Submit</Button>
			</CardFooter>
		</Card>
	);
}

function Single() {
	const [selected, setSelected] = useState<Task | null>(null);
	const tasks: Task[] = [
		{
			name: "Talk with someone you haven't talked to for 5+ years",
			type: 'single',
			points: 2,
			category: 'normal',
		},
		{
			name: 'Go to prom',
			type: 'single',
			points: 5,
			category: 'normal',
		},
		{
			name: "Go on a date (needs proof, can't be with other participants, must be IRL, must be romantic, must be over 1 hour, must be with preferred gender)",
			type: 'single',
			points: 5,
			category: 'normal',
		},
		{
			name: "Eat something which you haven't ate before",
			type: 'single',
			points: 1,
			category: 'normal',
		},
		{
			name: "Go to someplace far away (10+ miles) which you haven't gone before",
			type: 'single',
			points: 1,
			category: 'normal',
		},
		{
			name: '',
			type: 'single',
			points: 0,
			category: 'health',
		},
	];
	return (
		<>
			<Label htmlFor="tasks" className="text-lg font-medium">
				Tasks
			</Label>
			<div className="mb-4 mt-1 flex h-[30vh] flex-col">
				<div className="grid w-full grid-cols-[45%,35%,10%] gap-[5%] rounded-t-md border-x border-t px-[5%] py-2 text-lg font-medium">
					<h3>Name</h3>
					<h3>Category</h3>
					<h3>Points</h3>
				</div>
				<ScrollArea
					className="w-full rounded-b-md border border-t-2"
					id="tasks">
					<div className="my-3 flex flex-col gap-3">
						{tasks.map((task) => (
							<SingleTask
								task={task}
								selected={selected}
								setSelected={setSelected}
							/>
						))}
					</div>
				</ScrollArea>
			</div>

			<Label htmlFor="info" className="text-lg font-medium">
				More info
			</Label>
			<Textarea
				id="info"
				placeholder="Put a bit more info about your task completion"
				className="mt-1 h-max resize-none"
			/>
		</>
	);
}

function Daily() {
	const [selTasks, setSelTasks] = useState<Task[]>([]);
	const tasks: Task[] = [
		{
			name: 'Go to sleep before 1:30 AM',
			type: 'daily',
			points: 2,
			category: 'health',
			amount: 3,
		},
		{
			name: 'Drink 6 glasses of water every day (although 8 is better)',
			type: 'daily',
			points: 4,
			category: 'health',
			amount: 3,
		},
		{
			name: 'Have at least 6 hours of sleep that night (obviously only one point a day)',
			type: 'daily',
			points: 2,
			category: 'health',
			amount: 3,
		},
		{
			name: 'Watch the news (max of one point per day)',
			type: 'daily',
			points: 1,
			category: 'normal',
			amount: 3,
		},
		{
			name: 'Go a day without video games (Does not conflict with the Play Among Us task unless you play more than 1 round of Among Us)',
			type: 'daily',
			points: 2,
			category: 'productivity',
			amount: 2,
		},
		{
			name: 'Be productive for 5 hours after school on a school day, 10 hours on a non-school day',
			type: 'daily',
			points: 3,
			category: 'productivity',
			amount: 3,
		},
		{
			name: '',
			type: 'daily',
			points: 0,
			category: 'insane',
			amount: 4,
		},
	];

	return (
		<>
			<Label htmlFor="tasks" className="text-lg font-medium">
				Tasks
			</Label>
			<div className="mb-4 mt-1 flex h-[30vh] flex-col">
				<div className="grid w-full grid-cols-[40%,25%,10%,10%] gap-[5%] rounded-t-md border-x border-t px-[5%] py-2 text-lg font-medium">
					<h3>Name</h3>
					<h3>Category</h3>
					<h3>Points</h3>
					<h3>#</h3>
				</div>
				<ScrollArea
					className="h-full w-full rounded-b-md border border-t-2"
					id="tasks">
					<div className="my-3 flex flex-col gap-3">
						{tasks.map((task) => (
							<DailyTask
								task={task}
								selTasks={selTasks}
								setSelTasks={setSelTasks}
							/>
						))}
					</div>
				</ScrollArea>
			</div>

			<Label htmlFor="info" className="text-lg font-medium">
				More info
			</Label>
			<Textarea
				id="info"
				placeholder="Put a bit more info about your task completion"
				className="mt-1 h-max resize-none"
			/>
		</>
	);
}

function Multi() {
	const [selected, setSelected] = useState<Task | null>(null);
	const [increment, setIncrement] = useState<number>(1);

	const tasks: Task[] = [
		{
			name: 'Exercise for an hour (one point per hour, PE does not count)',
			type: 'multi',
			points: 5,
			category: 'health',
			amount: 5,
		},
		{
			name: "Go outside for an hour (one point per hour, school doesn't count, you can't be inside a building)",
			type: 'multi',
			points: 3,
			category: 'health',
			amount: 14,
		},
		{
			name: 'Meditate for at least 20 minutes (one point per 20 minutes)',
			type: 'multi',
			points: 1,
			category: 'health',
			amount: 0,
		},
		{
			name: 'Do a T-25 video (fitness video)',
			type: 'multi',
			points: 1,
			category: 'health',
			amount: 0,
		},
		{
			name: 'Times homework was late (one point for each late assignment, least points win)',
			type: 'multi',
			points: 3,
			category: 'productivity',
			amount: 0,
		},
		{
			name: "Read a book that was not assigned in school (must finish book. can't be a children's book/manga 200 page minimum)",
			type: 'multi',
			points: 2,
			category: 'productivity',
			amount: 0,
		},
	];

	return (
		<>
			<Label htmlFor="tasks" className="text-lg font-medium">
				Tasks
			</Label>
			<div className="mb-4 mt-1 flex h-[30vh] flex-col">
				<div className="grid w-full grid-cols-[40%,25%,10%,10%] gap-[5%] rounded-t-md border-x border-t px-[5%] py-2 text-lg font-medium">
					<h3>Name</h3>
					<h3>Category</h3>
					<h3>Points</h3>
					<h3>#</h3>
				</div>
				<ScrollArea
					className="h-full w-full rounded-b-md border border-t-2"
					id="tasks">
					<div className="my-3 flex flex-col gap-3">
						{tasks.map((task) => (
							<MultiTask
								task={task}
								selected={selected}
								setSelected={setSelected}
							/>
						))}
					</div>
				</ScrollArea>
			</div>
			<div className="grid grid-cols-[75%,20%] gap-[5%]">
				<Label htmlFor="info" className="text-lg font-medium">
					More info
				</Label>
				<Textarea
					id="info"
					placeholder="Put a bit more info about your task completion"
					className="row-start-2 mt-1 h-max resize-none"
				/>

				<Label htmlFor="increment" className="text-lg font-medium">
					Increment
				</Label>
				<Input
					defaultValue={increment}
					className="mb-4 mt-1"
					type="number"
					onChange={(e) => {
						setIncrement(+e.target.value);
						console.log(+e.target.value);
					}}
					min={1}
				/>
			</div>
		</>
	);
}
