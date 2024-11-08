"use client";

import { useState } from "react";
import { SidebarDemo } from "@/components/ui/sidebar-demo";
import ProfileHeader from "./ProfileHeader";
import Tab from "./Tab";
import TabContent from "./TabContent";
import { ProfileLink, FavoriteVideo, FavoriteAudio, FavoriteBlog, FavoriteArticle } from "@prisma/client";

interface ProfileProps {
  userId: string;
  username?: string;
  avatarUrl?: string;
  joinDate?: string;
  profileLinks: ProfileLink[];
  favoriteVideos: FavoriteVideo[];
  favoriteAudios: FavoriteAudio[];    // New prop for favorite audios
  favoriteBlogs: FavoriteBlog[];      // New prop for favorite blogs
  favoriteArticles: FavoriteArticle[]; // New prop for favorite articles
}

// Updated tabs array to include new tabs
const tabs = [
  "IDEAS", 
  "MINDS", 
  "SCRIPTS", 
  "PROFILE LINKS", 
  "VIDEOS", 
  "AUDIOS", 
  "ARTICLES", 
  "BLOGS", 
  "FOLLOWERS", 
  "FOLLOWING", 
  "SETTINGS"
];

const Profile: React.FC<ProfileProps> = ({ 
  userId, 
  username, 
  avatarUrl, 
  joinDate, 
  profileLinks, 
  favoriteVideos, 
  favoriteAudios, 
  favoriteBlogs, 
  favoriteArticles 
}) => {

  
  const [selectedTab, setSelectedTab] = useState("IDEAS");

  return (
    <SidebarDemo>
      <div className="flex flex-col items-center bg-gray-800 text-white min-h-screen py-8 px-10">
        <ProfileHeader 
          userId={userId} 
          username={username} 
          avatarUrl={avatarUrl} 
          joinDate={joinDate} 
        />
        
        {/* Tabs */}
        <div className="w-full flex justify-center gap-4 border-b border-gray-700">
          {tabs.map((tab) => (
            <Tab
              key={tab}
              label={tab}
              isSelected={selectedTab === tab}
              onClick={() => setSelectedTab(tab)}
            />
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-10 w-full">
          <TabContent 
            selectedTab={selectedTab} 
            userId={userId} 
            profileLinks={profileLinks} 
            favoriteVideos={favoriteVideos} 
            favoriteAudios={favoriteAudios} 
            favoriteBlogs={favoriteBlogs} 
            favoriteArticles={favoriteArticles} 
          />
        </div>
      </div>
    </SidebarDemo>
  );
};

export default Profile;


