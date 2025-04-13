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

// Helper function to safely check user roles using string comparison
// This avoids issues with different enum representations during build/deployment
export const hasRole = (userRole: any, roleToCheck: any): boolean => {
  if (!userRole) return false;
  
  // Convert both sides to strings to ensure compatibility
  const userRoleStr = String(userRole);
  const roleToCheckStr = typeof roleToCheck === 'object' ? String(roleToCheck) : String(roleToCheck);
  
  return userRoleStr === roleToCheckStr;
};