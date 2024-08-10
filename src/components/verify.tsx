import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

export default function Verify({
	verify,
	user,
	tasks,
}: {
	verify: Verify[];
	user: User;
	tasks: Task[];
}) {
	return (
		<Card className="flex h-[80vh] flex-col">
			<CardHeader>
				<CardTitle className="text-3xl">Verify</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="mb-4 mt-1 flex h-[65vh] flex-col">
					<div className="grid w-full grid-cols-[40%,25%,10%,10%] gap-[5%] rounded-t-md border-x border-t px-[5%] py-2 text-lg font-medium">
						<h3>Name</h3>
						<h3>User</h3>
						<h3>Points</h3>
						<h3>#</h3>
					</div>
					<ScrollArea
						className="h-full w-full rounded-b-md border border-t-2"
						id="tasks">
						<div className="my-3 flex flex-col gap-3">
							{verify
								.filter((submission) => submission.name !== user.name)
								.map((submission) => (
									<Submission
										key={submission.id}
										submission={submission}
										tasks={tasks}
									/>
								))}
						</div>
					</ScrollArea>
				</div>
			</CardContent>
		</Card>
	);
}

// TODO: If daily, put date. If single, idfk. If multi, put amount

function Submission({
	// user,
	submission,
	tasks,
}: {
	// user: User;
	submission: Verify;
	tasks: Task[];
}) {
	const task: Task | undefined = tasks.find(
		(task) => task.id === submission.task,
	);

	return (
		<Button
			variant={'outline'}
			className="mx-auto w-[95%] border px-6 py-2 text-start">
			<div className="grid w-full grid-cols-[40%,25%,10%,10%] items-center justify-between gap-[5%]">
				<Hover task={task} submission={submission} />
				{/*<p className="truncate overflow-ellipsis font-normal">
					{convertCategory(task.category)}
				</p>
				<p className="font-mono">{task.points}</p>
				<p className="font-mono">{task.scores[user.name]}</p> */}
				<p className="capitalize">{submission.name}</p>
			</div>
		</Button>
	);
}

function Hover({
	task,
	submission,
}: {
	task: Task | undefined;
	submission: Verify;
}) {
	return (
		<HoverCard>
			<HoverCardTrigger
				className={
					'w-full truncate overflow-ellipsis font-medium underline-offset-4 hover:underline'
				}>
				{task?.name}
			</HoverCardTrigger>
			<HoverCardContent className="flex w-auto max-w-sm flex-col gap-2">
				<div className="flex h-full min-h-full w-full flex-row gap-4">
					<div className="whitespace-normal text-base font-medium">
						{task?.name}
					</div>
					<Separator orientation="vertical" className="ml-auto w-[1.5px]" />
					{/* <div className="my-auto text-center font-mono text-base">
                {task.points} VP{task.points != 1 && 's'}
            </div> */}
				</div>

				<Separator className="h-[2px]" />

				<div className="whitespace-normal text-[0.9375rem] font-[450]">
					{submission?.description}
				</div>
				{/*
        <div>Category: {convertCategory(task.category)}</div>
        <div className="text-sm font-light">
            {convertType(task.type)}
            {task.type !== 'single' &&
                (task.lower ? ' - Lowest' : ' - Highest')}
        </div> */}
			</HoverCardContent>
		</HoverCard>
	);
}
