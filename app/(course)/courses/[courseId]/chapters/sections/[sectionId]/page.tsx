import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { SectionSidebar } from "./section-sidebar";
import { Header } from "@/app/(homepage)/header";
import { HeaderAfterLogin } from "@/app/(homepage)/header-after-login";
import { currentUser } from '@/lib/auth'


const sectionIdPage = async ({params}: {params: { courseId: string; sectionId: string; }}) => {
  
  const user =await currentUser();
  const section = await db.section.findUnique({
    where: {
      id: params.sectionId,
    },
  });

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
 
 if (!section) {
    return redirect("/");
  }

  if (!course) {
    return redirect("/");
  }

  const handlePrev = () => {
    // Logic to navigate to the previous video
  };

  const handleNext = () => {
    // Logic to navigate to the next video
  };


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
    <div className="min-h-screen bg-slate-800">
      <div className=" ml-10">
        <h1 className="text-2xl text-white font-bold p-2 pl-10"> {section.title}</h1>
      </div>
      <div className="flex flex-col xl:flex-row p-4 xl:mx-10">
      <div className="flex-1 xl:mr-4">
      <div className="flex justify-center">
            {section.videoUrl ? (
                <div className="relative w-full pb-[56.25%]"> {/* 16:9 aspect ratio */}
                {/* Displaying YouTube iframe if videoUrl exists */}
                <iframe
                    className="absolute top-0 left-0 w-full h-full "
                    src={`https://www.youtube.com/embed/${new URL(section.videoUrl).searchParams.get("v")}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                </div>
            ) : (
                <h1>No video has been found</h1>
            )}
            </div>

        <div className="flex items-center justify-between mt-1 pl-3 pr-3">
          <button  className="bg-blue-500 text-white px-4 py-2 rounded">
            Prev
          </button>
          <button  className="bg-blue-500 text-white px-4 py-2 rounded">
            Next
          </button>
        </div>
      </div>
      <div className="flex-none xl:w-1/3 border rounded-md mt-12 xl:mt-0 overflow-y-hidden shadow-md">
      
           <SectionSidebar course={course} />
  
        
      </div>
    </div>
    </div>
    </>
  )

 
}
 
export default sectionIdPage;








