import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from './ui/button';
import { IoCreateOutline } from 'react-icons/io5';
import { RiEditLine } from 'react-icons/ri';

import { Label } from './ui/label';
import { Input } from './ui/input';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import TaskHoverCard from './task-hover';
import { Textarea } from './ui/textarea';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';

export function CreateSelect({
	tasks,
	setTasks,
}: {
	tasks: Task[];
	setTasks: (t: Task[]) => void;
}) {
	return (
		<ScrollArea className="h-[27.5vh] rounded-md border">
			<div className="px-4 py-2">
				{tasks.map((task, idx) => (
					<div key={idx}>
						<div className="flex flex-row items-center justify-between gap-4">
							<TaskHoverCard task={task} className="text-sm font-normal" />
							<TaskDialog task={task} tasks={tasks} setTasks={setTasks} />
						</div>
						<Separator className="my-2" />
					</div>
				))}
				<TaskDialog tasks={tasks} setTasks={setTasks} />
			</div>
		</ScrollArea>
	);
}

function TaskDialog({
	task,
	tasks,
	setTasks,
}: {
	task?: Task;
	tasks: Task[];
	setTasks: (t: Task[]) => void;
}) {
	// const [name, setName] = useState<string>(task ? task.name : '');
	// const [description, setDescription] = useState<string>(
	// 	task ? task.description : '',
	// );
	// const [points, setPoints] = useState<number>(task ? task.points : 0);
	// const [taskType, setTaskType] = useState<
	// 	'daily' | 'multi' | 'single' | 'weekly'
	// >(task ? task.type : 'multi');
	// const [lower, setLower] = useState<boolean>(task ? task.lower : false);
	// const [category, setCategory] = useState<
	// 	'health' | 'normal' | 'cool' | 'productivity' | 'insane'
	// >(task ? task.category : 'health');

	const [out, setOut] = useState<Task>(genInitialOut());
	const [open, setOpen] = useState<boolean>(false);

	function genInitialOut(): Task {
		return task
			? task
			: ({
					name: '',
					description: '',
					points: 0,
					category: '',
					type: '',
					lower: false,
					scores: {},
				} as unknown as Task);
	}

	async function add() {
		const re = fetch(
			`/api/add_task?data=${encodeURIComponent(JSON.stringify(out))}&code=${encodeURIComponent(localStorage.code)}`,
			{
				method: 'POST',
			},
		);

		toast.promise(re, {
			loading: 'Updating...',
			success: '',
			error: '',
		});

		const res = await re;
		const ret = await res.json();

		if (ret.hasOwnProperty('message')) {
			toast.error(
				`We ran into an error when adding ${out.name}, ${(ret as { message: string }).message}`,
			);
		} else if (res.status == 200 && ret) {
			setTasks([...tasks, Array.isArray(ret) ? ret[0] : ret]);
		}
		setOut(genInitialOut());
		setOpen(false);
	}

	async function edit() {
		if (task) {
			const re = fetch(
				`/api/update_task?id=${task.id}&data=${encodeURIComponent(JSON.stringify(out))}`,
				{
					method: 'POST',
				},
			);

			toast.promise(re, {
				loading: 'Updating...',
				success: '',
				error: '',
			});

			const res = await re;
			const ret = await res.json();

			if (res.status == 200 && ret) {
				let out;

				out = tasks.filter((tsk) => task.id !== tsk.id);
				out = [...out, Array.isArray(ret) ? ret[0] : ret];

				setTasks(out);
			} else {
				toast.error(
					`We ran into an error when updating ${task.name}, ${ret.message}`,
				);
			}
			setOut(genInitialOut());
			setOpen(false);
		}
	}

	async function del() {
		if (task) {
			const re = fetch(
				`/api/del_task?id=${task.id}&code=${encodeURIComponent(localStorage.code)}`,
				{
					method: 'POST',
				},
			);

			toast.promise(re, {
				loading: 'Updating...',
				success: '',
				error: '',
			});

			const res = await re;
			const ret = await res.json();

			if (res.status == 200 && ret) {
				let out;
				out = tasks.filter((tsk) => task.id !== tsk.id);
				setTasks(out);
			} else {
				toast.error(
					`We ran into an error when deleting ${task.name}, ${ret.message}`,
				);
			}
			setOut(genInitialOut());
			setOpen(false);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>
				{task ? (
					<Button size={'iconsm'} variant={'outline'}>
						<RiEditLine />
					</Button>
				) : (
					<Button
						variant={'link'}
						className="m-0 flex h-min flex-row items-center gap-2 p-0">
						<IoCreateOutline /> Create new task
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="h-max w-[40%]">
				<DialogHeader>
					<DialogTitle className="flex flex-row items-center justify-between text-2xl">
						{task ? `Editing "${task.name}"` : 'Create A New Task'}
						{task && (
							<Button
								onClick={del}
								size={'icon'}
								variant={'ghost'}
								className="rounded-full">
								<Trash2 className="size-5" />
							</Button>
						)}
					</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<div className="h-full">
					<Label className="text-base font-medium" htmlFor="name">
						Name
					</Label>
					<Input
						id="name"
						defaultValue={out.name}
						placeholder="Task Name"
						className="mb-4"
						aria-rowcount={2}
						onChange={(evt) => {
							const t = out;
							t.name = evt.target.value;
							setOut(t);
						}}
					/>

					<Label className="text-base font-medium" htmlFor="desc">
						Description
					</Label>
					<Textarea
						id="desc"
						defaultValue={out.description}
						placeholder="Task Description"
						className="mb-4 h-auto resize-none"
						onChange={(evt) => {
							const t = out;
							t.description = evt.target.value;
							setOut(t);
						}}
					/>

					<Label className="text-base font-medium" htmlFor="vp">
						# of VPs
					</Label>
					<Input
						id="vp"
						defaultValue={out.points}
						placeholder="Task VP Worth"
						className="mb-4 w-[30%]"
						type="number"
						onChange={(evt) => {
							const t = out;
							t.points = +evt.target.value;
							setOut(t);
						}}
					/>
					<div className="grid grid-cols-2">
						<div>
							<Label className="text-base font-medium" htmlFor="type">
								Type
							</Label>
							<div className="mb-4 flex flex-row items-center gap-2" id="type">
								<ToggleGroup
									type="single"
									defaultValue={out.type} // FIXME: REQUIRE THERE TO BE ONE IN THE TOGGLE GROUP OTHERWISE IT WILL BE SCUFFED
									variant={'outline'}
									onValueChange={(typ) => {
										const t = out;
										t.type = typ as Task['type'];
										setOut(t);
									}}>
									<ToggleGroupItem value="single">Single</ToggleGroupItem>
									<ToggleGroupItem value="daily">Daily</ToggleGroupItem>
									<ToggleGroupItem value="multi">Multi</ToggleGroupItem>
								</ToggleGroup>
							</div>
						</div>
						<div>
							<Label className="text-base font-medium" htmlFor="type">
								Priority
								<span className="ml-2 text-xs font-light">
									{'(not required if using single)'}
								</span>
							</Label>
							<div className="mb-4 flex flex-row items-center gap-2" id="type">
								<ToggleGroup
									type="single"
									defaultValue={out.lower ? 'lower' : 'higher'} // FIXME: REQUIRE THERE TO BE ONE IN THE TOGGLE GROUP OTHERWISE IT WILL BE SCUFFED
									variant={'outline'}
									onValueChange={(lower) => {
										const t = out;
										t.lower = lower == 'lower';
										setOut(t);
									}}>
									<ToggleGroupItem value="higher">Higher</ToggleGroupItem>
									<ToggleGroupItem value="lower">Lower</ToggleGroupItem>
								</ToggleGroup>
							</div>
						</div>
					</div>

					<Label className="text-base font-medium" id="category">
						Category
					</Label>
					<Select
						defaultValue={out.category}
						onValueChange={(category) => {
							const t = out; // TODO CHECK IF CAN SKIP THIS STEP
							t.category = category as Task['category'];
							setOut(t);
						}}>
						<SelectTrigger className="w-[40%]">
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
				</div>
				<DialogFooter>
					<DialogClose>
						<Button variant={'outline'}>Cancel</Button>
					</DialogClose>
					{task ? (
						<Button onClick={edit}>Submit</Button>
					) : (
						<Button onClick={add}>Create</Button>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
