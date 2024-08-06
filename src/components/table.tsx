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
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { data } from '@/lib/test';
import { useWindowSize } from '@uidotdev/usehooks';
import { useState } from 'react';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card';
import { convertCategory, convertType } from '@/lib/utils';
import { Separator } from './ui/separator';

const users = ['Steve Jobs', 'Lior', 'Human', 'Name', 'Empty'];
const baseColumns: ColumnDef<Task>[] = [
	{
		accessorKey: 'name',
		accessorFn: (
			row,
		): [string, string, Task['category'], Task['type'], number] => {
			console.log([row.name, row.description]);
			return [
				row.name,
				row.description || '',
				row.category,
				row.type,
				row.points,
			];
		},
		enableHiding: false,
		header: 'Task',
		size: 15,
		cell: ({ getValue }) => {
			const value = getValue() as [
				string,
				string,
				Task['category'],
				Task['type'],
				number,
			];
			console.log(value);
			return (
				<HoverCard>
					<HoverCardTrigger className="max-w-full truncate overflow-ellipsis font-medium underline-offset-4 hover:underline">
						{value[0]}
					</HoverCardTrigger>
					<HoverCardContent className="flex w-auto max-w-sm flex-col gap-2">
						<div className="flex h-full min-h-full w-full flex-row justify-between gap-4">
							<div className="text-base font-medium">{value[0]}</div>
							<Separator orientation="vertical" className="ml-auto w-0.5" />
							<div className="text-center font-mono text-base">
								{value[4]} VP{value[4] != 1 && 's'}
							</div>
						</div>
						<Separator className="h-[2px]" />
						<div className="whitespace-normal text-base">{value[1]}</div>
						<div>Category: {convertCategory(value[2])}</div>
						<div className="text-sm font-light">{convertType(value[3])}</div>
					</HoverCardContent>
				</HoverCard>
			);
		},
	},
	{
		accessorKey: 'category',
		enableHiding: false,
		header: ({ column }) => {
			return (
				<Button
					size={'no'}
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className="p-1 text-start">
					Category
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		size: 9,
		cell: ({ row }) => (
			<div className="overflow-hidden truncate">
				{convertCategory(row.getValue('category'))}
			</div>
		),
	},
	{
		accessorKey: 'points',
		enableHiding: false,
		header: ({ column }) => (
			<Button
				size={'no'}
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className="p-1 text-start">
				VPs
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		size: 5,
		cell: ({ row }) => (
			<div className="text-end font-mono">{row.getValue('points')}</div>
		),
	},
];

const userColumns: ColumnDef<Task>[] = users.map((user) => ({
	accessorFn: (row): [number, Task['type']] => {
		const userAmount = row.users?.find((u) => u.name === user)?.amount;
		return [userAmount !== undefined ? userAmount : 0, row.type];
	},
	id: user,
	header: () => (
		<div className="ml-auto max-w-max truncate overflow-ellipsis">{user}</div>
	),
	size: 6,
	cell: ({ getValue }) => {
		const value = getValue() as [number, Task['type']];
		return (
			<div className="flex items-end justify-end font-mono">
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
						value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
						onChange={(event) =>
							table.getColumn('name')?.setFilterValue(event.target.value)
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
											<TableHead
												key={header.id}
												style={{
													minWidth: header.column.columnDef.size,
													maxWidth: header.column.columnDef.size,
												}}>
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
											<TableCell
												key={cell.id}
												style={{
													minWidth: cell.column.columnDef.size + 'vw',
													maxWidth: cell.column.columnDef.size + 'vw',
													overflow: 'hidden',
													'text-overflow': 'ellipsis',
													'white-space': 'nowrap',
												}}>
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
