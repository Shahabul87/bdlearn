"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, DollarSign } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format";

interface PriceFormProps {
  initialData: {
    price: number | null;
  };
  courseId: string;
}

const formSchema = z.object({
  price: z.coerce.number().min(0, {
    message: "Price must be greater than or equal to 0",
  }),
});

export const PriceForm = ({
  initialData,
  courseId,
}: PriceFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData.price || 0,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Submitting price:", values);
      
      const response = await axios.patch(`/api/courses/${courseId}`, values);
      console.log("Price update response:", response.data);
      
      toast.success("Price updated");
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.error("Price update error:", error);
      toast.error("Something went wrong");
    }
  }

  return (
    <div className={cn(
      "p-4 mt-6 rounded-xl",
      "border border-gray-200 dark:border-gray-700/50",
      "bg-white/50 dark:bg-gray-800/50",
      "hover:bg-gray-50 dark:hover:bg-gray-800/70",
      "backdrop-blur-sm",
      "transition-all duration-200"
    )}>
      <div className="font-medium flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <div className="p-2 w-fit rounded-md bg-emerald-50 dark:bg-emerald-500/10">
              <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-base sm:text-lg font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Course Price
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Set a competitive price for your course
              </p>
            </div>
          </div>
          {!isEditing && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mt-2"
            >
              <p className={cn(
                "text-xl sm:text-2xl font-bold",
                initialData.price === 0 
                  ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md"
                  : "text-gray-900 dark:text-gray-100"
              )}>
                {formatPrice(initialData.price || 0)}
              </p>
              {initialData.price === 0 && (
                <span className={cn(
                  "text-xs font-medium px-2 py-0.5 rounded-full",
                  "text-emerald-600 dark:text-emerald-400",
                  "bg-emerald-50 dark:bg-emerald-500/10"
                )}>
                  Free
                </span>
              )}
            </motion.div>
          )}
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant="ghost"
          size="sm"
          className={cn(
            "text-emerald-700 dark:text-emerald-300",
            "hover:text-emerald-800 dark:hover:text-emerald-200",
            "hover:bg-emerald-50 dark:hover:bg-emerald-500/10",
            "w-full sm:w-auto",
            "justify-center"
          )}
        >
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Adjust
            </>
          )}
        </Button>
      </div>
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-4"
              >
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="h-4 w-4 absolute left-3 top-3 text-gray-500 dark:text-gray-400" />
                          <Input
                            {...field}
                            type="number"
                            step="0.01"
                            disabled={isSubmitting}
                            placeholder="Set your price"
                            className={cn(
                              "bg-white dark:bg-gray-900/50",
                              "border-gray-200 dark:border-gray-700/50",
                              "text-gray-900 dark:text-gray-200",
                              "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                              "focus:ring-emerald-500/20",
                              "pl-9",
                              "text-base sm:text-lg font-medium",
                              "transition-all duration-200"
                            )}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-rose-500 dark:text-rose-400 text-sm" />
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-x-2">
                  <Button
                    disabled={!isValid || isSubmitting}
                    type="submit"
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "bg-emerald-50 dark:bg-emerald-500/10",
                      "text-emerald-700 dark:text-emerald-300",
                      "hover:bg-emerald-100 dark:hover:bg-emerald-500/20",
                      "hover:text-emerald-800 dark:hover:text-emerald-200",
                      "w-full sm:w-auto",
                      "justify-center",
                      "transition-all duration-200"
                    )}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-x-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-600 dark:border-emerald-400 border-t-transparent" />
                        <span>Saving...</span>
                      </div>
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}