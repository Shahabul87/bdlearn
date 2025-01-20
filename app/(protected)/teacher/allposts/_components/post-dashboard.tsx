import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { PostDataTableWrapper } from "./post-data-table-wrapper";
import { cn } from "@/lib/utils";

export const PostDashboard = async () => {
  const user = await currentUser();

  if(!user?.id){
    return redirect("/");
  }

  const posts = await db.post.findMany({
    where: {
      userId: user.id
    },
    include: {
      user: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Get unique categories from posts
  const categories = Array.from(new Set(posts.map(post => post.category))).filter((category): category is string => category !== null);

  return (
    <div className={cn(
      "p-4 md:p-6 lg:p-8",
      "mt-16 sm:mt-20",
      "max-w-[2000px]",
      "mx-auto"
    )}>
      <PostDataTableWrapper 
        posts={posts}
        categories={categories}
      />
    </div>
  );
};
