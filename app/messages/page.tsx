import { SidebarDemo } from "@/components/ui/sidebar-demo";
import ConditionalHeader from "@/app/(homepage)/user-header";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MessageCenter } from "./_components/message-center";

const MessagesPage = async () => {
  const user = await currentUser();
  
  if (!user) {
    return redirect("/");
  }

  return (
    <>
      <ConditionalHeader user={user} />
      <SidebarDemo>
        <div className="p-6 mt-20">
          <MessageCenter userId={user.id} />
        </div>
      </SidebarDemo>
    </>
  );
};

export default MessagesPage; 