"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  try {
    await signOut({
      redirect: true,
      redirectTo: "/",
      callbackUrl: "/"
    });
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};