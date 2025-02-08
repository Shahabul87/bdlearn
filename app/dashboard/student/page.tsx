import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { CoursesList } from "@/components/courses-list";
import { SidebarDemo } from "@/components/ui/sidebar-demo";
import ConditionalHeader from "@/app/(homepage)/user-header";

export default async function StudentDashboard() {
  const user = await currentUser();
  console.log("Current user:", user?.id);

  if (!user?.id) {
    return redirect("/");
  }

  // First check if any enrollments exist
  const enrollmentCount = await db.enrollment.count({
    where: {
      userId: user.id,
    }
  });
  console.log("Total enrollments:", enrollmentCount);

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
  
  console.log("Enrolled courses:", JSON.stringify(enrolledCourses, null, 2));

  // Simplify the transformation for now
  const courses = enrolledCourses.map((enrollment) => ({
    ...enrollment.course,
    progress: 0, // We'll add progress calculation back once basic display works
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
            </div>
          ) : (
            <CoursesList items={courses} />
          )}
        </div>
      </SidebarDemo>
    </>
  );
} 