"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";

export const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return null;
  }

  if (session?.user?.role !== UserRole.ADMIN) {
    redirect("/unauthorized");
  }

  return <>{children}</>;
};