import { auth } from "@/auth";
import { UserRole } from "@prisma/client";

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user?.role;
};

// Helper function to safely check user roles
export const hasRole = (userRole: UserRole | undefined, role: UserRole): boolean => {
  if (!userRole) return false;
  return userRole === role;
};