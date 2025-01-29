"use server";

import { currentRole } from "@/lib/auth";
import { PrismaClient, Prisma } from "@prisma/client";

const UserRole = {
  ADMIN: 'ADMIN',
  USER: 'USER'
} as const;

type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const admin = async () => {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return { success: "Allowed Server Action!" };
  }

  return { error: "Forbidden Server Action!" }
};