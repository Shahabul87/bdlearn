import { CreateNewBlogPage } from "./create-blog";
import { cn } from "@/lib/utils";

const BlogCreationPage = () => {
  return (
    <div className={cn(
      "rounded-xl p-6",
      "bg-white/50 dark:bg-gray-800/50",
      "border border-gray-200 dark:border-gray-700",
      "backdrop-blur-sm"
    )}>
      <CreateNewBlogPage />
    </div>
  );
};

export default BlogCreationPage;