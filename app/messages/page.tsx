import { SidebarDemo } from "@/components/ui/sidebar-demo";
import ConditionalHeader from "@/app/(homepage)/user-header";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MessageCenter } from "./_components/message-center";

export default async function MessagesPage() {
  const user = await currentUser();
  
  if (!user?.id) {
    return redirect("/");
  }

  return (
    <>
      <ConditionalHeader user={user} />
      <SidebarDemo>
        <div className="p-6 mt-20">
          <MessageCenter userId={user.id!} />
        </div>
      </SidebarDemo>
    </>
  );
} 