"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-gray-700 dark:text-gray-300"
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as string;
      
      return (
        <div className={cn(
          "px-2 py-1 rounded-full text-xs",
          "bg-purple-100 dark:bg-purple-500/10",
          "text-purple-600 dark:text-purple-400",
          "border border-purple-200 dark:border-purple-500/20"
        )}>
          {category}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-gray-700 dark:text-gray-300"
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.getValue("createdAt");
      return (
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <Calendar className="h-4 w-4 text-gray-400" />
          {format(new Date(date as string), 'MMM dd, yyyy')}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const post = row.original;

      return (
        <div className="flex items-center gap-2">
          <Link href={`/teacher/posts/${post.id}`}>
            <Button size="sm" variant="ghost" className="hover:bg-purple-500/10">
              <Pencil className="h-4 w-4 text-purple-400" />
            </Button>
          </Link>
          <Button size="sm" variant="ghost" className="hover:bg-rose-500/10">
            <Trash2 className="h-4 w-4 text-rose-400" />
          </Button>
        </div>
      );
    },
  },
]; 