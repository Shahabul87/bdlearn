import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { CalendarLayout } from "./_components/calendar-layout";
import { CalendarErrorBoundary } from "./_components/calendar-error-boundary";
import ConditionalHeader from "@/app/(homepage)/user-header";
import { SidebarDemo } from "@/components/ui/sidebar-demo";
import { Toaster } from "sonner";

export default async function CalendarPage() {
  const user = await currentUser();

  if (!user?.id) {
    return redirect("/");
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Toaster position="top-center" />
      <ConditionalHeader user={user} />
      <SidebarDemo>
        <div className="mt-20 p-6">
          <CalendarErrorBoundary>
            <CalendarLayout userId={user.id!} />
          </CalendarErrorBoundary>
        </div>
      </SidebarDemo>
    </div>
  );
} 