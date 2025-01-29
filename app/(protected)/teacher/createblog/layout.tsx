import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SidebarDemo } from "@/components/ui/sidebar-demo";
import { Header } from "@/app/(homepage)/header";
import { HeaderAfterLogin } from "@/app/(homepage)/header-after-login";

export default async function CreateBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user?.id) {
    return redirect("/");
  }

  return (
    <>
      {!user ? (
        <div>
          <Header />
        </div>
      ) : (
        <HeaderAfterLogin user={user} />
      )}
      <SidebarDemo>
        <div className="min-h-screen pt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </div>
      </SidebarDemo>
    </>
  );
} 