"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import clsx from "clsx"; // Make sure to install clsx if not already installed

interface BackButtonProps {
  href: string;
  label: string;
  className?: string; // Optional className prop
};

export const BackButton = ({
  href,
  label,
  className, // Accept className as a prop
}: BackButtonProps) => {
  return (
    <Button
      variant="link"
      className={clsx("font-normal w-full", className)} // Merge with default classes
      size="sm"
      asChild
    >
      <Link href={href}>
        {label}
      </Link>
    </Button>
  );
};
