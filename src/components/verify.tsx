import { convertType } from '@/lib/utils';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { MdCheck, MdClear } from 'react-icons/md';

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
					<div className="grid w-full grid-cols-[40%,15%,20%,20%] gap-[5%] rounded-t-md border-x border-t px-[5%] py-2 text-lg font-medium">
						<h3>Name</h3>
						<h3>User</h3>
						<h3>Date Submitted</h3>
						<h3>Verification</h3>
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

function Submission({
	submission,
	tasks,
}: {
	submission: Verify;
	tasks: Task[];
}) {
	const task: Task = tasks.find((task) => task.id === submission.task) as Task;

	return (
		<div className="ring-offset-background focus-visible:ring-ring mx-auto inline-flex w-[95%] items-center justify-center whitespace-nowrap rounded-md border px-6 py-2 text-start text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
			<div className="grid w-full grid-cols-[40%,15%,20%,20%] items-center justify-between gap-[5%]">
				<HoverCard>
					<HoverCardTrigger
						className={
							'w-min truncate overflow-ellipsis font-medium underline-offset-4 hover:underline'
						}>
						{task.name}
					</HoverCardTrigger>
					<HoverCardContent className="flex w-auto max-w-sm flex-col gap-2">
						<div className="flex h-full min-h-full w-full flex-row gap-4">
							<div className="whitespace-normal text-base font-medium">
								{task.name}
							</div>
							<Separator orientation="vertical" className="ml-auto w-0.5" />
							<div className="my-auto text-center text-base capitalize">
								{submission.name}
							</div>
						</div>

						<Separator className="h-0.5" />

						<div className="whitespace-normal text-base font-[450]">
							<span className="font-medium">More Info:</span>{' '}
							{submission?.description}
						</div>
						<div className="text-sm font-light">
							<span className="font-medium">Submitted:</span>{' '}
							{new Date(Date.parse(submission.created_at)).toLocaleString([], {
								year: 'numeric',
								month: '2-digit',
								day: '2-digit',
								hour12: true,
								hour: '2-digit',
								minute: '2-digit',
								timeZoneName: 'short',
							})}
						</div>
						<div className="text-sm font-light">
							<span className="font-medium">Task Type:</span>{' '}
							{convertType(task.type)}
							{task.type == 'multi' ? `, ${submission.amount}` : ''}
						</div>
					</HoverCardContent>
				</HoverCard>
				<p className="font-normal capitalize">{submission.name}</p>
				<p>
					{new Date(Date.parse(submission.created_at)).toLocaleString([], {
						year: 'numeric',
						month: '2-digit',
						day: '2-digit',
					})}
				</p>
				<div className="flex flex-row gap-4">
					<Button size={'iconmd'} variant={'outline'}>
						<MdCheck />
					</Button>
					<Separator orientation="vertical" className="w-0.5" />
					<Button size={'iconmd'} variant={'outline'}>
						<MdClear />
					</Button>
				</div>
			</div>
		</div>
	);
}
