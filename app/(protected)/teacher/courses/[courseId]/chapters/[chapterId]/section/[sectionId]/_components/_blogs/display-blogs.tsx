"use client";

import { useRouter } from "next/navigation";
import { Edit, Trash, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistance } from "date-fns";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  description: string | null;
  url: string;
  category: string | null;
  position: number | null;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  sectionId: string | null;
  userId: string;
  author: string | null;
  publishedAt: Date | null;
  rating?: number | null;
}

interface DisplayBlogsProps {
  items: Blog[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const RatingStars = ({ rating }: { rating: number | null | undefined }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "h-3.5 w-3.5",
            star <= (rating || 0) 
              ? "text-yellow-500 dark:text-yellow-400 fill-yellow-500 dark:fill-yellow-400" 
              : "text-gray-400 dark:text-gray-600"
          )}
        />
      ))}
      <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
        {rating || 0}/5
      </span>
    </div>
  );
};

export const DisplayBlogs = ({
  items,
  onEdit,
  onDelete
}: DisplayBlogsProps) => {
  const router = useRouter();

  const handleBlogClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="mt-6 space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="group p-4 border rounded-lg bg-gray-50 dark:bg-gray-900 hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 
                  onClick={() => handleBlogClick(item.url)}
                  className={cn(
                    "text-lg font-semibold",
                    "text-gray-900 dark:text-white",
                    "hover:text-blue-600 dark:hover:text-blue-400",
                    "cursor-pointer",
                    "flex items-center gap-2",
                    "transition-colors"
                  )}
                >
                  {item.title}
                  <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <RatingStars rating={item.rating} />
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {item.description}
              </p>
              <div className="mt-2 text-xs text-gray-400">
                {formatDistance(new Date(item.createdAt), new Date(), { addSuffix: true })}
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                onClick={() => onEdit(item.id)}
                variant="ghost"
                size="sm"
              >
                <Edit className="h-4 w-4 text-blue-500" />
              </Button>
              <Button
                onClick={() => onDelete(item.id)}
                variant="ghost"
                size="sm"
              >
                <Trash className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 