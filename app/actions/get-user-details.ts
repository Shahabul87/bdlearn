"use server";

import { db } from "@/lib/db";

export async function getUserDetails(userId: string) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      include: { profileLinks: true },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
} 