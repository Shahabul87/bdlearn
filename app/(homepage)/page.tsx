import { db } from "@/lib/db";
import { getCoursesForHomepage } from "@/actions/get-all-courses";
import { Categories } from "../(protected)/search/_components/categories";
import { CourseCardHome } from "@/components/course-card-home";
import { InfiniteMovingCardsDemo } from "@/components/infinite-moving-cards-demo";
import { Footer } from "./footer";
import { CallToAction } from "./calltoaction";
import { currentUser } from '@/lib/auth'
import { MainFooter } from "./main-footer";
import { FeatureAction } from "./feature-action";
import ConditionalHeader from "./user-header";
import { getPostsForHomepage } from "@/actions/get-all-posts";
import MyPostCard from "@/app/blog/blog-card";
import HomeHeroSection from "./home-hero-section";
import { HomeFooter } from "./HomeFooter";

const Home = async () => {
  const user = await currentUser();
  const courses = await getCoursesForHomepage();
  const posts = await getPostsForHomepage();

  return (
    <>
      <ConditionalHeader user={user} />
      <HomeHeroSection />
      <div className="min-h-screen">
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          {/* Elegant Featured Courses Section */}
          <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <div className="relative">
              <h2 className="max-w-lg mb-6 font-sans text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:mx-auto">
                <span className="relative inline-block">
                  <span className="relative bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Featured Courses
                  </span>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600/40 to-blue-600/40 transform -skew-x-12" />
                </span>
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-300 md:text-lg font-medium">
                Explore our most popular courses and start learning today
              </p>
            </div>
          </div>
          <div className="grid gap-5 mb-8 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCardHome
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description || ""}
                imageUrl={course.imageUrl!}
                chaptersLength={course.chapters?.length || 0}
                price={course.price!}
                category={course?.category?.name || ""}
              />
            ))}
          </div>
        </div>

        {/* Elegant Blog Posts Section */}
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <div className="relative">
              <h2 className="max-w-lg mb-6 font-sans text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:mx-auto">
                <span className="relative inline-block">
                  <span className="relative bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Featured Blog Posts
                  </span>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600/40 to-blue-600/40 transform -skew-x-12" />
                </span>
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-300 md:text-lg font-medium">
                Read our latest blog posts and stay up to date with the latest trends
              </p>
            </div>
          </div>
          <div className="grid gap-5 mb-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <MyPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>

      {/* <FeatureAction /> */}
      {/* <CallToAction /> */}
      <HomeFooter />
    </>
  );
};

export default Home;
