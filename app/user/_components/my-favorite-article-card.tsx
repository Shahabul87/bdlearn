"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  FileText, 
  Newspaper, 
  BookOpen, 
  Library,
  ExternalLink 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  articles: Array<{
    id: string;
    title: string;
    platform: string;
    url: string;
    category: string | null;
    createdAt: Date;
  }>
}

const MyFavoriteArticleCard = ({ articles }: ArticleCardProps) => {
  // Function to determine the appropriate icon based on platform
  const getPlatformIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('substack')) return <FileText className="w-4 h-4" />;
    if (p.includes('magazine')) return <Newspaper className="w-4 h-4" />;
    if (p.includes('journal')) return <BookOpen className="w-4 h-4" />;
    return <Library className="w-4 h-4" />;
  };

  // Ensure URL has protocol
  const getValidUrl = (url: string) => {
    try {
      new URL(url);
      return url;
    } catch {
      return `https://${url}`;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Platform</TableHead>
            <TableHead className="max-w-[500px]">Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="w-[50px]">Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article) => (
            <TableRow key={article.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getPlatformIcon(article.platform)}
                  <span>{article.platform}</span>
                </div>
              </TableCell>
              <TableCell className="font-medium max-w-[500px] truncate">
                {article.title}
              </TableCell>
              <TableCell>
                {article.category && (
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs",
                    "bg-blue-100 dark:bg-blue-900",
                    "text-blue-700 dark:text-blue-300"
                  )}>
                    {article.category}
                  </span>
                )}
              </TableCell>
              <TableCell>
                {new Date(article.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <button
                  onClick={() => window.open(getValidUrl(article.url), '_blank', 'noopener,noreferrer')}
                  className={cn(
                    "p-2 rounded-full transition-colors",
                    "hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyFavoriteArticleCard;
