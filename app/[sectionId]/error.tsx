"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error() {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <AlertTriangle className="h-10 w-10 text-yellow-500" />
      <h2 className="text-xl font-medium">Something went wrong</h2>
      <Button
        onClick={() => window.location.reload()}
        variant="outline"
      >
        Try again
      </Button>
    </div>
  );
} 