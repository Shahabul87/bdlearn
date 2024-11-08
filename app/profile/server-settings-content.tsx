// ServerSettingsContent.tsx
import { db } from "@/lib/db";
import { currentUser } from '@/lib/auth';
import { redirect } from "next/navigation";
import { SettingsContent } from "./settings-content";

export const ServerSettingsContent = async () => {
  const user = await currentUser();

  if (!user?.id) {
    redirect("/");
    return null; // stop rendering on redirect
  }

  const userId = user.id;

  const userDetails = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      profileLinks: true,
    },
  });

  return <SettingsContent userDetails={userDetails} />;
};

export default ServerSettingsContent;
