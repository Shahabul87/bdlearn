"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: any) => Promise<void>;
  form: any;
  title?: string;
  isSubmitting: boolean;
  isValid: boolean;
  children: React.ReactNode;
}

export const ReplyModal = ({
  isOpen,
  onClose,
  onSubmit,
  form,
  title = "Reply to Comment",
  isSubmitting,
  isValid,
  children
}: ReplyModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn(
        "sm:max-w-[600px] p-0",
        "bg-white dark:bg-gray-900",
        "border border-gray-200 dark:border-gray-700",
        "shadow-xl"
      )}>
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {children}
              <div className="flex justify-end gap-3 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className={cn(
                    "h-9 px-4 font-medium",
                    "bg-white dark:bg-gray-800/50",
                    "border-gray-300 dark:border-gray-700",
                    "text-gray-800 dark:text-gray-200",
                    "hover:bg-gray-50 dark:hover:bg-gray-700/50",
                    "hover:text-gray-900 dark:hover:text-white",
                    "hover:border-gray-400 dark:hover:border-gray-600",
                    "transition-all duration-300",
                    "shadow-sm hover:shadow-md",
                    "active:scale-95"
                  )}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className={cn(
                    "h-9 px-6 font-medium",
                    "bg-gradient-to-r from-blue-600 to-indigo-600",
                    "dark:from-blue-500 dark:to-indigo-500",
                    "text-white",
                    "hover:from-blue-700 hover:to-indigo-700",
                    "dark:hover:from-blue-600 dark:hover:to-indigo-600",
                    "disabled:from-gray-300 disabled:to-gray-400",
                    "disabled:dark:from-gray-700 disabled:dark:to-gray-800",
                    "disabled:text-gray-500 dark:disabled:text-gray-400",
                    "disabled:cursor-not-allowed disabled:opacity-70",
                    "transition-all duration-300",
                    "shadow-md hover:shadow-lg",
                    "shadow-blue-500/20 hover:shadow-blue-500/30",
                    "dark:shadow-blue-500/10 dark:hover:shadow-blue-500/20",
                    "active:scale-95"
                  )}
                >
                  <span className="inline-flex items-center gap-2">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Posting...
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-4 h-4" />
                        Reply
                      </>
                    )}
                  </span>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 