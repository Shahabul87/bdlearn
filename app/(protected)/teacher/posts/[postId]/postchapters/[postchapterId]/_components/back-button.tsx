"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant="ghost"
      className="text-gray-300 hover:text-white"
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Back to post
    </Button>
  );
}; 