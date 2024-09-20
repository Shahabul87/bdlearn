
import { db } from "@/lib/db";
import { getCoursesForHomepage } from "@/actions/get-all-courses";
import { Categories } from "../(protected)/search/_components/categories";
import { CourseCardHome } from "@/components/course-card-home";
import { Separator } from "@/components/ui/separator";
import { TypewriterEffectSmoothDemo } from "@/components/typewriterdemo";
import { MainNavBar } from "@/components/navbar/main-navbar";
import { InfiniteMovingCardsDemo } from "@/components/infinite-moving-cards-demo";
import { HomeComponentOne } from "./home-component-one";
import { AppleCardsCarouselDemo } from "@/components/cardscarousel/cards-carousel-demo";
import { Header } from "./header";
import { Footer } from "./footer";
import { CallToAction } from "./calltoaction";
import { HeaderAfterLogin } from "./header-after-login";
import { currentUser } from '@/lib/auth'



interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
};

const Home = async({
  searchParams
}: SearchPageProps)=>{
  
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  });
  const user =await currentUser();

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
          
      <HomeComponentOne />
      {/* <InfiniteMovingCardsDemo /> */}
      <div className ="h-full w-full mt-0 p-4 ">
          <div className="p-6 space-y-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <Categories
              items={categories}
            />
          </div>
          <div className='section-heading'>
            <h2 className="section-title">Courses</h2>
            <p className="section-description my-5">
              Free forever. Upgrade for unlimited tasks, better security, and
              exclusive features.
            </p>
          </div>
          <div className="p-4 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 ">
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
         <div className='section-heading'>
            <h2 className="section-title">Blogs</h2>
            <p className="section-description my-5">
              Free forever. Upgrade for unlimited tasks, better security, and
              exclusive features.
            </p>
          </div>
          <div className='container'>
            <AppleCardsCarouselDemo />
          </div>
    
      <CallToAction />
      <Footer />
     
         
    </>
      
   )
 
      
}
export default Home;