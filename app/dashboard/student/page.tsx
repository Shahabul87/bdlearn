import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { CoursesList } from "@/components/courses-list";
import { SidebarDemo } from "@/components/ui/sidebar-demo";
import ConditionalHeader from "@/app/(homepage)/user-header";

export default async function StudentDashboard() {
  const user = await currentUser();

  if (!user?.id) {
    // Preserve the success parameter when redirecting to login
    return redirect("/auth/login?callbackUrl=/dashboard/student?success=1");
  }

  // Store the success status in the database if needed
  if (new URLSearchParams(window.location.search).get('success') === '1') {
    // Wait a few seconds for the webhook to complete
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  // Fetch enrolled courses with progress
  const enrolledCourses = await db.enrollment.findMany({
    where: {
      userId: user.id,
    },
    include: {
      course: {
        include: {
          category: true,
          chapters: true,
        }
      }
    }
  });

  console.log("User ID:", user.id);
  console.log("Enrollment count:", enrolledCourses.length);

  const courses = enrolledCourses.map((enrollment) => ({
    ...enrollment.course,
    progress: 0,
  }));

  return (
    <>
      <ConditionalHeader user={user} />
      <SidebarDemo>
        <div className="p-6 mt-20">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">My Enrolled Courses</h1>
            <p className="text-muted-foreground">
              Continue learning from where you left off
            </p>
          </div>
          
          {courses.length === 0 ? (
            <div className="text-center text-muted-foreground mt-10">
              <p>You haven't enrolled in any courses yet.</p>
              <p className="mt-2">If you just enrolled, please wait a moment for your enrollment to be processed.</p>
            </div>
          ) : (
            <CoursesList items={courses} />
          )}
        </div>
      </SidebarDemo>
    </>
  );
} 