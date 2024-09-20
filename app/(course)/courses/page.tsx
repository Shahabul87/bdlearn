import { db } from "@/lib/db";
import { getCoursesForHomepage } from "@/actions/get-all-courses";
import { Categories } from "@/app/(protected)/search/_components/categories";
import { CourseCardHome } from "@/components/course-card-home";
import { Separator } from "@/components/ui/separator";

interface SearchPageProps {
    searchParams: {
      title: string;
      categoryId: string;
    }
  };

const CoursesPage = async({ searchParams}: SearchPageProps) => {



const categories = await db.category.findMany({
    orderBy: {
        name: "asc"
    }
    });

    const courses = await getCoursesForHomepage({...searchParams});
    return (
        <div className ="mt-20">
         <div className ="h-full w-full mt-0 p-4 ">
          <div className="p-6 space-y-4 ">
            <Categories
              items={categories}
            />
          </div>
          <Separator className="mb-4"/>
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
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
    )
}


export default CoursesPage