"use client";

import { motion } from "framer-motion";
import { Star, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  review: {
    id: string;
    rating: number;
    comment: string;
    createdAt: Date;
    user: {
      name: string | null;
      image: string | null;
    };
  };
  index: number;
}

export const ReviewCard = ({ review, index }: ReviewCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.1 }}
      className="p-4 bg-gray-50/80 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {review.user.image ? (
            <img 
              src={review.user.image} 
              alt={review.user.name || "User"}
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
            />
          ) : (
            <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700">
              <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </div>
          )}
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-200">
              {review.user.name || "Anonymous User"}
            </p>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-4 h-4",
                    i < review.rating 
                      ? "text-amber-500 dark:text-yellow-400 fill-current" 
                      : "text-gray-300 dark:text-gray-500"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(review.createdAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </span>
      </div>
      <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
        {review.comment}
      </p>
    </motion.div>
  );
}; 