"use client";

import { useSession } from "next-auth/react";

export const useAdmin = () => {
  const { data: session } = useSession();
  
  return session?.user?.role === "ADMIN";
}; 