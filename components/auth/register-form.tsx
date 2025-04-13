"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { RegisterSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,  
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { register } from "@/actions/register";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    
    startTransition(() => {
      register(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        });
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <div className="inline-block p-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-cyan-500">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
          <span className="block mb-2">একাউন্ট তৈরি করুন</span>
          <span className="block text-2xl font-medium">Create Account</span>
        </h2>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="p-10">
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-base font-medium mb-1 block">
                        <span className="block text-gray-800 dark:text-gray-200">নাম (Name)</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="John Doe"
                            className="w-full h-12 pl-4 pr-10 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 
                              rounded-lg text-gray-900 dark:text-gray-100
                              focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500
                              transition-all duration-200"
                          />
                          <div className="absolute right-3 top-3 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm mt-1" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-base font-medium mb-1 block">
                        <span className="block text-gray-800 dark:text-gray-200">ইমেইল (Email)</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="name@example.com"
                            type="email"
                            className="w-full h-12 pl-4 pr-10 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 
                              rounded-lg text-gray-900 dark:text-gray-100
                              focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500
                              transition-all duration-200"
                          />
                          <div className="absolute right-3 top-3 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </svg>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm mt-1" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-base font-medium mb-1 block">
                        <span className="block text-gray-800 dark:text-gray-200">পাসওয়ার্ড (Password)</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="••••••••"
                            type="password"
                            className="w-full h-12 pl-4 pr-10 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 
                              rounded-lg text-gray-900 dark:text-gray-100
                              focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500
                              transition-all duration-200"
                          />
                          <div className="absolute right-3 top-3 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm mt-1" />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormError message={error} />
              <FormSuccess message={success} />
              
              <Button
                disabled={isPending}
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 
                  text-white rounded-lg font-medium
                  transition-all duration-300 transform hover:translate-y-[-2px] shadow-md"
              >
                <div className="flex items-center justify-center gap-2">
                  {isPending ? (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="8.5" cy="7" r="4"></circle>
                      <line x1="20" y1="8" x2="20" y2="14"></line>
                      <line x1="23" y1="11" x2="17" y2="11"></line>
                    </svg>
                  )}
                  <span className="text-base">
                    {isPending ? "অ্যাকাউন্ট তৈরি করা হচ্ছে... (Creating account...)" : "অ্যাকাউন্ট তৈরি করুন (Create Account)"}
                  </span>
                </div>
              </Button>
            </form>
          </Form>
        </div>
        
        <div className="px-10 py-5 bg-gray-50 dark:bg-gray-900/30 border-t border-gray-100 dark:border-gray-800 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="block">ইতিমধ্যে একটি অ্যাকাউন্ট আছে?</span>
            <span className="block text-xs">Already have an account?</span>
          </p>
          <Link 
            href="/auth/login" 
            className="mt-2 inline-block text-sm font-medium text-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            <span className="block">সাইন ইন করুন</span>
            <span className="block text-xs">Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};