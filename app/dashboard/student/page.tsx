import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import ConditionalHeader from "@/app/(homepage)/user-header";
import { DashboardContent } from "./_components/dashboard-content";
import { cn } from "@/lib/utils";

const StudentDashboard = async () => {
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }

  const enrolledCourses = await db.enrollment.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      progress: true,
      course: {
        include: {
          category: true,
        },
      },
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
      <DashboardContent enrolledCourses={enrolledCourses} />
    </div>
  );
};

export default StudentDashboard; 