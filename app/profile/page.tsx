import Profile from "./_components/Profile";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const ProfileSettingsPage = async () => {
  const user = await currentUser();

  if (!user?.id) {
    return redirect("/");
  }

  const userId = user.id;
  const username = user.name ?? undefined;

  // Fetch profile links
  const profileLinks = await db.profileLink.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Fetch favorite videos
  const favoriteVideos = await db.favoriteVideo.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Fetch favorite audios
  const favoriteAudios = await db.favoriteAudio.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Fetch favorite blogs
  const favoriteBlogs = await db.favoriteBlog.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Fetch favorite articles
  const favoriteArticles = await db.favoriteArticle.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });



  if (!profileLinks && !favoriteVideos && !favoriteAudios && !favoriteBlogs && !favoriteArticles) {
    return redirect("/");
  }

  return (
    <>
      <Profile 
        userId={userId} 
        username={username} 
        profileLinks={profileLinks} 
        favoriteVideos={favoriteVideos} 
        favoriteAudios={favoriteAudios} 
        favoriteBlogs={favoriteBlogs} 
        favoriteArticles={favoriteArticles} 
      />
    </>
  );
};

export default ProfileSettingsPage;


