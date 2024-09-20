import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Dashboard } from "./dashboard";


import { db } from "@/lib/db";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/column";
import { Header } from "@/app/(homepage)/header";
import { SidebarDemo } from "@/components/ui/sidebar-demo";

const CoursesPage = async () => {
    // const user = await currentUser();

    // if(!user?.id){
    //     return redirect("/");
    // }
    
    // const userId = user?.id;

    // const courses = await db.course.findMany({
    //     where: {
    //     userId,
    //     },
    //     orderBy: {
    //     createdAt: "desc",
    //     },
    // });

    return (
        <SidebarDemo>
           <Dashboard />
       </SidebarDemo>
   );
        
}
 
export default CoursesPage;