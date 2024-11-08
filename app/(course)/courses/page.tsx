import { db } from "@/lib/db";
import { getCoursesForHomepage } from "@/actions/get-all-courses";
import { Categories } from "@/app/(protected)/search/_components/categories";
import { CourseCardHome } from "@/components/course-card-home";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/app/(homepage)/header";
import { HeaderAfterLogin } from "@/app/(homepage)/header-after-login";
import { Footer } from "@/app/(homepage)/footer";
import { currentUser } from '@/lib/auth'


interface SearchPageProps {
    searchParams: {
      title: string;
      categoryId: string;
    }
  };

const CoursesPage = async({ searchParams}: SearchPageProps) => {

  const user =await currentUser();

const categories = await db.category.findMany({
    orderBy: {
        name: "asc"
    }
    });

    const courses = await getCoursesForHomepage({...searchParams});
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
               
        <div className ="mt-20">
         <div className ="h-full w-full mt-0 p-4 ">
          
          <div className="flex items-center justify-center mb-5">
            
              <h1 className="text-white/80 text-4xl lg:text-5xl font-bold mb-4">
                  Course Categories
                </h1>
            </div>
            <div className="p-6 space-y-4 ">
            <Categories
              items={categories}
            />
          </div>
          
                    <div className="border-t border-gray-700 p-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"></div>
                    <div className="flex items-center justify-center mb-5 ">
                    <h1 className="text-white/80 text-4xl lg:text-5xl font-bold mb-4">
                        Course Section
                      </h1>
                  </div>
                  <div className="border-t border-gray-700 p-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"></div>
        
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-6 gap-4 ">
                      {courses.map((item) => (
                          <CourseCardHome
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            imageUrl={item.imageUrl!}
                            price={item.price!}
                            category={item?.category?.name!}
                            description ={item.description}
                          />
                      ))}
                    </div>
            {courses.length === 0 && (
              <div className="text-center text-sm text-muted-foreground mt-10">
                No courses found
              </div>
            )}
          
      </div>
        </div>
        </>
    )
}


export default CoursesPage