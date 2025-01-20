import { db } from "@/lib/db";
import { GroupsHeroSection } from "./_components/groups-hero-section";
import { GroupsList } from "./_components/groups-list";
import { SearchInput } from "@/components/search-input";
import { Search } from "lucide-react";
import ConditionalHeader from "@/app/(homepage)/user-header";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SidebarDemo } from "@/components/ui/sidebar-demo";
import { GroupFiltersSelect } from "./_components/group-filters-select";

export const revalidate = 0;

interface GroupsPageProps {
  searchParams: {
    category?: string;
    query?: string;
  }
}

export default async function GroupsPage({
  searchParams
}: GroupsPageProps) {
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }

  const groups = await db.group.findMany({
    where: {
      AND: [
        searchParams.query ? {
          OR: [
            { name: { contains: searchParams.query, mode: 'insensitive' } },
            { description: { contains: searchParams.query, mode: 'insensitive' } },
          ],
        } : {},
        searchParams.category && searchParams.category !== "All Categories" ? {
          category: searchParams.category
        } : {},
      ],
    },
    include: {
      _count: {
        select: {
          members: true,
          discussions: true,
          events: true,
        },
      },
      categoryRef: true,
      creator: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ConditionalHeader user={user} />
      <SidebarDemo>
        <div className="container mx-auto px-4 pt-24 pb-16">
          <GroupsHeroSection />
          <div className="mt-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Study Groups
                  </h2>
                  <div className="flex gap-4 w-full sm:w-auto">
                    <SearchInput 
                      placeholder="Search groups..." 
                      className="flex-1 sm:w-[300px]"
                    />
                    <GroupFiltersSelect />
                  </div>
                </div>

                {groups.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No groups found. Try adjusting your search or filters.
                    </p>
                  </div>
                ) : (
                  <GroupsList groups={groups} />
                )}
              </div>
            </div>
          </div>
        </div>
      </SidebarDemo>
    </div>
  );
} 