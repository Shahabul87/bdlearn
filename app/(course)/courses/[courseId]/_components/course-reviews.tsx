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
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50 p-6 shadow-xl rounded-2xl backdrop-blur-sm">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text mb-6">
          Course Reviews
        </h2>

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
                    selectedRating >= rating ? "text-yellow-400" : "text-gray-500"
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
                      className="bg-gray-800/50 border-gray-700 focus:border-gray-600 text-gray-100 resize-none h-32"
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
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Submit Review"
              )}
            </Button>
          </form>
        </Form>

        {/* Reviews List */}
        <div className="mt-8 space-y-4">
          <AnimatePresence>
            {reviews.map((review: any, index: number) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-gray-700">
                      <User className="w-4 h-4 text-gray-300" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-200">{review.user.name}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-4 h-4",
                              i < review.rating ? "text-yellow-400 fill-current" : "text-gray-500"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-3 text-gray-300">{review.comment}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}; 