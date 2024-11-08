

import { db } from "@/lib/db";
import { getPostsForHomepage } from "@/actions/get-all-posts";
import { Categories } from "@/app/(protected)/search/_components/categories";

import { Separator } from "@/components/ui/separator";
import { PostCardBlog } from "./blog-card-post";
import { PostCardOne } from "./post-card-one";

interface SearchPageProps {
  searchParams: {
    title: string;
    category: string;
  }
};

const PostsPage = async ({ searchParams }: SearchPageProps) => {
    try {
   
  
  
      const posts = await getPostsForHomepage({ ...searchParams }) || [];

      //console.log(posts)
  
      return (
        <>
          
          <div className="mt-10 px-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 grid-flow-dense">
              <div className="col-span-3">
                <div className="grid gap-4">
                  <div>
                  {posts.length ? (
                      posts.map((post) => (
                        <PostCardOne
                          key={post.id}
                          id={post.id}
                          title={post.title ?? "Untitled"}
                          imageUrl={post.imageUrl || "/default-image.webp"}
                          category={post.category || "Uncategorized"}
                          description={post.description || "Post description"}
                        />

                ))
              ) : (
                <div className="text-center text-sm text-muted-foreground mt-10">
                  No posts found
                </div>
              )}
                  </div>
                  <div>
                  {posts.length ? (
                      posts.map((post) => (
                        <PostCardOne
                          key={post.id}
                          id={post.id}
                          title={post.title ?? "Untitled"}
                          imageUrl={post.imageUrl || "/default-image.webp"}
                          category={post.category || "Uncategorized"}
                          description={post.description || "Post description"}
                        />

                ))
              ) : (
                <div className="text-center text-sm text-muted-foreground mt-10">
                  No posts found
                </div>
              )}
                  </div>
                  
                
                </div>
              </div>
          
              <div className="col-span-6">
               <div className="grid gap-4 md:grid-cols-2 grid-flow-dense h-full">
                <div className="">
                    {posts.length ? (
                    posts.map((post) => (
                      <PostCardBlog
                        key={post.id}
                        id={post.id}
                        title={post.title ?? "Untitled"}
                        imageUrl={post.imageUrl || "/default-image.webp"}
                        category={post.category || "Uncategorized"}
                        description={post.description || "Post description"}
                      />

                    ))
                  ) : (
                    <div className="text-center text-sm text-muted-foreground mt-10">
                      No posts found
                    </div>
                  )}
                </div>
                <div>
                    {posts.length ? (
                    posts.map((post) => (
                      <PostCardBlog
                        key={post.id}
                        id={post.id}
                        title={post.title ?? "Untitled"}
                        imageUrl={post.imageUrl || "/default-image.webp"}
                        category={post.category || "Uncategorized"}
                        description={post.description || "Post description"}
                      />

                    ))
                  ) : (
                    <div className="text-center text-sm text-muted-foreground mt-10">
                      No posts found
                    </div>
                  )}
                </div>
                  
               </div>
              </div>
              <div className="col-span-3">
              <div className="grid gap-4">
                  <div>
                  {posts.length ? (
                      posts.map((post) => (
                        <PostCardOne
                          key={post.id}
                          id={post.id}
                          title={post.title ?? "Untitled"}
                          imageUrl={post.imageUrl || "/default-image.webp"}
                          category={post.category || "Uncategorized"}
                          description={post.description || "Post description"}
                        />

                ))
              ) : (
                <div className="text-center text-sm text-muted-foreground mt-10">
                  No posts found
                </div>
              )}
                  </div>
                  <div>
                  {posts.length ? (
                      posts.map((post) => (
                        <PostCardOne
                          key={post.id}
                          id={post.id}
                          title={post.title ?? "Untitled"}
                          imageUrl={post.imageUrl || "/default-image.webp"}
                          category={post.category || "Uncategorized"}
                          description={post.description || "Post description"}
                        />

                ))
              ) : (
                <div className="text-center text-sm text-muted-foreground mt-10">
                  No posts found
                </div>
              )}
                  </div>
                  
                
                </div>
              </div>

            </div>
            <Separator className="bg-neutral-500 my-8"/>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {posts.length ? (
                posts.map((post) => (
                  <PostCardBlog
                    key={post.id}
                    id={post.id}
                    title={post.title ?? "Untitled"}
                    imageUrl={post.imageUrl || "/default-image.webp"}
                    category={post.category || "Uncategorized"}
                    description={post.description || "Post description"}
                  />

                ))
              ) : (
                <div className="text-center text-sm text-muted-foreground mt-10">
                  No posts found
                </div>
              )}
            </div>
          </div>
        </>
      );
    } catch (error) {
      console.error("Error loading posts:", error);
      return <div>Error loading posts. Please try again later.</div>;
    }
  };
  
  export default PostsPage;