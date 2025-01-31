// ServerSettingsContent.tsx
import { db } from "@/lib/db";
import { currentUser } from '@/lib/auth';
import { redirect } from "next/navigation";
import { SettingsContent } from "./settings-content";

export const ServerSettingsContent = async () => {
  const user = await currentUser();

  if (!user?.id) {
    redirect("/");
    return null;
  }

  return <SettingsContent userId={user.id} />;
};

export default ServerSettingsContent;
