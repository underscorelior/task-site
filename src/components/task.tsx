import { convertCategory } from '@/lib/utils';
import { Button } from './ui/button';
import TaskHoverCard from './task-hover';

export function SingleTask({
	task,
	selected,
	setSelected,
}: {
	task: Task;
	selected: Task | null;
	setSelected: (t: Task | null) => void;
}) {
	return (
		<Button
			variant={task.name != selected?.name ? 'outline' : 'selected'}
			className="mx-auto w-[95%] border px-6 py-2 text-start"
			onClick={() => setSelected(task)}>
			<div className="grid w-full grid-cols-[45%,35%,10%] items-center justify-between gap-[5%]">
				<TaskHoverCard task={task} />
				<p className="truncate overflow-ellipsis font-normal">
					{convertCategory(task.category)}
				</p>
				<p className="font-mono">{task.points}</p>
			</div>
		</Button>
	);
}

export function DailyTask({
	task,
	selTasks,
	setSelTasks,
}: {
	task: Task;
	selTasks: Task[];
	setSelTasks: (t: Task[]) => void;
}) {
	return (
		<Button
			variant={
				!selTasks.some((tsk) => task.name === tsk.name) ? 'outline' : 'selected'
			}
			className="mx-auto w-[95%] border px-6 py-2 text-start"
			onClick={() => {
				let out;
				if (!selTasks.some((tsk) => task.name === tsk.name)) {
					out = [...selTasks, task];
				} else {
					out = selTasks.filter((tsk) => task.name !== tsk.name);
				}

				setSelTasks(out);
			}}>
			<div className="grid w-full grid-cols-[40%,25%,10%,10%] items-center justify-between gap-[5%]">
				<TaskHoverCard task={task} />
				<p className="truncate overflow-ellipsis font-normal">
					{convertCategory(task.category)}
				</p>
				<p className="font-mono">{task.points}</p>
				<p className="font-mono">{task.users[0].amount}</p>
			</div>
		</Button>
	);
}

export function MultiTask({
	task,
	selected,
	setSelected,
}: {
	task: Task;
	selected: Task | null;
	setSelected: (t: Task | null) => void;
}) {
	return (
		<Button
			variant={task.name != selected?.name ? 'outline' : 'selected'}
			className="mx-auto w-[95%] border px-6 py-2 text-start"
			onClick={() => setSelected(task)}>
			<div className="grid w-full grid-cols-[40%,25%,10%,10%] items-center justify-between gap-[5%]">
				<TaskHoverCard task={task} />
				<p className="truncate overflow-ellipsis font-normal">
					{convertCategory(task.category)}
				</p>
				<p className="font-mono">{task.points}</p>
				<p className="font-mono">{task.amount}</p>
			</div>
		</Button>
	);
}
