import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ChaptersFormCourseHome } from "./chapters/[chapterId]/_components/chapters-form-course-home";
import { cn } from "@/lib/utils";
import { CourseHero } from "./_coursedetails/course-hero-section";
import { CourseObjectives } from "./_coursedetails/course-objective";
import { CourseReviewPage } from "./_coursedetails/course-review";
import { Header } from "@/app/(homepage)/header";
import { HeaderAfterLogin } from "@/app/(homepage)/header-after-login";
import { currentUser } from '@/lib/auth'

const CourseIdPage = async ({params}: {params: { courseId: string; }}) => {
  
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
        include: {
          sections: {
            where: {
              isPublished: true,
            },
            orderBy: {
              position: "asc",
            },
          },
        },
      },
    },
  });
  
 //console.log(course)


 const user =await currentUser();

  if (!course) {
    return redirect("/");
    
  }


  return (
    <>
       
       {!user? (
                 <>
                    <div className="">
                       <Header />
                    </div>
               </> ):
               (
                <>
                <HeaderAfterLogin />
                </>
               )}   
    <section className="mt-20">
   <CourseHero
        title={course.title}
        description={course.description || "No description available"}
        imageSrc={course.imageUrl || "/default-image.jpg"} // Provide a default image path
      />
    <CourseObjectives />
    <div className=" h-full mx-6">
       <div className="">
          <ChaptersFormCourseHome 
                course ={course}
            />
        </div> 
      </div>
      <CourseReviewPage />
    </section>
    </>
  )

 
}
 
export default CourseIdPage;