"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { toast } from "react-hot-toast";

import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "Email already in use with different provider!"
    : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    try {
      setError("");
      setSuccess("");
      
      console.log("Submitting login form with values:", values);
      
      startTransition(() => {
        login(values, callbackUrl)
          .then((data) => {
            console.log("Login response:", data);
            if (data?.error) {
              form.reset();
              setError(data.error);
            }
            if (data?.success) {
              form.reset();
              setSuccess(data.success);
            }
            if (data?.twoFactor) {
              setShowTwoFactor(true);
              toast.success("Check your email for the 2FA code!");
            }
          })
          .catch((error) => {
            // Ignore NEXT_REDIRECT error as it's expected
            if (error?.message?.includes("NEXT_REDIRECT")) {
              return;
            }
            console.error("Login error:", error);
            setError("Something went wrong");
          });
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="flex flex-col items-center justify-center mb-12">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent text-center">
          <span className="block mb-2">পুনরায় স্বাগতম</span>
          <span className="block text-3xl">Welcome Back</span>
        </h2>
        <p className="mt-4 text-lg text-gray-400 font-medium text-center">
          <span className="block mb-1">একাউন্ট নেই?</span>
          <span className="block">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Sign Up
            </Link>
          </span>
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700/50 overflow-hidden">
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full"
          >
            {showTwoFactor ? (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">
                      <span className="block text-gray-700 dark:text-gray-300">দুই-ফ্যাক্টর কোড (Two Factor Code)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="123456"
                        type="text"
                        className="w-full h-14 bg-transparent border-2 border-gray-700/50 dark:border-gray-700/50 
                          rounded-xl text-gray-900 dark:text-gray-100 text-lg
                          focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 
                          transition-all duration-300
                          placeholder:text-gray-500 dark:placeholder:text-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <>
                <div className="space-y-6 w-full">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-lg">
                          <span className="block text-gray-700 dark:text-gray-300">ইমেইল (Email)</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="john.doe@example.com"
                            type="email"
                            className="w-full h-14 bg-transparent border-2 border-gray-700/50 dark:border-gray-700/50 
                              rounded-xl text-gray-900 dark:text-gray-100 text-lg
                              focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 
                              transition-all duration-300
                              placeholder:text-gray-500 dark:placeholder:text-gray-500"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-lg">
                          <span className="block text-gray-700 dark:text-gray-300">পাসওয়ার্ড (Password)</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="******"
                            type="password"
                            className="w-full h-14 bg-transparent border-2 border-gray-700/50 dark:border-gray-700/50 
                              rounded-xl text-gray-900 dark:text-gray-100 text-lg
                              focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 
                              transition-all duration-300
                              placeholder:text-gray-500 dark:placeholder:text-gray-500"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <div className="flex justify-end">
              <Link 
                href="/auth/reset"
                className="text-base text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <span className="block text-right">পাসওয়ার্ড ভুলে গেছেন? (Forgot password?)</span>
              </Link>
            </div>
            <Button
              disabled={isPending}
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 
                hover:to-purple-400 text-white rounded-xl text-lg font-medium tracking-wide 
                transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              {isPending ? "সাইন ইন করা হচ্ছে... (Signing in...)" : "সাইন ইন করুন (Sign In)"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};