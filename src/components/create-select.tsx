import { z } from 'zod';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { IoCreateOutline } from 'react-icons/io5';
import { RiEditLine } from 'react-icons/ri';
import { Button } from './ui/button';

import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import TaskHoverCard from './task-hover';
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
import { Input } from './ui/input';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';
import { sortTaskArr } from '@/lib/utils';
import { users } from '@/config';

export function CreateSelect({
	tasks,
	setTasks,
}: {
	tasks: Task[];
	setTasks: (t: Task[]) => void;
}) {
	return (
		<ScrollArea className="h-[27.5vh] w-full rounded-md border">
			<div className="px-4 py-2">
				{tasks.map((task) => (
					<div key={task.id}>
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

const formSchema = z.object({
	name: z
		.string()
		.min(1, { message: 'Name must be a minimum of 1 character.' })
		.max(64, { message: 'Name must be a maximum of 64 characters.' }),
	description: z
		.string()
		.min(1, { message: 'Description must be a minimum of 1 character.' }),
	points: z
		.number()
		.gt(0, { message: 'Task must be worth more than 0 points.' }),
	category: z.string().min(1, { message: 'You must specify a category.' }),
	type: z.string().min(1, { message: 'You must specify a type.' }),
	lower: z.enum(['higher', 'lower']), // FIXME: try and make this a boolean
	users: z.record(
		z.object({
			score: z.number().optional(),
			updated_at: z.number().optional(),
			description: z.string().optional(),
		}),
	),
});

function TaskDialog({
	task,
	tasks,
	setTasks,
}: {
	task?: Task;
	tasks: Task[];
	setTasks: (t: Task[]) => void;
}) {
	const [open, setOpen] = useState<boolean>(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: task?.name || '',
			description: task?.description || '',
			points: task?.points || 0,
			category: task?.category || '',
			type: task?.type || '',
			lower:
				task?.lower !== undefined
					? task.lower
						? 'lower'
						: 'higher'
					: 'higher',
			users: task?.users || {},
		},
	});

	async function add(data: Task) {
		const re = fetch(
			`/api/add_task?data=${encodeURIComponent(JSON.stringify(data))}&code=${encodeURIComponent(localStorage.code)}`,
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

		if (Object.prototype.hasOwnProperty.call(ret, 'message')) {
			toast.error(
				`We ran into an error when adding ${data.name}, ${(ret as { message: string }).message}`,
			);
		} else if (res.status == 200 && ret) {
			setTasks(sortTaskArr([...tasks, Array.isArray(ret) ? ret[0] : ret]));
		}
	}

	async function edit(data: Task) {
		if (task) {
			const re = fetch(
				`/api/update_task?id=${task.id}&data=${encodeURIComponent(JSON.stringify({ ...data, id: task.id }))}&code=${encodeURIComponent(localStorage.code)}`,
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

				setTasks(sortTaskArr(out));
			} else {
				toast.error(
					`We ran into an error when updating ${task.name}, ${ret.message}`,
				);
			}
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

			if (res.status == 200) {
				setTasks(sortTaskArr(tasks.filter((tsk) => task.id !== tsk.id)));
			} else {
				toast.error(
					`We ran into an error when deleting ${task.name}, ${(await res.json()).message}`,
				);
			}
		}
	}

	async function onSubmit(values: z.infer<typeof formSchema>) {
		// const data: Task = {
		// 	name: values.name,
		// 	description: values.description,
		// 	type: values.type as Task['type'],
		// 	points: values.points,
		// 	category: values.category as Task['category'],
		// 	lower: values.lower == 'lower',
		// 	users: task ? task.users : {},
		// };
		// if (task) {
		// 	await edit(data);
		// } else {
		// 	await add(data);
		// }

		console.log(values.users);

		setOpen(false);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>
				{task ? (
					<div className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-6 w-6 items-center justify-center rounded-md border text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50">
						<RiEditLine />
					</div>
				) : (
					<div
						onClick={() => {
							form.setValue('category', '');
							form.setValue('description', '');
							form.setValue('lower', 'higher');
							form.setValue('name', '');
							form.setValue('points', 0);
							form.setValue('type', '');
							form.clearErrors();
						}}
						className="text-primary m-0 flex h-min flex-row items-center justify-center gap-2 whitespace-nowrap rounded-md p-0 text-sm font-medium underline-offset-4 transition-colors hover:underline disabled:pointer-events-none disabled:opacity-50">
						<IoCreateOutline /> Create new task
					</div>
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
								className="aspect-square w-auto rounded-xl">
								<Trash2 className="size-5" />
							</Button>
						)}
					</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							name="name"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-base font-medium">Name</FormLabel>
									<FormControl className="!mt-0.5">
										<Input
											defaultValue={field.value}
											placeholder="Task Name"
											className="mb-4"
											maxLength={64}
											{...field}
										/>
									</FormControl>
									<FormDescription className="!mt-0.5 font-mono text-xs font-normal">
										{`${'0'.repeat(2 - (field.value.length + '').length) + field.value.length}/64 Chars`}
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="description"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-base font-medium">
										Description
									</FormLabel>
									<FormControl className="!mt-0.5">
										<Textarea
											defaultValue={field.value}
											placeholder="Task Description"
											className="mb-4 h-auto resize-none"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="grid grid-cols-[50%,50%] gap-4">
							<FormField
								name="points"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-base font-medium">
											# of VPs
										</FormLabel>
										<FormControl className="!mt-0.5">
											<Input
												defaultValue={field.value}
												placeholder="Task VP Worth"
												className="mb-4 w-[80%]"
												type="number"
												{...field}
												onChange={(event) =>
													field.onChange(+event.target.value)
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name="lower"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-base font-medium">
											Priority
											<span className="ml-2 text-xs font-light">
												{'(not required if using single)'}
											</span>
										</FormLabel>
										<FormControl className="!mt-0.5 mb-4 flex flex-row items-center justify-start gap-2">
											<ToggleGroup
												type="single"
												defaultValue={field.value}
												variant={'outline'}
												{...field}
												onValueChange={(prio) => field.onChange(prio)}>
												<ToggleGroupItem
													value="higher"
													disabled={field.value == 'higher'}
													className="disabled:opacity-100">
													Higher
												</ToggleGroupItem>
												<ToggleGroupItem
													value="lower"
													disabled={field.value == 'lower'}
													className="disabled:opacity-100">
													Lower
												</ToggleGroupItem>
											</ToggleGroup>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="grid grid-cols-[50%,50%] gap-4">
							<FormField
								name="type"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-base font-medium">
											Type
										</FormLabel>
										<FormControl className="!mt-0.5 mb-4 grid w-[80%] grid-cols-2 items-center justify-start gap-2">
											<ToggleGroup
												type="single"
												defaultValue={field.value}
												variant={'outline'}
												{...field}
												className="mr-auto"
												onValueChange={(type) => field.onChange(type)}>
												<ToggleGroupItem
													value="single"
													disabled={field.value == 'single'}
													className="disabled:opacity-100">
													Single
												</ToggleGroupItem>
												<ToggleGroupItem
													value="daily"
													disabled={field.value == 'daily'}
													className="disabled:opacity-100">
													Daily
												</ToggleGroupItem>
												<ToggleGroupItem
													value="multi"
													disabled={field.value == 'multi'}
													className="disabled:opacity-100">
													Multi
												</ToggleGroupItem>
												<ToggleGroupItem
													value="weekly"
													disabled={field.value == 'weekly'}
													className="disabled:opacity-100">
													Weekly
												</ToggleGroupItem>
											</ToggleGroup>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name="category"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-base font-medium">
											Category
										</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl className="!mt-0.5">
												<SelectTrigger className="w-[70%]">
													<SelectValue placeholder="Select a category" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Category</SelectLabel>
													<SelectItem value="health">Health</SelectItem>
													<SelectItem value="normal">Become Normal</SelectItem>
													<SelectItem value="cool">POV: Cool</SelectItem>
													<SelectItem value="productivity">
														Productivity
													</SelectItem>
													<SelectItem value="insane">INSANE</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							name="users"
							control={form.control}
							render={({ field }) => (
								<section>
									<h1 className="pb-2 text-base font-medium">User Scores</h1>
									<div className="grid grid-cols-3 gap-3">
										{users.map((user) => (
											<FormItem>
												<FormLabel className="text-sm font-medium capitalize">
													{user}
												</FormLabel>
												<FormControl className="!mt-0.5">
													<Input
														defaultValue={
															field.value[user] !== undefined
																? field.value[user].score
																: 0
														}
														placeholder="Score"
														className="mb-4"
														type="number"
														id={user}
														onChange={(event) => {
															const v = field.value;
															v[event.target.id].score = +event.target.value;
															v[event.target.id].updated_at =
																new Date().getTime();
															field.onChange(v);
														}}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										))}
									</div>
								</section>
							)}
						/>
						<DialogFooter className="pt-4">
							<DialogClose>
								<Button variant={'outline'}>Cancel</Button>
							</DialogClose>

							<Button type="submit">{task ? 'Submit' : 'Create'}</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
