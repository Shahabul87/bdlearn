import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ChaptersFormCourseHome } from "./chapters/[chapterId]/_components/chapters-form-course-home";
import { cn } from "@/lib/utils";

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

  if (!course) {
    return redirect("/");
  }


  return (
    <div className="bg-sky-300 h-full mx-6">
      <div className="h-[500px] bg-slate-400">
        <h1 className="text-4xl font-bold p-2 text-white"> {course.title}</h1>
      </div>
      <div className="h-[250px] bg-orange-300">
        <h1 className="text-4xl font-bold p-2 text-white">Course Description</h1>
        <p className="p-2">{course.description}</p>
      </div>
      <div className="h-[200px] bg-blue-500">
        <h1 className="text-4xl font-bold p-2 text-white">What skill you want to build</h1>
      </div>
      <div className="h-[200px] bg-red-400">
        <h1 className="text-4xl font-bold p-2 text-white">Course Details</h1>
      </div>
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold p-2 text-black">Course Chapters</h1>  
       <div className="">
          <ChaptersFormCourseHome 
                course ={course}
            />
        </div> 
      </div>
    </div>
  )

 
}
 
export default CourseIdPage;