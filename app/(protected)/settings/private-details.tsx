"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import {SidebarDemo } from "@/components/ui/sidebar-demo";

import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SettingsSchema } from "@/schemas";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { settings } from "@/actions/settings";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { UserRole } from "@prisma/client";
import { Settings } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";



export const PrivateDetailsSettingsPage = () => {
  const user:any = useCurrentUser();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      name: user?.name || undefined,
      email: user?.email || undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    }
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  }

  return (
    <SidebarDemo>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "rounded-2xl shadow-xl",
            "bg-white dark:bg-gray-900",
            "border border-gray-200 dark:border-gray-700"
          )}
        >
          {/* Header Section */}
          <div className={cn(
            "px-6 py-8 sm:px-8",
            "border-b border-gray-200 dark:border-gray-700"
          )}>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Settings className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
                <p className="text-gray-500 dark:text-gray-400">Manage your account preferences</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-6 sm:p-8">
            <Form {...form}>
              <form className="space-y-8 max-w-3xl mx-auto" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-8 md:grid-cols-2">
                  {/* Basic Info Section */}
                  <div className="space-y-6">
                    <div className={cn(
                      "p-6 rounded-xl",
                      "bg-gray-50 dark:bg-gray-800/50"
                    )}>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h3>
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 dark:text-gray-300">Name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="John Doe"
                                  disabled={isPending}
                                  className={cn(
                                    "bg-white dark:bg-gray-900/50",
                                    "border-gray-200 dark:border-gray-700",
                                    "text-gray-900 dark:text-white",
                                    "placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                  )}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {user?.isOAuth === false && (
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 dark:text-gray-300">Email</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="john.doe@example.com"
                                    type="email"
                                    disabled={isPending}
                                    className={cn(
                                      "bg-white dark:bg-gray-900/50",
                                      "border-gray-200 dark:border-gray-700",
                                      "text-gray-900 dark:text-white",
                                      "placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                    )}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Security Section */}
                  <div className="space-y-6">
                    <div className={cn(
                      "p-6 rounded-xl",
                      "bg-gray-50 dark:bg-gray-800/50"
                    )}>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security</h3>
                      <div className="space-y-4">
                        {user?.isOAuth === false && (
                          <>
                            <FormField
                              control={form.control}
                              name="password"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-700 dark:text-gray-300">Current Password</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="••••••"
                                      type="password"
                                      disabled={isPending}
                                      className={cn(
                                        "bg-white dark:bg-gray-900/50",
                                        "border-gray-200 dark:border-gray-700",
                                        "text-gray-900 dark:text-white",
                                        "placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                      )}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="newPassword"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-700 dark:text-gray-300">New Password</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="••••••"
                                      type="password"
                                      disabled={isPending}
                                      className={cn(
                                        "bg-white dark:bg-gray-900/50",
                                        "border-gray-200 dark:border-gray-700",
                                        "text-gray-900 dark:text-white",
                                        "placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                      )}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Role & 2FA Section */}
                <div className={cn(
                  "p-6 rounded-xl",
                  "bg-gray-50 dark:bg-gray-800/50"
                )}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Preferences</h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 dark:text-gray-300">Account Role</FormLabel>
                          <Select
                            disabled={isPending}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className={cn(
                                "bg-white dark:bg-gray-900/50",
                                "border-gray-200 dark:border-gray-700",
                                "text-gray-900 dark:text-white"
                              )}>
                                <SelectValue placeholder="Select a role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                              {Object.values(UserRole).map((role) => (
                                <SelectItem 
                                  key={role} 
                                  value={role}
                                  className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                  {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {user?.isOAuth === false && (
                      <FormField
                        control={form.control}
                        name="isTwoFactorEnabled"
                        render={({ field }) => (
                          <FormItem className={cn(
                            "flex items-center justify-between p-4 rounded-lg",
                            "bg-white dark:bg-gray-900/50",
                            "border border-gray-200 dark:border-gray-700"
                          )}>
                            <div>
                              <FormLabel className="text-gray-700 dark:text-gray-300">Two Factor Authentication</FormLabel>
                              <FormDescription className="text-gray-500 dark:text-gray-400">
                                Add an extra layer of security to your account
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                disabled={isPending}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>

                {/* Error and Success Messages */}
                <div className="space-y-4">
                  <FormError message={error} />
                  <FormSuccess message={success} />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <Button
                    disabled={isPending}
                    type="submit"
                    className={cn(
                      "px-8",
                      "bg-purple-600 hover:bg-purple-700",
                      "dark:bg-purple-500 dark:hover:bg-purple-600",
                      "text-white"
                    )}
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
    </SidebarDemo>
  );
}
 
