"use server";

import { db } from "@/lib/db";

export async function addCustomTab(data: { label: string; icon: string; userId: string }) {
  return await db.customTab.create({
    data: {
      label: data.label,
      icon: data.icon,
      userId: data.userId
    }
  });
}

export async function deleteCustomTab(tabId: string) {
  return await db.customTab.delete({
    where: { id: tabId }
  });
}

export async function getCustomTabs(userId: string) {
  return await db.customTab.findMany({
    where: { userId },
    orderBy: { id: 'asc' }
  });
} 