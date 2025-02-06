"use client";

import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";

export const useAdmin = () => {
  const { data: session } = useSession();
  return session?.user?.role === UserRole.ADMIN;
}; 