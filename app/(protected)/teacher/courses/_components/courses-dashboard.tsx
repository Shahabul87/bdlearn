"use client";

import { DataTable } from "./data-table";
import { columns } from "./column";
import { Course } from "@prisma/client";
import { cn } from "@/lib/utils";

interface CoursesDashboardProps {
  courses: any[];
}

export const CoursesDashboard = ({ courses }: CoursesDashboardProps) => {
  return (
    <div className={cn(
      "mt-20 p-6 px-10",
      "bg-white dark:bg-transparent",
      "text-gray-900 dark:text-gray-100"
    )}>
      <DataTable columns={columns} data={courses} />
    </div>
  );
}; 