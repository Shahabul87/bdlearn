import Profile from "./_components/Profile";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import ConditionalHeader from "../(homepage)/user-header";

const ProfileSettingsPage = async () => {
  const user = await currentUser();

  if (!user?.id) {
    return redirect("/");
  }

  // Fetch complete user data with relations
  const userData = await db.user.findUnique({
    where: { id: user.id },
    include: {
      profileLinks: true,
      favoriteVideos: true,
      favoriteAudios: true,
      favoriteBlogs: true,
      favoriteArticles: true,
      subscriptions: true,
      customTabs: true,
    }
  });

  if (!userData) {
    return redirect("/");
  }

  return (
    <>
      <ConditionalHeader user={user}/>
      <div className="mt-20 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900">
        <Profile {...userData} userId={userData.id} />
      </div>
    </>
  );
};

export default ProfileSettingsPage;


