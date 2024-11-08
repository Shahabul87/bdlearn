
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
import IconDownload from "./icondownload";
import { MainFooter } from "./main-footer";
import { FeatureAction } from "./feature-action";
import DottedBorder from "./dotted-border";



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

  //console.log(user)

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
          
      {/* <HomeComponentOne /> */}
      <IconDownload />
      {/* <InfiniteMovingCardsDemo /> */}
      <div className ="h-full w-full mt-0 p-4 ">
          <div className="p-6 space-y-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="h-[15rem] border-t border-gray-700 p-8">
            <div className="flex items-center justify-center mb-5">
              <h1 className="text-white/80 text-4xl lg:text-5xl font-bold mb-4">
                  Course Categories
                </h1>
            </div>
            <Categories
              items={categories}
            />
          </div>
          </div>
          <div className="border-t border-gray-700 p-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"></div>
          <div className="flex items-center justify-center mb-5 ">
            <h1 className="text-white/80 text-4xl lg:text-5xl font-bold mb-4">
                Course Section
              </h1>
          </div>
          
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
      <div className="border-t border-gray-700 p-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"></div>
         <div className="flex items-center justify-center mb-5 ">
            <h1 className="text-white/80 text-4xl lg:text-5xl font-bold mb-4">
                My Blogs
              </h1>
          </div>
          <div className="border-t border-gray-700 p-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"></div>
          <div className="flex items-center justify-center mb-5 ">
            <h1 className="text-white/80 text-4xl lg:text-5xl font-bold mb-4">
                My Thoughts and Philosophy
              </h1>
          </div>
          <div className="border-t border-gray-700 p-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"></div>
          <div className='container'>
            <AppleCardsCarouselDemo />
          </div>
          <div className="border-t border-gray-700 p-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"></div>
          
      <FeatureAction />
      <CallToAction />
      
      <Footer />
      <MainFooter />
     
         
    </>
      
   )
 
      
}
export default Home;