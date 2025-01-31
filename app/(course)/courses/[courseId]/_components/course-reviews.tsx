"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Star, MessageSquare, User, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ReviewCard } from "./review-card";

const formSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, {
    message: "Review comment must be at least 10 characters.",
  }),
});

interface CourseReviewsProps {
  courseId: string;
  initialReviews?: any[];
}

export const CourseReviews = ({ courseId, initialReviews = [] }: CourseReviewsProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviews, setReviews] = useState(initialReviews);
  const [selectedRating, setSelectedRating] = useState(0);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      const response = await axios.post(`/api/courses/${courseId}/reviews`, values);
      
      setReviews([response.data, ...reviews]);
      form.reset();
      setSelectedRating(0);
      toast.success("Review submitted successfully!");
      router.refresh();
    } catch (error: any) {
      toast.error(error.response?.data || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl lg:max-w-5xl mx-auto">
      <div className="bg-white/50 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-xl rounded-2xl backdrop-blur-sm">
        {/* Course Stats */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-gray-100 dark:to-gray-300 text-transparent bg-clip-text">
            Course Reviews
          </h2>
          <div className="mt-2 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 dark:text-yellow-400 fill-current" />
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {reviews.length > 0 
                  ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
                  : "No ratings yet"
                }
              </span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
            </span>
          </div>
        </div>

         {/* Reviews List */}
         <div className="mt-8 space-y-4 mb-6">
          <AnimatePresence>
            {reviews.map((review, index) => (
              <ReviewCard 
                key={review.id} 
                review={review} 
                index={index}
              />
            ))}
          </AnimatePresence>
          
          {reviews.length === 0 && (
            <div className="text-center py-6">
              <p className="text-gray-500 dark:text-gray-400">
                No reviews yet. Be the first to review this course!
              </p>
            </div>
          )}
        </div>

        {/* Review Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((rating) => (
                <motion.button
                  key={rating}
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setSelectedRating(rating);
                    form.setValue("rating", rating);
                  }}
                  className={cn(
                    "p-1 rounded-full transition-colors",
                    selectedRating >= rating ? "text-amber-500 dark:text-yellow-400" : "text-gray-300 dark:text-gray-500"
                  )}
                >
                  <Star className="w-8 h-8" fill={selectedRating >= rating ? "currentColor" : "none"} />
                </motion.button>
              ))}
            </div>

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Share your thoughts about this course..."
                      className="bg-gray-50/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:border-gray-300 dark:focus:border-gray-600 text-gray-900 dark:text-gray-100 resize-none h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Submit Review"
              )}
            </Button>
          </form>
        </Form>

       
      </div>
    </div>
  );
}; 