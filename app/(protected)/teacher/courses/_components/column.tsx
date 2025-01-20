"use client"

import { Course as PrismaCourse } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Pencil, Trash2, Calendar, Loader2 } from "lucide-react"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import axios from "axios";

type CourseWithCategory = {
  id: string;
  title: string;
  category: { name: string } | null;
  price: number | null;
  isPublished: boolean;
  createdAt: Date;
}

export const columns: ColumnDef<CourseWithCategory>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <div className="text-center w-full">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-gray-700 dark:text-gray-300"
          >
            Category
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const category = row.original.category?.name || "Uncategorized";
      
      return (
        <div className={cn(
          "flex justify-center items-center",
          "text-center",
          "w-full",
          "px-2 py-1"
        )}>
          <span className={cn(
            "inline-flex items-center px-2 py-1 rounded-full text-sm font-medium",
            "bg-purple-50 dark:bg-purple-500/10",
            "text-purple-700 dark:text-purple-300",
            "border border-purple-200 dark:border-purple-500/20"
          )}>
            {category}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return row.original.category?.name?.toLowerCase() === value.toLowerCase();
    }
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price") || "0");
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(price);

      return <div>{formatted}</div>
    }
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Published
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const isPublished = row.getValue("isPublished") || false;

      return (
        <Badge className={cn(
          "bg-slate-500",
          isPublished && "bg-sky-700"
        )}>
          {isPublished ? "Published" : "Draft"}
        </Badge>
      )
    }
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.getValue("createdAt")
      return (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          {date ? format(new Date(date as string), 'MMM dd, yyyy') : 'N/A'}
        </div>
      )
    }
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Modified
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.getValue("updatedAt")
      return (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          {date ? format(new Date(date as string), 'MMM dd, yyyy') : 'N/A'}
        </div>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <div className="flex items-center gap-2">
          <Link href={`/teacher/courses/${id}`}>
            <Button size="sm" variant="ghost" className="hover:bg-purple-500/10">
              <Pencil className="h-4 w-4 text-purple-400" />
            </Button>
          </Link>
          <DeleteCourseButton courseId={id} />
        </div>
      );
    }
  }
];

interface DeleteCourseButtonProps {
  courseId: string;
}

const DeleteCourseButton = ({ courseId }: DeleteCourseButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Course deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          size="sm" 
          variant="ghost"
          className="hover:bg-rose-500/10"
          disabled={isLoading}
        >
          <Trash2 className="h-4 w-4 text-rose-400" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-gray-900 border border-gray-800">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl text-white">
            Delete Course
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300 text-base">
            Are you sure you want to delete this course?
            <br />
            <span className="text-rose-400 font-medium">
              This action cannot be undone.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            className="bg-gray-800 hover:bg-gray-700 border-0 text-white"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="bg-rose-500 hover:bg-rose-600 text-white border-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Course"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};