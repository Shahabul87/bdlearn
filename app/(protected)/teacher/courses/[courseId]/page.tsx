import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form";
import { AttachmentForm } from "./_components/attachment-form";
import { ChaptersForm } from "./_components/chapters-form";
import { Actions } from "./_components/actions";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";
import { FileUploadForm } from "./_components/file-upload-form";
import { Header } from "@/app/(homepage)/header";
import { HeaderAfterLogin } from "@/app/(homepage)/header-after-login";
import { SidebarDemo } from "@/components/ui/sidebar-demo";
import { ImageFormCombined } from "./_components/image-upload-form-combined";
import ConditionalHeader from "@/app/(homepage)/user-header";
import { cn } from "@/lib/utils";
import { CourseImageUpload } from "./_components/course-image-upload";



const CourseIdPage = async ({params}:{params:{courseId:string}})=> {


   const user:any = await currentUser();

   if(!user?.id){
       return redirect("/");
   }
   
   const userId = user?.id;

   const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  console.log(course)

   const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

   if (!course) {
    return redirect("/");
  }
  
  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some(chapter => chapter.isPublished),
  ];
  // 

 //console.log(requiredFields)
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;
 

  const isComplete = requiredFields.every(Boolean);


  return (
    <>
      <ConditionalHeader user={user} />
      <SidebarDemo>
        <div className={cn(
          "min-h-screen",
          "bg-gray-50 dark:bg-gray-900",
          "transition-colors duration-300"
        )}>
          <div className="pt-20">
            {!course.isPublished && (
              <div className="px-4 md:px-8 mb-6">
                <Banner label="This course is unpublished. It will not be visible to the students." />
              </div>
            )}
            
            <div className="p-4 md:p-8">
              {/* Course Setup Header */}
              <div className={cn(
                "rounded-xl",
                "border border-gray-200 dark:border-gray-700/50",
                "bg-white/50 dark:bg-gray-800/50",
                "backdrop-blur-sm shadow-lg"
              )}>
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                        Course Setup
                      </h1>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Complete all fields {completionText}
                      </span>
                    </div>
                    <Actions
                      disabled={!isComplete}
                      courseId={params.courseId}
                      isPublished={course.isPublished}
                    />
                  </div>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-8 mt-4 sm:mt-8">
                {/* Left Column */}
                <div className="space-y-4 sm:space-y-6">
                  <div className={cn(
                    "rounded-xl",
                    "border border-gray-200 dark:border-gray-700/50",
                    "bg-white/50 dark:bg-gray-800/50",
                    "backdrop-blur-sm p-4 sm:p-6"
                  )}>
                    <div className="flex items-center gap-x-2 mb-4 sm:mb-6">
                      <IconBadge icon={LayoutDashboard} />
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Customize your course
                      </h2>
                    </div>
                    
                    <div className="space-y-4 sm:space-y-6">
                      <TitleForm initialData={course} courseId={course.id} />
                      <DescriptionForm initialData={course} courseId={course.id} />
                      <CategoryForm
                        initialData={course}
                        courseId={course.id}
                        options={categories.map((category) => ({
                          label: category.name,
                          value: category.id,
                        }))}
                      />
                      <CourseImageUpload 
                        courseId={params.courseId}
                        initialImage={course.imageUrl}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Chapters Section */}
                  <div className={cn(
                    "rounded-xl",
                    "border border-gray-200 dark:border-gray-700/50",
                    "bg-white/50 dark:bg-gray-800/50",
                    "backdrop-blur-sm p-4 sm:p-6"
                  )}>
                    <div className="flex items-center gap-x-2 mb-4 sm:mb-6">
                      <IconBadge icon={ListChecks} />
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Course Chapters
                      </h2>
                    </div>
                    <ChaptersForm initialData={course} courseId={course.id} />
                  </div>

                  {/* Price Section */}
                  <div className={cn(
                    "rounded-xl",
                    "border border-gray-200 dark:border-gray-700/50",
                    "bg-white/50 dark:bg-gray-800/50",
                    "backdrop-blur-sm p-4 sm:p-6"
                  )}>
                    <div className="flex items-center gap-x-2 mb-4 sm:mb-6">
                      <IconBadge icon={CircleDollarSign} />
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Sell your course
                      </h2>
                    </div>
                    <PriceForm initialData={course} courseId={course.id} />
                  </div>

                  {/* Attachments Section */}
                  <div className={cn(
                    "rounded-xl",
                    "border border-gray-200 dark:border-gray-700/50",
                    "bg-white/50 dark:bg-gray-800/50",
                    "backdrop-blur-sm p-4 sm:p-6"
                  )}>
                    <div className="flex items-center gap-x-2 mb-4 sm:mb-6">
                      <IconBadge icon={File} />
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Resources & Attachments
                      </h2>
                    </div>
                    <AttachmentForm initialData={course} courseId={course.id} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarDemo>
    </>
  );
}


export default CourseIdPage;