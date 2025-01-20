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
  Hash, 
  BookOpen, 
  Globe,
  ExternalLink 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  blogs: Array<{
    id: string;
    title: string;
    platform: string;
    url: string;
    category: string | null;
    createdAt: Date;
  }>
}

const MyFavoriteBlogCard = ({ blogs }: BlogCardProps) => {
  // Function to determine the appropriate icon based on platform
  const getPlatformIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('medium')) return <FileText className="w-4 h-4" />;
    if (p.includes('hashnode')) return <Hash className="w-4 h-4" />;
    if (p.includes('devto')) return <BookOpen className="w-4 h-4" />;
    return <Globe className="w-4 h-4" />;
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
          {blogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getPlatformIcon(blog.platform)}
                  <span>{blog.platform}</span>
                </div>
              </TableCell>
              <TableCell className="font-medium max-w-[500px] truncate">
                {blog.title}
              </TableCell>
              <TableCell>
                {blog.category && (
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs",
                    "bg-emerald-100 dark:bg-emerald-900",
                    "text-emerald-700 dark:text-emerald-300"
                  )}>
                    {blog.category}
                  </span>
                )}
              </TableCell>
              <TableCell>
                {new Date(blog.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <button
                  onClick={() => window.open(getValidUrl(blog.url), '_blank', 'noopener,noreferrer')}
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

export default MyFavoriteBlogCard;
