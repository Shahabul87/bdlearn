import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import ConditionalHeader from "@/app/(homepage)/user-header";
import { TeacherDashboardContent } from "./_components/teacher-dashboard-content";
import { cn } from "@/lib/utils";
import { UserRole } from "@prisma/client";

export default async function TeacherDashboard() {
  const user = await currentUser();

  if (!user) {
    return redirect("/auth/login");
  }

  // Redirect if not a teacher
  if (user.role !== "TEACHER") {
    if (user.role === "STUDENT") {
      return redirect("/dashboard/student");
    } else {
      return redirect("/dashboard");
    }
  }

  const courses = await db.course.findMany({
    where: {
      userId: user.id,
    },
    include: {
      category: true,
      chapters: {
        include: {
          sections: true
        }
      },
      enrollments: true,
      reviews: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className={cn(
      "min-h-screen",
      "bg-gradient-to-b from-gray-50 via-gray-50/80 to-white",
      "dark:from-gray-900 dark:via-gray-900/80 dark:to-gray-800",
      "transition-colors duration-300"
    )}>
      <ConditionalHeader user={user} />
      <TeacherDashboardContent courses={courses} />
    </div>
  );
} 