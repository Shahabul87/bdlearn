import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { currentUser } from '@/lib/auth'
import ConditionalHeader from "@/app/(homepage)/user-header";
import { Heading } from "@/components/heading";
import { SidebarDemo } from "@/components/ui/sidebar-demo";
import { PostChapterTitleForm } from "./_components/post-chapter-title-form";
import { PostChapterDescriptionForm } from "./_components/post-chapter-description-form";
import { PostChapterImageUpload } from "./_components/post-chapter-image-upload";
import { PostChapterActions } from "./_components/post-chapter-actions";
import { Banner } from "@/components/banner";
import { PostChapterAccessForm } from "./_components/post-chapter-access-form";



const PostChaterCreationPage = async ({
    params
  }: {
    params: { postId: string; postchapterId: string }
  }) => {


    const user:any =await currentUser();
    
    
    if(!user?.id){
        return redirect("/");
    }
    
    const userId = user?.id;

    const postchapter = await db.postChapterSection.findFirst({
        where: {
          id: params.postchapterId,
          postId: params.postId,
        },
      });

      if (!postchapter) {
        throw new Error("Post chapter not found"); // Or handle the error appropriately
      }

      //console.log(postchapter)

      const requiredFields = [
        postchapter.title,
        postchapter.description,
        postchapter.imageUrl,
        postchapter.isFree,
  
      ];

      const totalFields = requiredFields.length;
      const completedFields = requiredFields.filter(Boolean).length;
      
      const completionText = `(${completedFields}/${totalFields})`;
      
      const isComplete = requiredFields.every(Boolean);

     // 

    return (

        <>
        <div>
            <ConditionalHeader user={user} />
         </div> 
         <SidebarDemo>

           <Heading tag="h1" text="Post Chapter Edit Page" className="mt-10 p-2 text-center"/>
           {!postchapter.isPublished && (
            <Banner
              label="This post chapter is unpublished. It will not be visible until published."
                />
              )}
              <div className="p-1 mt-5">
                <div className="">
                  <div className="flex items-center justify-between bg-gray-700 p-2 px-8 border border-[#94a3b8] rounded-md">
                    <div className="flex flex-col gap-y-2">
                      <h1 className="text-2xl font-medium text-white">
                        Post Chapter Creation
                      </h1>
                      <span className="text-sm text-cyan-500">
                        Complete all fields {completionText}
                      </span>
                    </div>
                    <PostChapterActions
                        disabled={!isComplete}
                        postId={params.postId}
                        postchapterId={params.postchapterId} // Correct spelling
                        isPublished={postchapter.isPublished}
                      />
                  </div>
                </div>
              </div>

              <PostChapterTitleForm
                initialData={postchapter}
                postId={params.postId}
                postchapterId={params.postchapterId}
               /> 
              <PostChapterDescriptionForm
                initialData={postchapter}
                postId={params.postId}
                postchapterId={params.postchapterId}
               />

               <PostChapterAccessForm
                initialData={postchapter}
                postId={params.postId}
                postChapterId={params.postchapterId}
               />
              <PostChapterImageUpload
                initialData={postchapter}
                postId={params.postId}
                postchapterId={params.postchapterId}
               />
              
         </SidebarDemo>
        </>
    )
}


export default PostChaterCreationPage