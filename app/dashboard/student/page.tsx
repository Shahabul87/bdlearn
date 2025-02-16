import { Suspense } from "react";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import ConditionalHeader from "@/app/(homepage)/user-header";
import { CoursesList } from "./_components/courses-list";
import { LoadingSpinner } from "@/components/loading-spinner";
import { SidebarDemo } from "@/components/ui/sidebar-demo";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function StudentDashboard({ searchParams }: PageProps) {
  const user = await currentUser();

  if (!user?.id) {
    return redirect("/auth/login");
  }

  // Check success parameter from searchParams prop
  if (searchParams.success === '1') {
    // Wait a bit longer for webhook processing
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Verify enrollment after waiting
    const verifyEnrollment = await db.enrollment.findFirst({
      where: {
        userId: user.id,
        courseId: searchParams.courseId as string
      }
    });
    
    if (!verifyEnrollment) {
      console.log("Enrollment verification failed"); // Add logging
    }
  }

  // Fetch enrolled courses with progress
  const enrolledCourses = await db.enrollment.findMany({
    where: {
      userId: user.id
    },
    include: {
      course: {
        include: {
          category: true,
          chapters: {
            include: {
              userProgress: {
                where: {
                  userId: user.id
                }
              }
            }
          }
        }
      }
    }
  });

  console.log("User ID:", user.id);
  console.log("Enrollment count:", enrolledCourses.length);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 mt-20">
      <ConditionalHeader user={user} />
      <SidebarDemo>
      <Suspense fallback={<LoadingSpinner />}>
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            My Courses
          </h1>
          {enrolledCourses.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-600 dark:text-gray-400">
                You haven&apos;t enrolled in any courses yet.
              </p>
              <p className="mt-2">If you just enrolled, please wait a moment for your enrollment to be processed.</p>
            </div>
          ) : (
            <CoursesList courses={enrolledCourses} />
          )}
        </main>
      </Suspense>
      </SidebarDemo>
    </div>
  );
} 