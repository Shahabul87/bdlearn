// import { currentUser } from "@/lib/auth";
// import { redirect } from "next/navigation";

// import { db } from "@/lib/db";
// import { getProgress } from "@/actions/get-progress";

// import { CourseSidebar } from "./_components/course-sidebar";
// import { CourseNavbar } from "./_components/course-navbar";

const CourseLayout = async ({
  children,
 
}: {
  children: React.ReactNode;
  
}) => {
  //   const user = await currentUser();

  //   if(!user?.id){
  //       return redirect("/");
  //   }
    
  //   const userId = user?.id;
    
  //   const course = await db.course.findUnique({
  //     where: {
  //       id: params.courseId,
  //     },
  //     include: {
  //       chapters: {
  //         where: {
  //           isPublished: true,
  //         },
  //         include: {
  //           userProgress: {
  //             where: {
  //               userId,
  //             }
  //           }
  //         },
  //         orderBy: {
  //           position: "asc"
  //         }
  //       },
  //     },
  //   });

  // if (!course) {
  //   return redirect("/");
  // }

  // const progressCount = await getProgress(userId, course.id);

  return (
    <div className="h-full">
      {/* <div className="h-[80px] mt-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <CourseNavbar course={course} progressCount={progressCount} />
      </div> */}
      {/* <div className="hidden md:flex mt-[80px] h-full w-80 flex-col">
        <CourseSidebar course={course} progressCount={progressCount} />
      </div> */}
      <main className="h-full">
        {children}
      </main>
    </div>
  )
    
 
  
}

export default CourseLayout