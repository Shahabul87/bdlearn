import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { currentUser } from '@/lib/auth'
import ConditionalHeader from "@/app/(homepage)/user-header";
import { SidebarDemo } from "@/components/ui/sidebar-demo";
import { PostTitleForm } from "./_components/post-title-form";
import { PostImageUpload } from "./_components/post-image-upload";
import { Heading } from "@/components/heading";
import { PostChaptersForm } from "./_components/post-section-creation";
import { GradientDivider } from "@/components/border";
import { Footer } from "@/app/(homepage)/footer";
import { Banner } from "@/components/banner";
import { PostActions } from "./_components/post-actions";
import { PostCategory } from "./_components/post-category";
import { PostDescription } from "./_components/post-description";




const PostEditPage = async ({params}: {params: { postId: string; }}) => {


  const post = await db.post.findUnique({
    where: {
      id: params.postId,
    },
    include: {
      comments: {
        // Only include published comments if applicable
        where: {
          // isPublished: true, // Uncomment if you have an `isPublished` field
        },
        orderBy: {
          createdAt: "asc",
        },
      },
      reactions: true, // Include all reactions
      tags: true, // Include all tags associated with the post
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      postchapter: {
        orderBy: {
          position: "asc",
        },
      },
      imageSections: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });


  //console.log(post)
  
    const user:any =await currentUser();
    
    
    if(!user?.id){
        return redirect("/");
    }
    
    const userId = user?.id;

    if (!post) {
        return redirect("/");
        
    }

    const requiredFields = [
      post.title,
      post.description,
      post.imageUrl,
      post.category,
      post.postchapter.some(chapter => chapter.isPublished),
    ];
    
    // Console log for debugging purposes
   // console.log(requiredFields);
    
    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    
    const completionText = `(${completedFields}/${totalFields})`;
    
    const isComplete = requiredFields.every(Boolean);
    

    return (
        <>
        
         <div>
            <ConditionalHeader user={user} />
         </div> 
         <SidebarDemo>
         <Heading tag="h1" text="Post Edit Page" className="mt-10 p-2 text-center"/>
         {!post.published && (
            <Banner
              label="This course is unpublished. It will not be visible to the students."
                />
              )}
        <div className="p-1 mt-5">
          <div className="">
            <div className="flex items-center justify-between bg-gray-700 p-2 px-8 border border-[#94a3b8] rounded-md">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium text-white">
                  Post Creation
                </h1>
                <span className="text-sm text-cyan-500">
                  Complete all fields {completionText}
                </span>
              </div>
              <PostActions
                disabled={!isComplete}
                postId={params.postId}
                isPublished={post.published}
              />
            </div>
          </div>
        </div>
        
       
         <PostTitleForm 
           initialData={post}
           postId={post.id}
         />
         <PostCategory
            initialData={post}
            postId={post.id}
       
          />  
          
          <PostDescription 
            initialData={post}
            postId={post.id}
           />

          <PostChaptersForm 
           initialData={post}
           postId={post.id}
         />
        
          <PostImageUpload 
           initialData={post}
           postId={post.id}
         />
         </SidebarDemo>
         {/* <section className="px-6 bg-gray-900 border border-[#94a3b8]/30 mt-10">
          <div>
            <Heading tag="h3" text={post.title} className="mt-10 p-2 text-center"/>
            <GradientDivider />
          </div>
          <div className="relative w-full aspect-video rounded-md overflow-hidden p-6">
            <div className="p-10 rounded-md">
            <Image
              fill
              className="object-cover"
              alt={post.title}
              src={post.imageUrl || "/placeholder-image.jpg"} // Fallback if imageUrl is null or undefined
              sizes="(max-width: 640px) 100vw, 
                    (max-width: 768px) 75vw, 
                    (max-width: 1024px) 50vw, 
                    33vw" // Responsive sizes for better loading performance
            />
            </div>
          </div>
            <div className=" py-10">
            <div className=" grid grid-cols-1 md:grid-cols-2 mb-8">
              <div className="p-6 text-[#94a3b8]/80 md:text-lg font-sans tracking-wide">
                <p className="text-justify">
                    {post.postchapter[0]?.description
                      ? post.postchapter[0].description.replace(/<[^>]+>/g, "")
                      : "No description available"}
                </p>
              </div>
              <div>
                  <div className="relative w-full aspect-video rounded-md overflow-hidden bg-gray-900">
                      
                  <div className="p-10">
                    <Image
                        fill
                        className="object-cover "
                        alt={post.title}
                        src={post.postchapter[0].imageUrl || "/placeholder-image.jpg"} // Fallback if imageUrl is null or undefined
                        sizes="(max-width: 640px) 100vw, 
                              (max-width: 768px) 75vw, 
                              (max-width: 1024px) 50vw, 
                              33vw" // Responsive sizes for better loading performance
                      />
                  </div>
                  </div>

              </div>

            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 mb-8">
              <div>
              <div className="relative w-full aspect-video rounded-md overflow-hidden p-4 bg-gray-900">
              <div className="p-10 ">
                      <Image
                        fill
                        className="object-cover"
                        alt={post.title}
                        src={post.postchapter[1].imageUrl || "/placeholder-image.jpg"} // Fallback if imageUrl is null or undefined
                        sizes="(max-width: 640px) 100vw, 
                              (max-width: 768px) 75vw, 
                              (max-width: 1024px) 50vw, 
                              33vw" // Responsive sizes for better loading performance
                      />
                  </div>
                  </div>
              </div>
              <div className="p-6 text-[#94a3b8]/80 bg-gray-900 font-sans tracking-wide md:text-lg">
                <p className="text-justify">
                    {post.postchapter[1]?.description
                      ? post.postchapter[1].description.replace(/<[^>]+>/g, "")
                      : "No description available"}
                </p>
              </div>

            </div>
         

           </div>

         </section> */}
         <Footer />
        </>
    )
}


export default PostEditPage