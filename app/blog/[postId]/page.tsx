import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { currentUser } from '@/lib/auth'
import { Footer } from "@/app/(homepage)/footer";
import { GradientDivider } from "@/components/border";
import Image from "next/image";
import { SocialMediaShare } from "./_components/social-media-sharing";
import { PostComment } from "./_components/add-comments";
import CommentDisplay from "./_components/comment-display";
import { ReplyComment } from "./_components/reply-comments";
import ReplyDisplay from "./_components/reply-display";




const PostIdPage = async ({params}: {params: { postId: string; }}) => {
  
    const post = await db.post.findUnique({
        where: {
          id: params.postId, // Assuming `params.postId` contains the ID of the post you're looking for
        },
        include: {
          user: true, // Includes the related `User` object based on `userId`
          tags: true, // Includes the related `Tag` objects associated with this post
          comments: {
            include: {
              user: true, // Includes the `User` who made the comment
              reactions: { // Includes all reactions on each comment
                include: {
                  user: true, // Includes the `User` who reacted to the comment
                },
              },
            },
          },
          reply: { // Fetch replies directly associated with the post
            include: {
              user: true, // Includes the `User` who made the reply
              reactions: { // Includes all reactions on each reply
                include: {
                  user: true, // Includes the `User` who reacted to the reply
                },
              },
            },
          },
          reactions: {
            include: {
              user: true, // Includes the `User` who reacted to the post
            },
          },
          postchapter: {
            where: {
              isPublished: true, // Only fetch published chapters
            },
            orderBy: {
              position: "asc", // Order chapters by position
            },
          },
          imageSections: {
            orderBy: {
              position: "asc", // Orders images within the post by their position
            },
          },
        },
      });
      
      
      
  //console.log(post)
    




 const user:any =await currentUser();

  if (!post) {
    return redirect("/");
    
  }


  return (
    <>
    <div className="container mx-auto p-4">
      {/* Post Title and User Information */}
      {post.category && (
        <p className="text-sm font-medium text-gray-500 mb-1">
          {post.category}
        </p>
        )}
      <h1 className="text-3xl font-bold text-sky-500 mb-2">{post.title || "Untitled Post"}</h1>
      <p className="text-gray-400 mb-4">Posted by {post.user?.name || "Unknown Author"}</p>
      <GradientDivider  />
      {/* Created and Updated Dates */}
      <div className="flex justify-between">
        <div className="text-sm text-gray-500 mb-4">
            {post.createdAt && (
                <p>Created on: {new Date(post.createdAt).toLocaleDateString()}</p>
            )}
            {post.updatedAt && (
                <p>Last updated: {new Date(post.updatedAt).toLocaleDateString()}</p>
            )}
        </div>
        <SocialMediaShare postTitle={post.title} />
      </div>


      {/* Post Image */}
      {post.imageUrl && (
        <div className="relative w-full h-70 md:h-96 mb-4 rounded-lg overflow-hidden">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Post Description */}
      <p className="text-lg text-gray-300 mb-6">{post.description || "No description available."}</p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="text-sm bg-gray-600 text-white py-1 px-3 rounded-lg"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Post Reactions */}
          {post.reactions && post.reactions.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-sky-500 mb-2">Reactions</h3>
              <ul className="list-disc list-inside text-gray-300">
                {post.reactions.map((reaction) => (
                  <li key={reaction.id}>
                    {reaction.user?.name || "Anonymous"} reacted with {reaction.type}
                  </li>
                ))}
              </ul>
            </div>
          )}

            {post.postchapter && post.postchapter.length > 0 && (
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-sky-500 mb-2">Chapters</h3>
                {post.postchapter.map((chapter) => {
                // Clean the description by removing <p> tags
                const cleanedDescription = chapter.description
                    ? chapter.description.replace(/<\/?p>/g, "")
                    : null;

                return (
                    <div key={chapter.id} className="mb-4">
                    <h4 className="text-md font-bold text-gray-200">{chapter.title}</h4>
                    
                    {/* Render each line of cleaned description as a separate <p> */}
                    <div className="text-gray-300">
                        {cleanedDescription
                        ? cleanedDescription.split("\n").map((line, index) => (
                            <p key={index} className="mb-2">
                                {line}
                            </p>
                            ))
                        : <p>No description for this chapter.</p>}
                    </div>

                    {chapter.imageUrl && (
                        // <div className="relative w-full h-48 md:h-64 mt-2 rounded-lg overflow-hidden mb-5">
                        // <Image
                        //     src={chapter.imageUrl}
                        //     alt={chapter.title}
                        //     fill
                        //     className="object-cover"
                        // />
                        // </div>
                        <div className="h-[30rem] w-[60rem]  flex items-center justify-center text-white">
                        <Image
                            src={chapter.imageUrl}
                            width={300}
                            height={300}
                            className="h-full w-full object-cover"
                            alt={chapter.title}
                          />
                        </div>
                    )}
                    </div>
                );
                })}
            </div>
            )}





      {/* Image Sections */}
      {post.imageSections && post.imageSections.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-sky-500 mb-2">Image Sections</h3>
          {post.imageSections.map((imageSection) => (
            <div key={imageSection.id} className="mb-4">
              <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden">
                <Image
                  src={imageSection.imageUrl}
                  alt={imageSection.caption || "Image"}
                  layout="fill"
                  className="object-cover"
                />
              </div>
              {imageSection.caption && (
                <p className="text-sm text-gray-400 mt-2">{imageSection.caption}</p>
              )}
            </div>
          ))}
        </div>
      )}

     <PostComment initialData={post} postId={params.postId}  />

      {/* Comments */}
        <CommentDisplay initialData={post} postId={params.postId}/>
       
  
      
    </div>
       
    
    <Footer />
    </>
  )

 
}
 
export default PostIdPage;

