"use client";

import { ProfileLinksContent } from "../profilelinkscontent";
import ServerSettingsContent from "../server-settings-content";
import SettingsContent from "../settings-content";
import { ProfileLink, FavoriteVideo, FavoriteAudio, FavoriteBlog, FavoriteArticle,Subscription } from "@prisma/client";
import { FavoriteVideoLinkForm } from "../_favoriteVideos/fav-video-link-form";
import { FavoriteAudioLinkForm } from "../_favoriteAudios/fav-audio-link-form"; // Assuming you have a form for favorite audios
import { FavoriteBlogLinkForm } from "../_favoriteBlogs/fav-blog-link-form";
import { FavoriteArticleLinkForm } from "../_favoriteArticles/fav-article-link-form";
import { SubscriptionLinkForm } from "../_subscription/subscription-link-form";
import { IdeasContent } from "./ideas-content";
import { MindsContent } from "./minds-content";
import { ScriptsContent } from "./scripts-content";
import { BillingContent } from "./billing-content";

interface TabContentProps {
  selectedTab: string;
  userId: string;
  profileLinks: ProfileLink[];
  favoriteVideos: FavoriteVideo[];
  favoriteAudios: FavoriteAudio[];
  favoriteBlogs: FavoriteBlog[];
  favoriteArticles: FavoriteArticle[];
  subscriptions: Subscription[];
}

const TabContent: React.FC<TabContentProps> = ({ 
  selectedTab, 
  userId, 
  profileLinks, 
  favoriteVideos, 
  favoriteAudios, 
  favoriteBlogs, 
  favoriteArticles,
  subscriptions,
}) => {

  
  switch (selectedTab) {
    case "IDEAS":
      return <IdeasContent userId={userId} />;
    case "MINDS":
      return <MindsContent userId={userId} />;
    case "SCRIPTS":
      return <ScriptsContent userId={userId} />;
    case "PROFILE LINKS":
      return <ProfileLinksContent userId={userId} profileLinks={profileLinks} />;
    case "VIDEOS":
      return <FavoriteVideoLinkForm userId={userId} favoriteVideos={favoriteVideos} />;
    case "AUDIOS":
      return <FavoriteAudioLinkForm userId={userId} favoriteAudios={favoriteAudios} />; // Render FavoriteAudioLinkForm with favoriteAudios
    case "ARTICLES":
      return <FavoriteArticleLinkForm userId={userId} favoriteArticles={favoriteArticles} />; // Render FavoriteAudioLinkForm with favoriteAudios
    case "BLOGS":
      return <FavoriteBlogLinkForm userId={userId} favoriteBlogs={favoriteBlogs} />; // Render FavoriteAudioLinkForm with favoriteAudios
    case "FOLLOWERS":
      return <p>User has no followers</p>;
    case "FOLLOWING":
      return <p>User follows nobody</p>;
    case "SETTINGS":
      return <SettingsContent userId={userId} />;
    case "SUBSCRIPTION":
      return <SubscriptionLinkForm userId={userId} subscriptions={subscriptions} />;
    case "BILLING":
      return <BillingContent userId={userId} />;
    default:
      return null;
  }
};

export default TabContent;




