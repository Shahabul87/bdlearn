import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";

import { Categories } from "./_components/categories";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
};

const SearchPage = async ({
  searchParams
}: SearchPageProps) => {
    const user = await currentUser();

    if(!user?.id){
        return redirect("/");
    }
    
    const userId = user?.id;

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  });
  //console.log(searchParams)
  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  console.log(courses)

  return (
    <>
      {/* <div className="px-6 pt-10 md:hidden md:mb-0 block">
        <SearchInput />
      </div> */}
      <div className="p-6 space-y-4">
        <Categories
          items={categories}
        />
        <CoursesList items={courses} />
      </div>
    </>
   );
}
 
export default SearchPage;