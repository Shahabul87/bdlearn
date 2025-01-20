"use client";

import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      })
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="flex flex-col items-center justify-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Verifying Your Email
        </h2>
        <p className="mt-4 text-lg text-gray-400 font-medium">
          Please wait while we confirm your email address
        </p>
      </div>

      <div className="max-w-md mx-auto bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50">
        <div className="flex flex-col items-center justify-center space-y-6">
          {!success && !error && (
            <div className="p-4">
              <BeatLoader color="#22D3EE" />
            </div>
          )}
          <FormSuccess message={success} />
          {!success && (
            <FormError message={error} />
          )}
          <Link 
            href="/auth/login"
            className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}