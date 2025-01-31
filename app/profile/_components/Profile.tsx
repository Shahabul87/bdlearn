"use client";

import { useState } from "react";
import { SidebarDemo } from "@/components/ui/sidebar-demo";
import { AnimatedContent } from "./AnimatedContent";
import { AnimatedHeader } from "./AnimatedHeader";
import { ProfileNavigation } from "./ProfileNavigation";
import TabContent from "./TabContent";
import type { ProfileProps } from "./types";

export function Profile({
  userId,
  name,
  image,
  createdAt,
  profileLinks,
  favoriteVideos,
  favoriteAudios,
  favoriteBlogs,
  favoriteArticles,
  subscriptions,
  customTabs
}: ProfileProps) {
  const [selectedTab, setSelectedTab] = useState("IDEAS");

  return (
    <SidebarDemo>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <AnimatedHeader
          userId={userId}
          username={name || undefined}
          avatarUrl={image || undefined}
          joinDate={createdAt?.toISOString()}
        />
        
        <ProfileNavigation 
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatedContent>
            <TabContent
              selectedTab={selectedTab}
              userId={userId}
              profileLinks={profileLinks}
              favoriteVideos={favoriteVideos}
              favoriteAudios={favoriteAudios}
              favoriteBlogs={favoriteBlogs}
              favoriteArticles={favoriteArticles}
              subscriptions={subscriptions}
            />
          </AnimatedContent>
        </div>
      </div>
    </SidebarDemo>
  );
}

export default Profile;



