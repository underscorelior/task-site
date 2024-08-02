import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from './button';
import { IoCreateOutline } from 'react-icons/io5';
import { RiEditLine } from 'react-icons/ri';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from './sheet';

const tags = Array.from({ length: 60 }).map(
	(_, i, a) => `v1.2.000000000000-beta.${a.length - i}`,
);

export function CreateSelect() {
	return (
		<ScrollArea className="h-[40vh] w-full rounded-md border">
			<div className="p-4">
				{tags.map((tag) => (
					<>
						<div
							key={tag}
							className="flex w-[85%] flex-row items-center justify-between">
							<p className="w-[70%] truncate overflow-ellipsis text-sm">
								{tag}
							</p>
							<Sheet>
								<SheetTrigger>
									<Button size={'iconsm'} variant={'outline'}>
										{/* TODO: LEFT SHEET */}
										<RiEditLine />
									</Button>
								</SheetTrigger>
								<SheetContent side={'left'}>
									<SheetHeader>
										<SheetTitle></SheetTitle>
										<SheetDescription></SheetDescription>
									</SheetHeader>
									<div>Content</div>
									<SheetFooter></SheetFooter>
								</SheetContent>
							</Sheet>
						</div>
						<Separator className="my-2 w-[85%]" />
					</>
				))}
				<Button
					variant={'link'}
					className="m-0 flex h-min flex-row items-center gap-2 p-0">
					<IoCreateOutline /> Create new task
				</Button>
			</div>
		</ScrollArea>
	);
}
