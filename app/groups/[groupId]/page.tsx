import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import ConditionalHeader from "@/app/(homepage)/user-header";
import { SidebarDemo } from "@/components/ui/sidebar-demo";
import { GroupHeader } from "./_components/group-header";
import { GroupContent } from "./_components/group-content";

interface GroupPageProps {
  params: {
    groupId: string;
  };
}

export default async function GroupPage({ params }: GroupPageProps) {
  const user = await currentUser();

  if (!user?.id) {
    return redirect("/");
  }


  const group = await db.group.findUnique({
    where: {
      id: params.groupId,
    },
    include: {
      creator: true,
      members: {
        include: {
          user: true,
        },
      },
      course: {
        select: {
          title: true,
          imageUrl: true,
        },
      },
      categoryRef: true,
      discussions: {
        include: {
          author: true,
          _count: {
            select: {
              comments: true,
              likedBy: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      resources: {
        include: {
          author: {
            select: {
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  if (!group) {
    return redirect("/groups");
  }

  const isGroupMember = group.members.some(member => member.userId === user.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ConditionalHeader user={user} />
      <SidebarDemo>
        <main className="container mx-auto px-4 pt-24 pb-16">
          <GroupHeader 
            group={group} 
            currentUser={user}
            isGroupMember={isGroupMember}
          />
          <GroupContent 
            group={group}
            currentUser={user}
            isGroupMember={isGroupMember}
          />
        </main>
      </SidebarDemo>
    </div>
  );
} 