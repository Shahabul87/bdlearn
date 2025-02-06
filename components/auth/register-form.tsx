"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

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
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="flex flex-col items-center justify-center mb-12">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
          Create Account
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 font-medium">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-cyan-500 hover:text-cyan-400 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors">
            Sign In
          </Link>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Left side - Registration form */}
        <div className="space-y-8 md:border-r border-gray-200 dark:border-gray-800 md:pr-12">
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
              <div className="space-y-6 w-full min-w-[320px]">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-gray-700 dark:text-gray-300 text-lg">Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="John Doe"
                          className="w-full h-14 bg-white dark:bg-transparent border-2 border-gray-200/50 dark:border-gray-700/50 rounded-xl text-gray-900 dark:text-gray-100 text-lg
                            focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
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
                          className="w-full h-14 bg-white dark:bg-transparent border-2 border-gray-200/50 dark:border-gray-700/50 rounded-xl text-gray-900 dark:text-gray-100 text-lg
                            focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
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
                          className="w-full h-14 bg-white dark:bg-transparent border-2 border-gray-200/50 dark:border-gray-700/50 rounded-xl text-gray-900 dark:text-gray-100 text-lg
                            focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button
                disabled={isPending}
                type="submit"
                className="w-full h-14 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 
                  hover:to-purple-400 text-white rounded-xl text-lg font-medium tracking-wide 
                  transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                {isPending ? "Creating account..." : "Create Account"}
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
              <span className="text-gray-900 dark:text-gray-100">Sign up with Google</span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              role="button"
              onClick={() => signIn("github", { callbackUrl: DEFAULT_LOGIN_REDIRECT })}
              className="w-full border-2 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <FaGithub className="h-5 w-5 mr-2 text-gray-900 dark:text-white" />
              <span className="text-gray-900 dark:text-gray-100">Sign up with GitHub</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};