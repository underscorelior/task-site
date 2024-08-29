import { cn, convertCategory, convertType } from '@/lib/utils';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { Separator } from './ui/separator';

export default function TaskHoverCard({
	task,
	className,
}: {
	task: Task;
	className?: string;
}) {
	return (
		<HoverCard>
			<HoverCardTrigger className="w-min">
				<h2
					className={cn(
						'truncate overflow-ellipsis font-medium underline-offset-4 hover:underline',
						className,
					)}>
					{task.name}
				</h2>
			</HoverCardTrigger>
			<HoverCardContent className="flex w-auto max-w-sm flex-col gap-2">
				<div className="flex h-full min-h-full w-full flex-row gap-4">
					<div className="whitespace-normal text-base font-medium">
						{task.name}
					</div>
					<Separator orientation="vertical" className="ml-auto w-[1.5px]" />
					<div className="my-auto text-center font-mono text-base">
						{task.points} VP{task.points != 1 && 's'}
					</div>
				</div>

				<Separator className="h-[2px]" />

				<div className="whitespace-normal text-[0.9375rem] font-[450]">
					{task.description}
				</div>
				<div>Category: {convertCategory(task.category)}</div>
				<div className="text-sm font-light">
					{convertType(task.type)}
					{task.type !== 'single' && (task.lower ? ' - Lowest' : ' - Highest')}
				</div>
			</HoverCardContent>
		</HoverCard>
	);
}
