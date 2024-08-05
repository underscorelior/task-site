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
import { MdCheck, MdClear } from 'react-icons/md';

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
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card';

import { useWindowSize } from '@uidotdev/usehooks';
import { useState } from 'react';
import { data } from '@/lib/test';
import { convertCategory } from '@/lib/utils';

interface Task {
	name: string;
	type: 'daily' | 'multi' | 'single';
	points: number;
	category: string;
	amount?: number;
	users?: { name: string; amount: number }[];
}

const users = ['Steve Jobs', 'Lior', 'Human', 'Name', 'Empty'];

const baseColumns: ColumnDef<Task>[] = [
	{
		accessorKey: 'name',
		enableHiding: false,
		header: 'Task',
		cell: ({ row }) => <div>{row.getValue('name')}</div>,
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
		cell: ({ row }) => <div>{convertCategory(row.getValue('category'))}</div>,
	},
	{
		accessorKey: 'points',
		enableHiding: false,
		header: () => <div>VPs</div>,
		cell: ({ row }) => <div>{row.getValue('points')}</div>,
	},
];

const userColumns: ColumnDef<Task>[] = users.map((user) => ({
	accessorFn: (row): [number, string] => {
		const userAmount = row.users?.find((u) => u.name === user)?.amount;
		return [userAmount !== undefined ? userAmount : 0, row.type];
	},
	id: user,
	header: () => <div className="w-max">{user}</div>,
	cell: ({ getValue }) => {
		const value = getValue() as [number, string];
		return (
			<div className="flex items-end justify-end">
				{value[1] === 'single' ? (
					value[0] ? (
						<MdCheck className="size-4" />
					) : (
						<MdClear className="size-4" />
					)
				) : (
					value[0]
				)}
			</div>
		);
	},
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
				<CardTitle className="text-3xl">Table</CardTitle>
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
							{/* TODO: Add a card onto the task name to display description and type of task (single/daily/multi) */}
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
