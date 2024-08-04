import { Button } from './ui/button';

export default function Task({
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
			variant={'outline'}
			className="mx-auto w-[95%] border px-6 py-2 text-start"
			onClick={() => setSelected(task)}>
			<div className="grid w-full grid-cols-[45%,5%,35%,5%,10%] items-center justify-between gap-2">
				<h1 className="truncate overflow-ellipsis">{task.name}</h1>
				<p className="col-start-3 truncate overflow-ellipsis">
					{task.category}
				</p>
				<p className="col-start-5">{task.points}</p>
			</div>
		</Button>
	);
}
