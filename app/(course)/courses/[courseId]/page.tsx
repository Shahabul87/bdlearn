import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ChaptersFormCourseHome } from "./chapters/[chapterId]/_components/chapters-form-course-home";
import { CourseHero } from "./_coursedetails/course-hero-section";
import { CourseObjectives } from "./_coursedetails/course-objective";
import { CourseReviewPage } from "./_coursedetails/course-review";
import { currentUser } from '@/lib/auth'
import CourseCard from "./course-feature";
import { CourseTabsDemo } from "./course-tab-demo";
import { Footer } from "@/app/(homepage)/footer";
import { CourseContent } from "./course-content";
import { GradientDivider } from "@/components/border";
import { Heading } from "@/components/heading";
import ConditionalHeader from "@/app/(homepage)/user-header";


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
 const sectionsData: Section[] = [
  {
    title: 'Introduction to ChatGPT',
    lectureCount: 3,
    totalDuration: '10 min',
    lectures: [
      { title: 'Welcome and Course Overview', duration: '03:28', preview: true },
      { title: 'Meet the Instructors', duration: '02:15' },
      { title: 'How to Use This Course', duration: '04:17', preview: true }
    ]
  },
  {
    title: 'Understanding Generative AI',
    lectureCount: 5,
    totalDuration: '24 min',
    lectures: [
      { title: 'What is Generative AI?', duration: '05:12' },
      { title: 'The Rise of AI in 2024', duration: '04:45', preview: true },
      { title: 'Applications of AI in Everyday Life', duration: '06:23' },
      { title: 'Ethical Considerations in AI', duration: '03:56' },
      { title: 'AI vs Traditional Software', duration: '04:11' }
    ]
  },
  {
    title: 'ChatGPT Fundamentals',
    lectureCount: 7,
    totalDuration: '35 min',
    lectures: [
      { title: 'Understanding the ChatGPT Interface', duration: '05:05' },
      { title: 'ChatGPT Plus: What You Get', duration: '04:30' },
      { title: 'Prompt Engineering Basics', duration: '05:45', preview: true },
      { title: 'Customizing Responses', duration: '04:59' },
      { title: 'Handling Large Conversations', duration: '03:28' },
      { title: 'Using ChatGPT for Research', duration: '06:15' },
      { title: 'Limitations and Future of ChatGPT', duration: '05:01' }
    ]
  },
  {
    title: 'Advanced Prompting Techniques',
    lectureCount: 6,
    totalDuration: '29 min',
    lectures: [
      { title: 'Deep Dive into Prompt Structures', duration: '04:25' },
      { title: 'Optimizing Responses with Context', duration: '05:10' },
      { title: 'Multi-Step Prompts for Complex Tasks', duration: '06:20' },
      { title: 'Role-Based Prompts for Different Use Cases', duration: '04:35' },
      { title: 'Using ChatGPT for Creative Writing', duration: '03:45' },
      { title: 'Improving Prompt Accuracy', duration: '04:50', preview: true }
    ]
  },
  {
    title: 'Real-World Use Cases',
    lectureCount: 4,
    totalDuration: '18 min',
    lectures: [
      { title: 'ChatGPT for Business Automation', duration: '05:30' },
      { title: 'ChatGPT for Personal Productivity', duration: '04:40' },
      { title: 'ChatGPT for Customer Service', duration: '04:25', preview: true },
      { title: 'ChatGPT for Education and Learning', duration: '03:25' }
    ]
  }
];



 const user:any =await currentUser();

  if (!course) {
    return redirect("/");
    
  }


  return (
    <>
       
    <div>
      <ConditionalHeader user={user} />
    </div> 
    <section className="mt-20">
      <CourseCard />
     
      <Heading tag="h1" text="Course Learning Outcomes" className="mt-10 p-2 text-center"/>
        {/* <div className="flex items-center justify-center mb-5 ">
            <h1 className="text-white/80 text-4xl lg:text-5xl font-bold mb-4">
                Course Learning Outcomes
              </h1>
        </div> */}
      <GradientDivider padding="p-2 mt-5"/>
      <CourseTabsDemo />
   {/* <CourseHero
        title={course.title}
        description={course.description || "No description available"}
        imageSrc={course.imageUrl || "/default-image.jpg"} // Provide a default image path
      /> */}
   
    <Heading tag="h1" text="Skill You Build" className="mt-10 p-2 text-center"/>
    <GradientDivider padding="p-8"/>
    <CourseObjectives />
    
    <Heading tag="h1" text="Course Content"/>
    <GradientDivider padding="p-8"/>
    <div className="min-h-screen p-8">
      <CourseContent sections={sectionsData} />
    </div>
    {/* <div className=" h-full mx-6">
       <div className="">
          <ChaptersFormCourseHome 
                course ={course}
            />
        </div> 
      </div> */}
      <CourseReviewPage />
    </section>
    <Footer />
    </>
  )

 
}
 
export default CourseIdPage;