"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.enum(["UTILITY", "INTERNET", "INSURANCE", "RENT", "MORTGAGE", "SUBSCRIPTION", "TAX", "CREDIT_CARD", "OTHER"], {
    required_error: "Please select a category",
  }),
  amount: z.string().min(1, "Amount is required").refine((val) => !isNaN(parseFloat(val)), {
    message: "Amount must be a valid number",
  }),
  currency: z.string().default("USD"),
  startDate: z.string().min(1, "Start date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  provider: z.string().min(1, "Provider is required"),
  accountId: z.string().optional(),
  website: z.string().optional(),
  supportContact: z.string().optional(),
  notifyBefore: z.number().default(3),
  notifyEmail: z.boolean().default(true),
  notifySMS: z.boolean().default(false),
  autoPayEnabled: z.boolean().default(false),
  paymentMethod: z.string().optional(),
  accountNumber: z.string().optional(),
  notes: z.string().optional(),
});

interface NewBillDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const NewBillDialog = ({ open, onClose, onSuccess }: NewBillDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: undefined,
      amount: "",
      currency: "USD",
      startDate: "",
      dueDate: "",
      provider: "",
      accountId: "",
      website: "",
      supportContact: "",
      notifyBefore: 3,
      notifyEmail: true,
      notifySMS: false,
      autoPayEnabled: false,
      paymentMethod: "",
      accountNumber: "",
      notes: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formattedData = {
        ...values,
        amount: parseFloat(values.amount),
        startDate: new Date(`${values.startDate}T00:00:00Z`).toISOString(),
        dueDate: new Date(`${values.dueDate}T00:00:00Z`).toISOString(),
        status: "UNPAID",
      };

      await axios.post("/api/bills", formattedData);
      
      toast.success("Bill created successfully");
      onSuccess();
      onClose();
      form.reset();
    } catch (error) {
      console.error("Error creating bill:", error);
      toast.error("Failed to create bill");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={cn(
        "max-w-2xl w-full",
        "bg-white/95 dark:bg-gray-900/95",
        "border border-gray-200 dark:border-gray-800"
      )}>
        <button
          onClick={onClose}
          className={cn(
            "absolute right-4 top-4 rounded-sm opacity-70 transition-opacity",
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
          <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
            Add New Bill
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={cn(
                          "bg-white/50 dark:bg-gray-800",
                          "border-gray-200 dark:border-gray-700",
                          "text-gray-900 dark:text-gray-200"
                        )}
                        placeholder="e.g., Electricity Bill"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className={cn(
                          "bg-white/50 dark:bg-gray-800",
                          "border-gray-200 dark:border-gray-700",
                          "text-gray-900 dark:text-gray-200"
                        )}>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Amount and Dates */}
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">Amount</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        className={cn(
                          "bg-white/50 dark:bg-gray-800",
                          "border-gray-200 dark:border-gray-700",
                          "text-gray-900 dark:text-gray-200"
                        )}
                        placeholder="0.00"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">Start Date</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        className={cn(
                          "bg-white/50 dark:bg-gray-800",
                          "border-gray-200 dark:border-gray-700",
                          "text-gray-900 dark:text-gray-200"
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">Due Date</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        className={cn(
                          "bg-white/50 dark:bg-gray-800",
                          "border-gray-200 dark:border-gray-700",
                          "text-gray-900 dark:text-gray-200"
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Provider Details */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="provider"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">Provider</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={cn(
                          "bg-white/50 dark:bg-gray-800",
                          "border-gray-200 dark:border-gray-700",
                          "text-gray-900 dark:text-gray-200"
                        )}
                        placeholder="Service provider name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accountId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">Account ID</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={cn(
                          "bg-white/50 dark:bg-gray-800",
                          "border-gray-200 dark:border-gray-700",
                          "text-gray-900 dark:text-gray-200"
                        )}
                        placeholder="Your account number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Notifications */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="notifyEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">Notifications</FormLabel>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-gray-600 dark:text-gray-400">Email Notifications</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <FormLabel className="text-gray-600 dark:text-gray-400">SMS Notifications</FormLabel>
                <FormControl>
                  <Switch
                    checked={form.watch("notifySMS")}
                    onCheckedChange={(checked) => form.setValue("notifySMS", checked)}
                  />
                </FormControl>
              </div>
            </div>

            {/* Auto-pay */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="autoPayEnabled"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <div>
                        <FormLabel className="text-gray-700 dark:text-gray-200">Enable Auto-pay</FormLabel>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Automatically pay this bill when due</p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-200">Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className={cn(
                        "min-h-[100px]",
                        "bg-white/50 dark:bg-gray-800",
                        "border-gray-200 dark:border-gray-700",
                        "text-gray-900 dark:text-gray-200"
                      )}
                      placeholder="Add any additional notes..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className={cn(
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
                type="submit"
                disabled={isSubmitting}
                className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white"
              >
                {isSubmitting ? "Adding..." : "Add Bill"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}; 