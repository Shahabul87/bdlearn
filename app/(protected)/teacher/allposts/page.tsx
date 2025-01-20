import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PostDashboard } from "./_components/post-dashboard";
import { Header } from "@/app/(homepage)/header";
import { HeaderAfterLogin } from "@/app/(homepage)/header-after-login";
import { SidebarDemo } from "@/components/ui/sidebar-demo";

const AllPostsPage = async () => {
  const user = await currentUser();

  if (!user?.id) {
    return redirect("/");
  }

  return (
    <>
      {!user ? (
        <div className="">
          <Header />
        </div>
      ) : (
        <HeaderAfterLogin user={user} />
      )}

      <SidebarDemo>
        <PostDashboard /> {/* Dashboard component to render all posts */}
      </SidebarDemo>
    </>
  );
};

export default AllPostsPage;

  