import { SidebarDemo } from "@/components/ui/sidebar-demo";
import ConditionalHeader from "@/app/(homepage)/user-header";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ResourceCenter } from "./_components/resource-center";

const ResourcesPage = async () => {
  const user = await currentUser();
  
  if (!user) {
    return redirect("/");
  }

  return (
    <>
      <ConditionalHeader user={user} />
      <SidebarDemo>
        <div className="p-6 mt-20">
          <ResourceCenter userId={user.id} />
        </div>
      </SidebarDemo>
    </>
  );
};

export default ResourcesPage; 