import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const isAdmin = async () => {
  const user = await currentUser();
  return user?.role === UserRole.ADMIN;
}; 