import { currentUser } from "@/lib/auth";
import ConditionalHeader from "@/app/(homepage)/user-header";

export default async function CourseLearnLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-16">
        <ConditionalHeader user={user} />
      </div>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
} 