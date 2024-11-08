// SettingsContent.tsx
"use client";

import { useState, useEffect } from "react";
import { PrivateSettingsPage } from "../(protected)/settings/private-details-for-profile";
import { ProfileLinkCreationPage } from "./profile-links-creation";
import { db } from "@/lib/db";
import { User, ProfileLink } from "@prisma/client";

interface SettingsContentProps {
  userId: string;
}

export const SettingsContent = ({ userId }: SettingsContentProps) => {
  const [selectedSettingsTab, setSelectedSettingsTab] = useState("Profile Info");
  const [userDetails, setUserDetails] = useState<User & { profileLinks: ProfileLink[] } | null>(null);

  const settingsTabs = ["Profile Info", "Private Details"];

  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = await db.user.findUnique({
        where: { id: userId },
        include: { profileLinks: true },
      });
      setUserDetails(user);
    };

    fetchUserDetails();
  }, [userId]);

  if (!userDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full">
      <div className="flex gap-4 mb-6 border-b border-gray-700">
        {settingsTabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 ${selectedSettingsTab === tab ? "border-b-2 border-white" : "text-gray-500"}`}
            onClick={() => setSelectedSettingsTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {selectedSettingsTab === "Profile Info" ? (
        <ProfileLinkCreationPage userDetails={userDetails} />
      ) : (
        <PrivateSettingsPage />
      )}
    </div>
  );
};

export default SettingsContent;

