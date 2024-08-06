// TODO: REQUIRE THERE TO BE ONE IN THE TOGGLE GROUP OTHERWISE IT WILL BE SCUFFED
// TODO: REQUIRE THERE TO BE ONE IN THE TOGGLE GROUP OTHERWISE IT WILL BE SCUFFED
// TODO: REQUIRE THERE TO BE ONE IN THE TOGGLE GROUP OTHERWISE IT WILL BE SCUFFED
// TODO: REQUIRE THERE TO BE ONE IN THE TOGGLE GROUP OTHERWISE IT WILL BE SCUFFED
// TODO: REQUIRE THERE TO BE ONE IN THE TOGGLE GROUP OTHERWISE IT WILL BE SCUFFED

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from './button';
import { IoCreateOutline } from 'react-icons/io5';
import { RiEditLine } from 'react-icons/ri';

import { Label } from './label';
import { Input } from './input';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './dialog';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from './select';
import { ToggleGroup, ToggleGroupItem } from './toggle-group';
import { data } from '@/lib/test';

export function CreateSelect() {
	return (
		<ScrollArea className="h-[35vh] rounded-md border" type="scroll">
			<div className="p-4">
				{data.map((task, idx) => (
					<>
						<div
							key={idx}
							className="flex w-full flex-row items-center justify-between gap-4">
							<p className="max-w-[70%] truncate overflow-ellipsis text-sm">
								{task.name}
							</p>
							<TaskDialog task={task} />
						</div>
						<Separator className="my-2" />
					</>
				))}
				<TaskDialog />
			</div>
		</ScrollArea>
	);
}

function TaskDialog({ task }: { task?: Task }) {
	return (
		<Dialog>
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
			<DialogContent className="w-[40%]">
				<DialogHeader>
					<DialogTitle className="text-xl">
						{task ? `Editing ${task.name}` : 'Create A New Task'}
					</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<div>
					<Label className="text-base font-medium" htmlFor="name">
						Name
					</Label>
					<Input id="name" defaultValue={'name'} className="mb-4" />

					<Label className="text-base font-medium" htmlFor="desc">
						Description
					</Label>
					<Input id="desc" defaultValue={'description'} className="mb-4" />

					<Label className="text-base font-medium" htmlFor="vp">
						# of VPs
					</Label>
					<Input
						id="vp"
						defaultValue={0}
						className="mb-4 w-[25%]"
						type="number"
					/>

					<Label className="text-base font-medium" htmlFor="type">
						Type
					</Label>
					<div className="mb-4 flex flex-row items-center gap-2" id="type">
						<ToggleGroup
							type="single"
							defaultValue="single"
							variant={'outline'}>
							<ToggleGroupItem value="single">Single</ToggleGroupItem>
							<ToggleGroupItem value="daily">Daily</ToggleGroupItem>
							<ToggleGroupItem value="multi">Multi</ToggleGroupItem>
						</ToggleGroup>
					</div>

					<Label className="text-base font-medium" id="category">
						Category
					</Label>
					<Select defaultValue="health">
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
					<Button>Submit</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
