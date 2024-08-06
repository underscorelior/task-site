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
import { data } from '@/lib/test';

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
	const tasks: Task[] = data.filter((task) => task.type === 'single');
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
	const tasks: Task[] = data.filter((task) => task.type === 'daily');

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

	const tasks: Task[] = data.filter((task) => task.type == 'multi');

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
					}}
					min={1}
				/>
			</div>
		</>
	);
}
