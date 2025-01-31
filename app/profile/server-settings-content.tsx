"use client";

// ServerSettingsContent.tsx
import { SettingsContent } from "./settings-content";

interface ServerSettingsContentProps {
  userId: string;
}

export const ServerSettingsContent = ({ userId }: ServerSettingsContentProps) => {
  return <SettingsContent userId={userId} />;
};

export default ServerSettingsContent;
