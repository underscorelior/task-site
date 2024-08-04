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
import Task, { DailyTask } from './task';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

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
					<></>
				) : type == 'multi' ? (
					<>
						<Label className="text-lg font-medium" id="category">
							Category
						</Label>
						<Select defaultValue="health">
							<SelectTrigger className="mt-1 w-[40%]" id="category">
								<SelectValue placeholder="Select a category" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Category</SelectLabel>
									<SelectItem value="health">Health</SelectItem>
									<SelectItem value="normal">Become Normal</SelectItem>
									<SelectItem value="cool">POV: Cool</SelectItem>
									<SelectItem value="productivity">Productivity</SelectItem>
									<SelectItem value="insane">INSANE</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</>
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
			category: 'Become Normal',
		},
		{
			name: 'Go to prom',
			type: 'single',
			points: 5,
			category: 'Become Normal',
		},
		{
			name: "Go on a date (needs proof, can't be with other participants, must be IRL, must be romantic, must be over 1 hour, must be with preferred gender)",
			type: 'single',
			points: 5,
			category: 'Become Normal',
		},
		{
			name: "Eat something which you haven't ate before",
			type: 'single',
			points: 1,
			category: 'Become Normal',
		},
		{
			name: "Go to someplace far away (10+ miles) which you haven't gone before",
			type: 'single',
			points: 1,
			category: 'Become Normal',
		},
		{
			name: '',
			type: 'single',
			points: 0,
			category: '',
		},
		// {
		// 	name: '',
		// 	type: 'single',
		// 	points: 0,
		// 	category: '',
		// },
	];
	return (
		<>
			<Label htmlFor="tasks" className="text-lg font-medium">
				Tasks
			</Label>
			<ScrollArea
				className="mb-4 mt-1 h-[30vh] w-full rounded-md border"
				id="tasks">
				<div className="my-3 flex flex-col gap-3">
					{tasks.map((task) => (
						<Task task={task} selected={selected} setSelected={setSelected} />
					))}
				</div>
			</ScrollArea>

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
			name: '',
			type: 'daily',
			points: 0,
			category: '',
		},
		{
			name: '',
			type: 'daily',
			points: 0,
			category: '',
		},
	];

	return (
		<>
			<Label htmlFor="tasks" className="text-lg font-medium">
				Tasks
			</Label>
			<ScrollArea
				className="mb-4 mt-1 h-[30vh] w-full rounded-md border"
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
		</>
	);
}
