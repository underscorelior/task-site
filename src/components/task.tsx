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
	user,
	task,
	selTasks,
	setSelTasks,
}: {
	user: User;
	task: Task;
	selTasks: Task[];
	setSelTasks: (t: Task[]) => void;
}) {
	return (
		<Button
			variant={
				!selTasks.some((tsk) => task.id === tsk.id) ? 'outline' : 'selected'
			}
			className="mx-auto w-[95%] border px-6 py-2 text-start"
			onClick={() => {
				let out;
				if (!selTasks.some((tsk) => task.id === tsk.id)) {
					out = [...selTasks, task];
				} else {
					out = selTasks.filter((tsk) => task.id !== tsk.id);
				}

				setSelTasks(out);
			}}>
			<div className="grid w-full grid-cols-[40%,25%,10%,10%] items-center justify-between gap-[5%]">
				<TaskHoverCard task={task} />
				<p className="truncate overflow-ellipsis font-normal">
					{convertCategory(task.category)}
				</p>
				<p className="font-mono">{task.points}</p>
				<p className="font-mono">{task.users[user.name].score}</p>
			</div>
		</Button>
	);
}

export function MultiTask({
	user,
	task,
	selected,
	setSelected,
}: {
	user: User;
	task: Task;
	selected: Task | null;
	setSelected: (t: Task | null) => void;
}) {
	return (
		<Button
			variant={task.id != selected?.id ? 'outline' : 'selected'}
			className="mx-auto w-[95%] border px-6 py-2 text-start"
			onClick={() => setSelected(task)}>
			<div className="grid w-full grid-cols-[40%,25%,10%,10%] items-center justify-between gap-[5%]">
				<TaskHoverCard task={task} />
				<p className="truncate overflow-ellipsis font-normal">
					{convertCategory(task.category)}
				</p>
				<p className="font-mono">{task.points}</p>
				<p className="font-mono">{task.users[user.name].score}</p>
			</div>
		</Button>
	);
}
