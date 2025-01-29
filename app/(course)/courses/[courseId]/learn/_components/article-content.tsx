"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Editor } from "@/components/editor";

interface ArticleContentProps {
  articleId: string;
}

export const ArticleContent = ({ articleId }: ArticleContentProps) => {
  const [article, setArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/articles/${articleId}`);
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">Article content not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-4">{article.title}</h1>
      <div className="prose prose-invert max-w-none">
        <Editor 
          value={article.content}
          disabled={true}
          onChange={() => {}}
        />
      </div>
    </div>
  );
}; 