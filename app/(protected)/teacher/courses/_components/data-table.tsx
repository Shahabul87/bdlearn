"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import Link from "next/link"
import { PlusCircle, Search, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({columns, data}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [isLoading, setIsLoading] = React.useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  // Get unique categories and handle empty/null cases
  const uniqueCategories = Array.from(
    new Set(
      data.map((item: any) => 
        item.category?.name || 'Uncategorized'
      )
    )
  ).filter(Boolean);

  const handleCategoryChange = (value: string) => {
    if (value === "all") {
      table.getColumn("category")?.setFilterValue(undefined);
    } else {
      table.getColumn("category")?.setFilterValue(value);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter Section */}
      <div className={cn(
        "flex flex-col sm:flex-row gap-4",
        "p-4 rounded-lg",
        "bg-white/20 dark:bg-gray-900/30"
      )}>
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Filter courses..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className={cn(
              "pl-9 w-full",
              "bg-white dark:bg-gray-900/50",
              "border-gray-200 dark:border-gray-700",
              "text-gray-900 dark:text-white",
              "placeholder:text-gray-500 dark:placeholder:text-gray-400",
              "focus:ring-purple-500"
            )}
          />
        </div>

        {/* Category Filter */}
        <Select
          value={(table.getColumn("category")?.getFilterValue() as string) ?? "all"}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className={cn(
            "w-full sm:w-[180px]",
            "bg-white dark:bg-gray-900/50",
            "border-gray-200 dark:border-gray-700",
            "text-gray-900 dark:text-white"
          )}>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
            <SelectItem value="all" className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
              All Categories
            </SelectItem>
            {uniqueCategories.map((category) => (
              <SelectItem 
                key={category} 
                value={category}
                className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Create Course Button - Hidden on mobile, shown on larger screens */}
        <div className="hidden sm:block">
          <Link href="/teacher/create">
            <Button className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white">
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Course
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Create Course Button */}
      <div className="sm:hidden">
        <Link href="/teacher/create" className="w-full">
          <Button className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Course
          </Button>
        </Link>
      </div>

      {/* Table Section */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                {headerGroup.headers.map((header) => (
                  <TableHead 
                    key={header.id} 
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24">
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-purple-600 dark:text-purple-400" />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={cn(
                    "border-gray-200 dark:border-gray-700",
                    "transition-all duration-200",
                    "hover:bg-purple-50 dark:hover:bg-purple-500/10",
                    "group"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell 
                      key={cell.id} 
                      className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500 dark:text-gray-400"
                >
                  No courses found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Section */}
      <div className="flex items-center justify-between pt-4">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {table.getFilteredRowModel().rows.length} courses total
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              !table.getCanPreviousPage()
                ? "bg-gray-100 dark:bg-gray-800/50 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                : "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-500/20 hover:text-purple-700 dark:hover:text-purple-300"
            )}
          >
            Previous
          </Button>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              !table.getCanNextPage()
                ? "bg-gray-100 dark:bg-gray-800/50 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                : "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-500/20 hover:text-purple-700 dark:hover:text-purple-300"
            )}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}