import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";
import { SidebarDemo } from "@/components/ui/sidebar-demo";
import { Header } from "@/app/(homepage)/header";
import { HeaderAfterLogin } from "@/app/(homepage)/header-after-login";

import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";

import { InfoCard } from "./_components/info-card";


export default async function Dashboard() {
    const user = await currentUser();

    if(!user?.id){
        return redirect("/");
    }
    
    const userId = user?.id;

  const {
    completedCourses,
    coursesInProgress
  } = await getDashboardCourses(userId);

  return (
    <>
      {!user? (
                 <>
                    <div className="">
                       <Header />
                    </div>
               </> ):
               (
                <>
                <HeaderAfterLogin />
                </>
               )}  
    <SidebarDemo>
        <div className="p-6 space-y-4 bg-gray-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
          <InfoCard
              icon={Clock}
              label="In Progress"
              numberOfItems={coursesInProgress.length}
          />
          <InfoCard
              icon={CheckCircle}
              label="Completed"
              numberOfItems={completedCourses.length}
              variant="success"
          />
          </div>
          <CoursesList
            items={[...coursesInProgress, ...completedCourses]}
          />
        </div>
    </SidebarDemo>
    </>
  )
}