"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface BillFilterDialogProps {
  open: boolean;
  onClose: () => void;
}

export const BillFilterDialog = ({ open, onClose }: BillFilterDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={cn(
        "max-w-md w-[95%] sm:w-full mx-auto",
        "p-4 sm:p-6",
        "bg-white/95 dark:bg-gray-900/95",
        "border border-gray-200 dark:border-gray-800"
      )}>
        <button
          onClick={onClose}
          className={cn(
            "absolute right-3 sm:right-4 top-3 sm:top-4 rounded-sm opacity-70 transition-opacity",
            "hover:opacity-100 focus:outline-none",
            "focus:ring-2 focus:ring-purple-400",
            "focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900",
            "disabled:pointer-events-none",
            "data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-gray-800"
          )}
        >
          <X className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
            Filter Bills
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 py-4">
          <div className="space-y-2">
            <Label className="text-sm text-gray-700 dark:text-gray-200">Status</Label>
            <Select>
              <SelectTrigger className={cn(
                "h-9 sm:h-10 text-sm",
                "bg-white/50 dark:bg-gray-800",
                "border-gray-200 dark:border-gray-700",
                "text-gray-900 dark:text-gray-200"
              )}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="PAID">Paid</SelectItem>
                <SelectItem value="UNPAID">Unpaid</SelectItem>
                <SelectItem value="OVERDUE">Overdue</SelectItem>
                <SelectItem value="UPCOMING">Upcoming</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-gray-700 dark:text-gray-200">Category</Label>
            <Select>
              <SelectTrigger className={cn(
                "h-9 sm:h-10 text-sm",
                "bg-white/50 dark:bg-gray-800",
                "border-gray-200 dark:border-gray-700",
                "text-gray-900 dark:text-gray-200"
              )}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="UTILITY">Utility</SelectItem>
                <SelectItem value="INTERNET">Internet</SelectItem>
                <SelectItem value="INSURANCE">Insurance</SelectItem>
                <SelectItem value="RENT">Rent</SelectItem>
                <SelectItem value="MORTGAGE">Mortgage</SelectItem>
                <SelectItem value="SUBSCRIPTION">Subscription</SelectItem>
                <SelectItem value="TAX">Tax</SelectItem>
                <SelectItem value="CREDIT_CARD">Credit Card</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-gray-700 dark:text-gray-200">Auto-pay</Label>
            <Select>
              <SelectTrigger className={cn(
                "h-9 sm:h-10 text-sm",
                "bg-white/50 dark:bg-gray-800",
                "border-gray-200 dark:border-gray-700",
                "text-gray-900 dark:text-gray-200"
              )}>
                <SelectValue placeholder="Select auto-pay status" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="enabled">Enabled</SelectItem>
                <SelectItem value="disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className={cn(
                "w-full sm:w-auto h-9 sm:h-10",
                "border-gray-200 dark:border-gray-600",
                "bg-white/50 dark:bg-gray-800/50",
                "text-gray-700 dark:text-gray-200",
                "hover:bg-gray-100 dark:hover:bg-gray-700",
                "hover:text-purple-600 dark:hover:text-purple-400"
              )}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "w-full sm:w-auto h-9 sm:h-10",
                "border-purple-500/50",
                "bg-purple-50/50 dark:bg-purple-500/5",
                "text-purple-600 dark:text-purple-300",
                "hover:bg-purple-100 dark:hover:bg-purple-500/10"
              )}
            >
              Reset Filters
            </Button>
            <Button
              size="sm"
              onClick={onClose}
              className="w-full sm:w-auto h-9 sm:h-10 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 