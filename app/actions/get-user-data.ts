import { db } from "@/lib/db";

export const getUserData = async (userId: string) => {
  try {
    const userData = await db.user.findUnique({
      where: { id: userId },
      include: {
        accounts: true,
        courses: true,
        twoFactorConfirmation: true,
        profileLinks: true,
        posts: {
          include: {
            comments: true,
            replies: true,
            user: true,
            reactions: true,
            postchapter: true,
            imageSections: true
          }
        },
        comments: {
          include: {
            replies: true
          }
        },
        videos: true,
        blogs: true,
        articles: true,
        notes: true,
        favoriteVideos: true,
        favoriteAudios: true,
        favoriteArticles: true,
        favoriteBlogs: true,
        favoriteImages: true,
        subscriptions: true
      }
    });

    return userData;
  } catch (error) {
    console.error("[GET_USER_DATA_ERROR]", error);
    return null;
  }
}; 