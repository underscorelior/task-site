import { convertType, sortTaskArr } from '@/lib/utils';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { MdCheck, MdClear } from 'react-icons/md';
import { toast } from 'react-hot-toast';

export default function Verify({
	user,
	tasks,
	setTasks,
	verify,
	setVerify,
}: {
	user: User;
	tasks: Task[];
	setTasks: (t: Task[]) => void;
	verify: Verify[];
	setVerify: (v: Verify[]) => void;
}) {
	return (
		<Card className="flex h-[80vh] flex-col">
			<CardHeader>
				<CardTitle className="text-3xl">Verify</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="mb-4 mt-1 flex h-[65vh] flex-col">
					<div className="grid w-full grid-cols-[35%,15%,20%,20%] gap-[5%] rounded-t-md border-x border-t px-[5%] py-2 text-lg font-medium">
						<h3>Name</h3>
						<h3>User</h3>
						<h3>Date Submitted</h3>
						<h3>Verification</h3>
					</div>
					<ScrollArea
						className="h-full w-full rounded-b-md border border-t-2"
						id="tasks">
						{verify.filter((submission) => submission.name !== user.name)
							.length == 0 ? (
							<div className="my-10 flex h-full w-full items-center justify-center">
								<h1 className="mx-auto my-auto text-sm">
									No submissions found.
								</h1>
							</div>
						) : (
							<div className="my-3 flex flex-col gap-3">
								{verify.map((submission) => (
									<Submission
										key={submission.id}
										submission={submission}
										tasks={tasks}
										setTasks={setTasks}
										verify={verify}
										setVerify={setVerify}
										user={user}
									/>
								))}
							</div>
						)}
					</ScrollArea>
				</div>
			</CardContent>
		</Card>
	);
}

function Submission({
	submission,
	tasks,
	setTasks,
	verify,
	setVerify,
	user,
}: {
	submission: Verify;
	tasks: Task[];
	setTasks: (t: Task[]) => void;
	verify: Verify[];
	setVerify: (v: Verify[]) => void;
	user: User;
}) {
	const task: Task = tasks.find((task) => task.id === submission.task) as Task;

	async function approve() {
		task.users[submission.name] = task.users[submission.name] || { score: 0 };
		task.users[submission.name].score =
			(task.users[submission.name].score ?? 0) + submission.amount;
		task.users[submission.name].updated_at = Date.now();
		task.users[submission.name].description = submission.description;

		const re = fetch(
			`/api/approve_verify?id=${submission.id}&task_id=${task.id}&task=${encodeURIComponent(JSON.stringify(task))}&code=${encodeURIComponent(localStorage.code)}`,
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
			setVerify(verify.filter((tsk) => submission.id !== tsk.id));
			setTasks(
				sortTaskArr([...tasks.filter((tsk) => task.id !== tsk.id, task)]),
			);
		} else {
			toast.error(
				`We ran into an error when approving ${task.name}, ${(await res.json()).message}`,
			);
		}
	}

	async function deny() {
		const re = fetch(
			`/api/del_verify?id=${submission.id}&code=${encodeURIComponent(localStorage.code)}`,
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
			setVerify(verify.filter((tsk) => submission.id !== tsk.id));
		} else {
			toast.error(
				`We ran into an error when denying ${task.name}, ${(await res.json()).message}`,
			);
		}
	}

	return (
		<div className="ring-offset-background focus-visible:ring-ring mx-auto inline-flex w-[95%] items-center justify-center whitespace-nowrap rounded-md border px-6 py-2 text-start text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
			<div className="grid w-full grid-cols-[35%,15%,20%,20%] items-center justify-between gap-[5%]">
				<HoverCard>
					<HoverCardTrigger
						className={
							'truncate overflow-ellipsis font-medium underline-offset-4 hover:underline'
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
							{task.type == 'multi' ? `, Amount: ${submission.amount}` : ''}
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
					{/* {submission.name !== user.name && ( */}
					<Button
						size={'iconmd'}
						variant={'outline'}
						onClick={approve}
						disabled={submission.name === user.name}>
						<MdCheck />
					</Button>
					{/* )} */}
					<Separator orientation="vertical" className="w-0.5" />
					<Button size={'iconmd'} variant={'outline'} onClick={deny}>
						<MdClear />
					</Button>
				</div>
			</div>
		</div>
	);
}
