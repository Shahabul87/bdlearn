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
        <>
       
        <div>
            <ConditionalHeader user={user} />
        </div>
          <SidebarDemo >
             <TabsWrapper 
               defaultValue={currentTab} 
               className="w-full p-4 mt-20"
             >
              <ScrollableTabs />

              <TabsContent value="courses" className="mt-8 sm:mt-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 p-2 sm:px-8">
                  {userData?.courses.map((course) => (
                    <MyCourseCard key={course.id} course={course} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="posts" className="mt-8 sm:mt-12">
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

              <TabsContent value="social" className="mt-8 sm:mt-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 p-2 sm:px-8">
                  {userData?.profileLinks?.map((profileLink) => (
                    <MySocialMediaCard 
                      key={profileLink.id} 
                      profileLink={profileLink} 
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="videos" className="mt-8 sm:mt-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 p-2 sm:px-8">
                  {userData?.favoriteVideos?.map((video) => (
                    <MyFavoriteVideoCard key={video.id} video={video} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="audios" className="mt-8 sm:mt-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 p-2 sm:px-8">
                  {userData?.favoriteAudios?.map((audio) => (
                    <MyFavoriteAudioCard key={audio.id} audio={audio} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="blogs" className="mt-8 sm:mt-12">
                <div className="p-2 sm:px-8">
                  <MyFavoriteBlogCard blogs={userData?.favoriteBlogs || []} />
                </div>
              </TabsContent>

              <TabsContent value="articles" className="mt-8 sm:mt-12">
                <div className="p-2 sm:px-8">
                  <MyFavoriteArticleCard articles={userData?.favoriteArticles || []} />
                </div>
              </TabsContent>

              <TabsContent value="subscriptions" className="mt-8 sm:mt-12">
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
            </TabsWrapper>
          </SidebarDemo >
          <Footer />
        </>
    )
}


export default User