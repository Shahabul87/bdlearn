"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { ResetSchema } from "@/schemas";
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
import { reset } from "@/actions/reset";

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values)
        .then((data) => {
          setError(data?.error);
          setSuccess(data?.success);
        });
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="flex flex-col items-center justify-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Forgot Password?
        </h2>
        <p className="mt-4 text-lg text-gray-400 font-medium">
          Enter your email to reset your password
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
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
            <FormError message={error} />
            <FormSuccess message={success} />
            <div className="space-y-4">
              <Button
                disabled={isPending}
                type="submit"
                className="w-full h-14 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 
                  hover:to-purple-400 text-white rounded-xl text-lg font-medium tracking-wide 
                  transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                Send reset email
              </Button>
              <Link 
                href="/auth/login"
                className="block text-center text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
              >
                Back to login
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};