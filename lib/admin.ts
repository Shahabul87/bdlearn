import { currentUser } from "@/lib/auth";

export const isAdmin = async () => {
  const user = await currentUser();
  
  return user?.role === "ADMIN";
}; 