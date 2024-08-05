import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card';

import { useWindowSize } from '@uidotdev/usehooks';
import { useState } from 'react';

interface Task {
	name: string;
	type: 'daily' | 'multi' | 'single';
	points: number;
	category: string;
	amount?: number;
	users?: { name: string; amount: number }[];
}

const users = ['Steve Jobs', 'Lior', 'Human', 'Name', 'Empty'];

function user(): { name: string; amount: number }[] {
	return users.map((user) => {
		return { name: user, amount: Math.floor(Math.random() * 100) };
	});
}

const data: Task[] = [
	{
		name: 'Exercise for an hour (one point per hour, PE does not count)',
		type: 'multi',
		points: 5,
		category: 'Health',
		users: user(),
	},
	{
		name: "Go outside for an hour (one point per hour, school doesn't count, you can't be inside a building)",
		type: 'multi',
		points: 3,
		category: 'Health',
		users: user(),
	},
	{
		name: 'Meditate for at least 20 minutes (one point per 20 minutes)',
		type: 'multi',
		points: 1,
		category: 'Health',
		users: user(),
	},
	{
		name: 'Do a T-25 video (fitness video)',
		type: 'multi',
		points: 1,
		category: 'Health',
		users: user(),
	},
	{
		name: 'Times homework was late (one point for each late assignment, least points win)',
		type: 'multi',
		points: 3,
		category: 'Productivity',
		users: user(),
	},
	{
		name: "Read a book that was not assigned in school (must finish book. can't be a children's book/manga 200 page minimum)",
		type: 'multi',
		points: 2,
		category: 'Productivity',
		users: user(),
	},
	{
		name: 'Go to sleep before 1:30 AM',
		type: 'daily',
		points: 2,
		category: 'Health',
		users: user(),
	},
	{
		name: 'Drink 6 glasses of water every day (although 8 is better)',
		type: 'daily',
		points: 4,
		category: 'Health',
		users: user(),
	},
	{
		name: 'Have at least 6 hours of sleep that night (obviously only one point a day)',
		type: 'daily',
		points: 2,
		category: 'Health',
		users: user(),
	},
	{
		name: 'Watch the news (max of one point per day)',
		type: 'daily',
		points: 1,
		category: 'Become Normal',
		users: user(),
	},
	{
		name: 'Go a day without video games (Does not conflict with the Play Among Us task unless you play more than 1 round of Among Us)',
		type: 'daily',
		points: 2,
		category: 'Productivity',
		users: user(),
	},
	{
		name: 'Be productive for 5 hours after school on a school day, 10 hours on non-school days',
		type: 'daily',
		points: 3,
		category: 'Productivity',
		users: user(),
	},
	{
		name: "Talk with someone you haven't talked to for 5+ years",
		type: 'single',
		points: 2,
		category: 'Become Normal',
		users: users.map((user) => {
			return { name: user, amount: Math.floor(Math.random() * 2) };
		}),
	},
	{
		name: 'Go to prom',
		type: 'single',
		points: 5,
		category: 'Become Normal',
		users: users.map((user) => {
			return { name: user, amount: Math.floor(Math.random() * 2) };
		}),
	},
	{
		name: "Go on a date (needs proof, can't be with other participants, must be IRL, must be romantic, must be over 1 hour, must be with preferred gender)",
		type: 'single',
		points: 5,
		category: 'Become Normal',
		users: users.map((user) => {
			return { name: user, amount: Math.floor(Math.random() * 2) };
		}),
	},
	{
		name: "Eat something which you haven't ate before",
		type: 'single',
		points: 1,
		category: 'Become Normal',
		users: users.map((user) => {
			return { name: user, amount: Math.floor(Math.random() * 2) };
		}),
	},
	{
		name: "Go to someplace far away (10+ miles) which you haven't gone before",
		type: 'single',
		points: 1,
		category: 'Become Normal',
		users: users.map((user) => {
			return { name: user, amount: Math.floor(Math.random() * 2) };
		}),
	},
];

const baseColumns: ColumnDef<Task>[] = [
	{
		accessorKey: 'name',
		enableHiding: false,
		header: 'Task',
		cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
	},
	{
		accessorKey: 'category',
		enableHiding: false,
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className="text-start">
					Category
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => <div>{row.getValue('category')}</div>,
	},
	{
		accessorKey: 'points',
		enableHiding: false,
		header: () => <div className="text-right">Amount</div>,
		cell: ({ row }) => (
			<div className="text-right font-medium">{row.getValue('points')}</div>
		),
	},
];

const userColumns: ColumnDef<Task>[] = users.map((user, index) => ({
	accessorFn: (row) => {
		const userAmount = row.users?.find((u) => u.name === user)?.amount;
		return userAmount !== undefined ? userAmount : '';
	},
	id: `user_${index + 1}`,
	header: user,
	cell: ({ getValue }) => (
		<div className="capitalize">{getValue() as string}</div>
	),
}));

const columns: ColumnDef<Task>[] = [...baseColumns, ...userColumns];

export function TaskTable() {
	const size = useWindowSize();
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
		initialState: {
			pagination: {
				pageSize: Math.floor(
					((size.height || window.innerHeight) * 0.8 - 282) / 53,
				),
				pageIndex: 0,
			},
		},
	});

	return (
		<Card className="flex h-[80vh] flex-col">
			<CardHeader>
				<CardTitle>Table</CardTitle>
				<CardDescription></CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col justify-start">
				<div className="flex items-center py-4">
					<Input
						placeholder="Filter tasks..."
						value={(table.getColumn('task')?.getFilterValue() as string) ?? ''}
						onChange={(event) =>
							table.getColumn('task')?.setFilterValue(event.target.value)
						}
						className="max-w-sm"
					/>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="ml-auto">
								Columns <ChevronDown className="ml-2 h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{table
								.getAllColumns()
								.filter((column) => column.getCanHide())
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className="capitalize"
											checked={column.getIsVisible()}
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}>
											{column.id}
										</DropdownMenuCheckboxItem>
									);
								})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<div className="rounded-md border">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<TableHead key={header.id}>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext(),
														)}
											</TableHead>
										);
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && 'selected'}>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center">
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			</CardContent>
			<CardFooter className="mt-auto flex w-full items-center justify-end space-x-2 pb-6">
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}>
					Previous
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}>
					Next
				</Button>
			</CardFooter>
		</Card>
	);
}
