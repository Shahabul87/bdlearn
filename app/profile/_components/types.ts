import { ProfileLink, FavoriteVideo, FavoriteAudio, FavoriteBlog, FavoriteArticle, Subscription, CustomTab } from "@prisma/client";

export interface ProfileProps {
  userId: string;
  name: string | null;
  image: string | null;
  createdAt: Date;
  profileLinks: ProfileLink[];
  favoriteVideos: FavoriteVideo[];
  favoriteAudios: FavoriteAudio[];
  favoriteBlogs: FavoriteBlog[];
  favoriteArticles: FavoriteArticle[];
  subscriptions: Subscription[];
  customTabs: CustomTab[];
} 