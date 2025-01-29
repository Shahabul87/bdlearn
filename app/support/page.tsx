import { SidebarDemo } from "@/components/ui/sidebar-demo";
import ConditionalHeader from "@/app/(homepage)/user-header";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SupportContent } from "./_components/support-content";

export default async function SupportPage() {
  const user = await currentUser();
  
  if (!user?.id) {
    return redirect("/");
  }

  return (
    <>
      <ConditionalHeader user={user} />
      <SidebarDemo>
        <div className="p-6 mt-20">
          <SupportContent userId={user.id!} />
        </div>
      </SidebarDemo>
    </>
  );
} 