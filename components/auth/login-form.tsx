"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

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
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="flex flex-col items-center justify-center mb-12">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Welcome Back
        </h2>
        <p className="mt-4 text-lg text-gray-400 font-medium">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            Sign Up
          </Link>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Left side - Credentials login */}
        <div className="space-y-8 md:border-r border-gray-800 md:pr-12">
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
              {showTwoFactor ? (
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Two Factor Code</FormLabel>
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
                  <div className="space-y-6 w-full min-w-[320px]">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="text-gray-700 dark:text-gray-300 text-lg">Email</FormLabel>
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
                          <FormLabel className="text-gray-700 dark:text-gray-300 text-lg">Password</FormLabel>
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
                  Forgot password?
                </Link>
              </div>
              <Button
                disabled={isPending}
                type="submit"
                className="w-full h-14 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 
                  hover:to-purple-400 text-white rounded-xl text-lg font-medium tracking-wide 
                  transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                {isPending ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>
        </div>

        {/* Right side - OAuth */}
        <div className="flex flex-col gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white dark:bg-gray-900 px-2 text-gray-600 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              size="lg"
              variant="outline"
              role="button"
              onClick={() => signIn("google", { callbackUrl: DEFAULT_LOGIN_REDIRECT })}
              className="w-full border-2 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <FcGoogle className="h-5 w-5 mr-2" />
              <span className="text-gray-900 dark:text-gray-100">Sign in with Google</span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              role="button"
              onClick={() => signIn("github", { callbackUrl: DEFAULT_LOGIN_REDIRECT })}
              className="w-full border-2 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <FaGithub className="h-5 w-5 mr-2 text-gray-900 dark:text-white" />
              <span className="text-gray-900 dark:text-gray-100">Sign in with GitHub</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};