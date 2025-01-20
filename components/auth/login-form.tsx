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
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    
    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
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
          }
        })
        .catch(() => setError("Something went wrong"));
    });
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
              <div className="space-y-6 w-full min-w-[320px]">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-gray-300 text-lg">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="john.doe@example.com"
                          type="email"
                          className="w-full h-14 bg-transparent border-2 border-gray-700/50 rounded-xl text-gray-100 text-lg
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
                      <FormLabel className="text-gray-300 text-lg">Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="******"
                          type="password"
                          className="w-full h-14 bg-transparent border-2 border-gray-700/50 rounded-xl text-gray-100 text-lg
                            focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>
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
        <div className="flex flex-col justify-center space-y-8 md:pl-12">
          <p className="text-center text-gray-400 font-medium text-lg">or</p>
          <div className="space-y-6 w-full">
            <Button
              variant="outline"
              className="w-full h-14 bg-white hover:bg-gray-50 text-gray-600 rounded-xl
                flex items-center justify-center space-x-4 transition-all duration-300 
                border-2 border-gray-200 hover:border-gray-300"
              onClick={() => {}}
            >
              <FcGoogle className="w-6 h-6" />
              <span className="text-lg font-medium">Continue with Google</span>
            </Button>
            <Button
              variant="outline"
              className="w-full h-14 bg-[#24292F] hover:bg-[#2c3137] text-white rounded-xl
                flex items-center justify-center space-x-4 transition-all duration-300 
                border-none"
              onClick={() => {}}
            >
              <FaGithub className="w-6 h-6" />
              <span className="text-lg font-medium">Continue with GitHub</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};