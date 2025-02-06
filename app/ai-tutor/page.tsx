import { AiTutorContent } from "./_components/ai-tutor-content";
import { currentUser } from '@/lib/auth'
import ConditionalHeader from "../(homepage)/user-header";
import { SidebarDemo } from "@/components/ui/sidebar-demo";

export default async function AiTutorPage() {
  const user = await currentUser();
  return (
    <>
      <ConditionalHeader user={user} />
      <SidebarDemo>
        <div className="mt-20 p-6">
          <AiTutorContent />
        </div>
      </SidebarDemo>
    </>
  );
} 