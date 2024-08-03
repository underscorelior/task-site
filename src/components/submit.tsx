import { useState } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card';
import { Label } from './ui/label';
import {
	SelectItem,
	SelectLabel,
	Select,
	SelectContent,
	SelectGroup,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import { ScrollArea } from './ui/scroll-area';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import Task from './task';

export default function Submit() {
	const [type, setType] = useState<string>('');

	return (
		<Card className="h-[75vh]">
			<CardHeader>
				<CardTitle>Submit</CardTitle>
				<CardDescription></CardDescription>
			</CardHeader>
			<CardContent>
				<Label className="text-lg font-medium" id="type">
					Type
				</Label>
				<Select onValueChange={setType}>
					<SelectTrigger className="mb-4 mt-1 w-[40%]" id="type">
						<SelectValue placeholder="Select a type" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Type</SelectLabel>
							<SelectItem value="single">Single</SelectItem>
							<SelectItem value="daily">Daily</SelectItem>
							<SelectItem value="multi">Multi</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
				{type == 'single' ? (
					<Single />
				) : type == 'daily' ? (
					<>
						<Label className="text-lg font-medium" id="category">
							Category
						</Label>
						<Select defaultValue="health">
							<SelectTrigger className="mt-1 w-[40%]" id="category">
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
					</>
				) : type == 'multi' ? (
					<></>
				) : (
					<></>
				)}
			</CardContent>
			<CardFooter></CardFooter>
		</Card>
	);
}

function Single() {
	return (
		<>
			<ScrollArea className="h-[35vh] w-full rounded-md border">
				<ToggleGroup
					type="single"
					variant="ghost"
					size={'ghost'}
					className="flex w-full flex-col gap-y-4">
					<ToggleGroupItem value="aaa" className="w-full">
						<Task />
					</ToggleGroupItem>
					<ToggleGroupItem value="aaa" className="w-full">
						<Task />
					</ToggleGroupItem>
					<ToggleGroupItem value="aaa" className="w-full">
						<Task />
					</ToggleGroupItem>
					<ToggleGroupItem value="aaa" className="w-full">
						<Task />
					</ToggleGroupItem>
					<ToggleGroupItem value="aaa" className="w-full">
						<Task />
					</ToggleGroupItem>
					<ToggleGroupItem value="aaa" className="w-full">
						<Task />
					</ToggleGroupItem>
					<ToggleGroupItem value="aaa" className="w-full">
						<Task />
					</ToggleGroupItem>
				</ToggleGroup>
			</ScrollArea>
		</>
	);
}
