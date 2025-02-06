import { SidebarDemo } from "@/components/ui/sidebar-demo"
import ConditionalHeader from "../(homepage)/user-header"
import { currentUser } from '@/lib/auth'
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ScrollableTabs } from "./_components/ScrollableTabs";

import { Footer } from "../(homepage)/footer";
import MyCourseCard from "./_components/my-course-card";
import MyPostCard from "./_components/my-post-card";
import MyFavoriteVideoCard from "./_components/my-favorite-video-card";
import MyFavoriteAudioCard from "./_components/my-favorite-audio-card";
import MyFavoriteBlogCard from "./_components/my-favorite-blog-card";
import MyFavoriteArticleCard from "./_components/my-favorite-article-card";
import MySubscriptionCard from "./_components/my-subscription-card";
import MySocialMediaCard from "./_components/my-social-media-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import { TabsWrapper } from './_components/TabsWrapper';
import { NavigationArrows } from "./_components/NavigationArrows";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

const User = async ({ searchParams }: Props) => {

  const user:any =await currentUser();
  
  if(!user?.id){
    return redirect("/");
  }

  

  const userId = user?.id; // Replace with the actual user ID

  //console.log(userId);

  const userData = await db.user.findUnique({
    where: { id: userId },
    include: {
      accounts: true,
      courses: true,
      twoFactorConfirmation: true,
      profileLinks: true,
      posts: {
        include: {
          comments: true,
          replies: true,
          user: true,
          reactions: true,
          postchapter: true,
          imageSections: true
        }
      },
      comments: {
        include: {
          replies: true
        }
      },
      videos: true,
      blogs: true,
      articles: true,
      notes: true,
      favoriteVideos: true,
      favoriteAudios: true,
      favoriteArticles: true,
      favoriteBlogs: true,
      favoriteImages: true,
      subscriptions: true
    }
  });
  
  
  

 //console.log(userData?.favoriteArticles)

  // Get the tab from URL or default to 'courses'
  const currentTab = searchParams?.tab?.toString() || 'courses';

  return (
    <div className="min-h-screen flex flex-col">
      <ConditionalHeader user={user} />
      
      {/* Main Content */}
      <SidebarDemo>
        <TabsWrapper 
          defaultValue={currentTab} 
          className="w-full"
        >
          {/* Tabs Navigation Bar */}
          <div className="sticky top-16 z-30 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-screen-2xl mx-auto relative">
              <NavigationArrows />
              
              {/* Tabs List with proper overflow handling */}
              <div className="overflow-x-auto scrollbar-hide mx-8 md:mx-0"> {/* Added padding for arrow buttons */}
                <TabsList className="w-full h-14 bg-transparent justify-start flex-nowrap min-w-max px-2">
                  <ScrollableTabs />
                </TabsList>
              </div>
            </div>
          </div>

          {/* Content Container with Padding for Sticky Header */}
          <div className="pt-[56px]"> {/* Height of the tabs (h-14 = 56px) */}
            <TabsContent value="courses">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 p-2 sm:px-8">
                {userData?.courses.map((course) => (
                  <MyCourseCard key={course.id} course={course} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="posts">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 p-2 sm:px-8">
                {userData?.posts.map((post) => (
                  <MyPostCard 
                    key={post.id} 
                    post={{
                      ...post, 
                      content: post.description || '',
                      imageUrl: post.imageUrl || undefined,
                      user: {
                        ...post.user,
                        name: post.user.name || '',
                        image: post.user.image || '/placeholder.jpg'
                      },
                      imageSections: post.imageSections.map(img => ({
                        id: img.id,
                        url: img.imageUrl,
                        postId: img.postId
                      }))
                    }} 
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="social">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 p-2 sm:px-8">
                {userData?.profileLinks?.map((profileLink) => (
                  <MySocialMediaCard 
                    key={profileLink.id} 
                    profileLink={profileLink} 
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 p-2 sm:px-8">
                {userData?.favoriteVideos?.map((video) => (
                  <MyFavoriteVideoCard key={video.id} video={video} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="audios">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 p-2 sm:px-8">
                {userData?.favoriteAudios?.map((audio) => (
                  <MyFavoriteAudioCard key={audio.id} audio={audio} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="blogs">
              <div className="p-2 sm:px-8">
                <MyFavoriteBlogCard blogs={userData?.favoriteBlogs || []} />
              </div>
            </TabsContent>

            <TabsContent value="articles">
              <div className="p-2 sm:px-8">
                <MyFavoriteArticleCard articles={userData?.favoriteArticles || []} />
              </div>
            </TabsContent>

            <TabsContent value="subscriptions">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-2 sm:px-8">
                {userData?.subscriptions?.map((subscription, index) => {
                  // Calculate total amount from all subscriptions
                  const totalAmount = userData.subscriptions.reduce((acc, curr) => {
                    return acc + (Number(curr.amount) || 0);
                  }, 0);

                

                  // Count active subscriptions
                  const activeSubscriptions = userData.subscriptions.filter(sub => {
                    const endDate = new Date(sub.endOfSubscription);
                    const now = new Date();
                 
                  
                    return endDate.getTime() > now.getTime();
                  }).length;

                

                  return (
                    <MySubscriptionCard 
                      key={subscription.id} 
                      subscription={{
                        ...subscription,
                        position: subscription.position ?? undefined,
                        category: subscription.category ?? undefined,
                        dateOfSubscription: new Date(subscription.dateOfSubscription),
                        endOfSubscription: new Date(subscription.endOfSubscription),
                        amount: Number(subscription.amount),
                      }}
                      isFirstCard={index === 0}
                      totalSubscriptions={activeSubscriptions}
                      totalAmount={totalAmount}
                    />
                  );
                })}
              </div>
            </TabsContent>
          </div>
        </TabsWrapper>
      </SidebarDemo>
      <Footer />
    </div>
  )
}


export default User