"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Editor } from "@/components/editor";

interface BlogContentProps {
  blogId: string;
}

export const BlogContent = ({ blogId }: BlogContentProps) => {
  const [blog, setBlog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${blogId}`);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">Blog content not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-4">{blog.title}</h1>
      <div className="prose prose-invert max-w-none">
        <Editor 
          initialContent={blog.content}
          editable={false}
        />
      </div>
    </div>
  );
}; 