"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { 
  Lock, Mail, Phone, Key, Shield, 
  Smartphone, AlertTriangle, Loader2 
} from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  currentPassword: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const PrivateSettingsPage = () => {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phone: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsUpdating(true);
      await axios.patch('/api/user/security', values);
      toast.success("Security settings updated successfully");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
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
            <Loader2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </motion.div>
        </div>
      )}

      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-gray-100/50 dark:bg-gray-900/50 rounded-full">
          <Lock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Private Details & Security
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage your private information and security settings
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          {...field}
                          type="email"
                          disabled={isSubmitting || isUpdating}
                          placeholder="Email Address"
                          className={cn(
                            "pl-10 bg-white/50 dark:bg-gray-900/50",
                            "border-gray-200 dark:border-gray-700",
                            "text-gray-900 dark:text-gray-200",
                            "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                            "focus:border-purple-500/50 transition-all"
                          )}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-rose-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          {...field}
                          disabled={isSubmitting || isUpdating}
                          placeholder="Phone Number"
                          className={cn(
                            "pl-10 bg-white/50 dark:bg-gray-900/50",
                            "border-gray-200 dark:border-gray-700",
                            "text-gray-900 dark:text-gray-200",
                            "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                            "focus:border-purple-500/50 transition-all"
                          )}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-rose-400" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Password Change */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200">Change Password</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          {...field}
                          type="password"
                          disabled={isSubmitting || isUpdating}
                          placeholder="Current Password"
                          className={cn(
                            "pl-10 bg-white/50 dark:bg-gray-900/50",
                            "border-gray-200 dark:border-gray-700",
                            "text-gray-900 dark:text-gray-200",
                            "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                            "focus:border-purple-500/50 transition-all"
                          )}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-rose-400" />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Shield className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            {...field}
                            type="password"
                            disabled={isSubmitting || isUpdating}
                            placeholder="New Password"
                            className={cn(
                              "pl-10 bg-white/50 dark:bg-gray-900/50",
                              "border-gray-200 dark:border-gray-700",
                              "text-gray-900 dark:text-gray-200",
                              "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                              "focus:border-purple-500/50 transition-all"
                            )}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 dark:text-rose-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Shield className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            {...field}
                            type="password"
                            disabled={isSubmitting || isUpdating}
                            placeholder="Confirm New Password"
                            className={cn(
                              "pl-10 bg-white/50 dark:bg-gray-900/50",
                              "border-gray-200 dark:border-gray-700",
                              "text-gray-900 dark:text-gray-200",
                              "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                              "focus:border-purple-500/50 transition-all"
                            )}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 dark:text-rose-400" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200">Additional Security</h3>
            <div className="space-y-6">
              <div className={cn(
                "flex items-center justify-between p-4 rounded-lg",
                "bg-white/50 dark:bg-gray-900/50",
                "border border-gray-200 dark:border-gray-700"
              )}>
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <div>
                    <p className="text-gray-900 dark:text-gray-200">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security</p>
                  </div>
                </div>
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={setTwoFactorEnabled}
                />
              </div>

              <div className={cn(
                "flex items-center justify-between p-4 rounded-lg",
                "bg-white/50 dark:bg-gray-900/50",
                "border border-gray-200 dark:border-gray-700"
              )}>
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <div>
                    <p className="text-gray-900 dark:text-gray-200">Login Alerts</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Get notified of new sign-ins</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              disabled={!isValid || isSubmitting || isUpdating}
              type="submit"
              className={cn(
                "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600",
                "text-white font-medium transition-colors",
                "disabled:bg-gray-200 dark:disabled:bg-gray-700",
                "disabled:text-gray-500 dark:disabled:text-gray-400"
              )}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PrivateSettingsPage;
 
