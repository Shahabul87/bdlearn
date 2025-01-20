import { CreateGroupForm } from "./_components/create-group-form";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import ConditionalHeader from "@/app/(homepage)/user-header";
import { SidebarDemo } from "@/components/ui/sidebar-demo";
import { db } from "@/lib/db";

export default async function CreateGroupPage() {
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }

  // Fetch user's enrolled courses
  const enrolledCourses = await db.enrollment.findMany({
    where: {
      userId: user.id,
    },
    include: {
      course: {
        select: {
          id: true,
          title: true,
          imageUrl: true,
        },
      },
    },
  });

  const courses = enrolledCourses.map(enrollment => enrollment.course);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ConditionalHeader user={user} />
      <SidebarDemo>
        <main className="container mx-auto px-4 pt-24 pb-16 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="w-full max-w-3xl">
            <CreateGroupForm 
              userId={user.id} 
              enrolledCourses={courses}
            />
          </div>
        </main>
      </SidebarDemo>
    </div>
  );
} 