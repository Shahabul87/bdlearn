"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Subscription } from "@prisma/client";
import { SubscriptionList } from "./subscription-link-list";
import { format } from "date-fns";
import { motion } from "framer-motion";

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

interface SubscriptionLinkFormProps {
  userId: string;
  subscriptions?: Subscription[];
}

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  platform: z.string().min(1, "Platform is required"),
  url: z.string().url("Enter a valid URL"),
  category: z.string().optional(),
  dateOfSubscription: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
  endOfSubscription: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
  cardUsed: z.string().min(1, "Card information is required"),
  amount: z.preprocess((value) => parseFloat(value as string), z.number().positive("Amount must be positive")),
});

export const SubscriptionLinkForm = ({
  userId,
  subscriptions = [],
}: SubscriptionLinkFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [subscriptionId, setEditingSubscriptionId] = useState<string | null>(null);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
    setEditMode(false);
    form.reset();
  };

  const cancelEditMode = () => {
    setEditMode(false);
    setEditingSubscriptionId(null);
    form.reset();
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      platform: "",
      url: "",
      category: "",
      dateOfSubscription: format(new Date(), "yyyy-MM-dd"),
      endOfSubscription: format(new Date(), "yyyy-MM-dd"),
      cardUsed: "",
      amount: 0,
    },
    mode: "onChange",
  });

  const { isSubmitting, isValid } = form.formState;
  const watchedValues = form.watch();
  const isFormComplete = Object.values(watchedValues).every((value) => value);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const transformedValues = {
      ...values,
      dateOfSubscription: new Date(values.dateOfSubscription),
      endOfSubscription: new Date(values.endOfSubscription),
    };
    try {
      await axios.post(`/api/users/${userId}/subscriptions`, transformedValues);
      toast.success("Subscription added");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onSave = async (values: z.infer<typeof formSchema>) => {
    if (!subscriptionId) return;

    const transformedValues = {
      ...values,
      dateOfSubscription: new Date(values.dateOfSubscription),
      endOfSubscription: new Date(values.endOfSubscription),
    };
    try {
      setIsUpdating(true);
      await axios.patch(`/api/users/${userId}/subscriptions/${subscriptionId}`, transformedValues);
      toast.success("Subscription updated");
      setEditMode(false);
      setEditingSubscriptionId(null);
      form.reset();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/users/${userId}/subscriptions/reorder`, { list: updateData });
      toast.success("Subscriptions reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    const subscriptionToEdit = subscriptions.find((sub) => sub.id === id);
    if (subscriptionToEdit) {
      setEditMode(true);
      setEditingSubscriptionId(id);
      form.setValue("name", subscriptionToEdit.name);
      form.setValue("platform", subscriptionToEdit.platform);
      form.setValue("url", subscriptionToEdit.url);
      form.setValue("category", subscriptionToEdit.category || "");
      form.setValue("dateOfSubscription", format(new Date(subscriptionToEdit.dateOfSubscription), "yyyy-MM-dd"));
      form.setValue("endOfSubscription", format(new Date(subscriptionToEdit.endOfSubscription), "yyyy-MM-dd"));
      form.setValue("cardUsed", subscriptionToEdit.cardUsed);
      form.setValue("amount", subscriptionToEdit.amount);
    }
  };

  const onDelete = async (subscriptionId: string) => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/users/${userId}/subscriptions/${subscriptionId}`);
      toast.success("Subscription deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn(
      "relative mt-6 rounded-xl p-6 backdrop-blur-sm",
      "bg-white/30 dark:bg-gray-800/50",
      "border border-gray-200/50 dark:border-gray-700/50"
    )}>
      {isUpdating && (
        <div className="absolute inset-0 bg-black/10 dark:bg-gray-900/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </motion.div>
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-200 dark:to-cyan-200 bg-clip-text text-transparent">
          Subscriptions
        </h3>
        <Button
          onClick={toggleCreating}
          variant="ghost"
          className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
        >
          {isCreating ? (
            "Cancel"
          ) : (
            <motion.div className="flex items-center gap-2" whileHover={{ x: 5 }}>
              <PlusCircle className="h-4 w-4" />
              Add subscription
            </motion.div>
          )}
        </Button>
      </div>

      {(isCreating || editMode) && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(editMode ? onSave : onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting || isUpdating}
                      placeholder="Subscription Name"
                      className={cn(
                        "bg-white/50 dark:bg-gray-900/50",
                        "border-gray-200 dark:border-gray-700",
                        "text-gray-900 dark:text-gray-200",
                        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        "focus:border-blue-500/50 transition-all"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-rose-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="platform"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting || isUpdating}
                      placeholder="Platform (e.g., YouTube)"
                      className={cn(
                        "bg-white/50 dark:bg-gray-900/50",
                        "border-gray-200 dark:border-gray-700",
                        "text-gray-900 dark:text-gray-200",
                        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        "focus:border-blue-500/50 transition-all"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-rose-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting || isUpdating}
                      placeholder="Subscription URL"
                      className={cn(
                        "bg-white/50 dark:bg-gray-900/50",
                        "border-gray-200 dark:border-gray-700",
                        "text-gray-900 dark:text-gray-200",
                        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        "focus:border-blue-500/50 transition-all"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-rose-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting || isUpdating}
                      placeholder="Category (optional)"
                      className={cn(
                        "bg-white/50 dark:bg-gray-900/50",
                        "border-gray-200 dark:border-gray-700",
                        "text-gray-900 dark:text-gray-200",
                        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        "focus:border-blue-500/50 transition-all"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-rose-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfSubscription"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting || isUpdating}
                      type="date"
                      className={cn(
                        "bg-white/50 dark:bg-gray-900/50",
                        "border-gray-200 dark:border-gray-700",
                        "text-gray-900 dark:text-gray-200",
                        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        "focus:border-blue-500/50 transition-all"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-rose-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endOfSubscription"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting || isUpdating}
                      type="date"
                      className={cn(
                        "bg-white/50 dark:bg-gray-900/50",
                        "border-gray-200 dark:border-gray-700",
                        "text-gray-900 dark:text-gray-200",
                        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        "focus:border-blue-500/50 transition-all"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-rose-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cardUsed"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting || isUpdating}
                      placeholder="Card Used (e.g., **** **** **** 1234)"
                      className={cn(
                        "bg-white/50 dark:bg-gray-900/50",
                        "border-gray-200 dark:border-gray-700",
                        "text-gray-900 dark:text-gray-200",
                        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        "focus:border-blue-500/50 transition-all"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-rose-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting || isUpdating}
                      type="number"
                      step="0.01"
                      placeholder="Subscription Amount"
                      className={cn(
                        "bg-white/50 dark:bg-gray-900/50",
                        "border-gray-200 dark:border-gray-700",
                        "text-gray-900 dark:text-gray-200",
                        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        "focus:border-blue-500/50 transition-all"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-rose-400" />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-2">
              <Button
                disabled={!isFormComplete || isSubmitting || isUpdating}
                type="submit"
                className={cn(
                  "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
                  "text-white font-medium transition-colors",
                  "disabled:bg-gray-200 dark:disabled:bg-gray-700",
                  "disabled:text-gray-500 dark:disabled:text-gray-400"
                )}
              >
                {editMode ? "Save Changes" : "Create Subscription"}
              </Button>
              {editMode && (
                <Button
                  variant="outline"
                  onClick={cancelEditMode}
                  disabled={isSubmitting || isUpdating}
                  className={cn(
                    "border-gray-200 dark:border-gray-700",
                    "text-gray-700 dark:text-gray-300",
                    "hover:text-gray-900 dark:hover:text-white",
                    "hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>
      )}

      {!isCreating && !editMode && (
        <>
          <div className={cn(
            "mt-4",
            subscriptions.length === 0 && "text-gray-500 dark:text-gray-400 italic"
          )}>
            {subscriptions.length === 0 && "No subscriptions"}
            {subscriptions.length > 0 && (
              <SubscriptionList
                onEdit={onEdit}
                onReorder={onReorder}
                onDelete={onDelete}
                items={subscriptions}
              />
            )}
          </div>
          {subscriptions.length > 0 && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 italic">
              Drag and drop to reorder your subscriptions
            </p>
          )}
        </>
      )}
    </div>
  );
};
