import { SidebarDemo } from "@/components/ui/sidebar-demo"
import { Header } from "@/app/(homepage)/header"
import { HeaderAfterLogin } from "@/app/(homepage)/header-after-login"
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CreateNewCoursePage } from "./create-course";
import { cn } from "@/lib/utils";

const CourseCreationPage = async() => {
    const user = await currentUser();

    if(!user?.id){
        return redirect("/");
    }

    return (
        <>
            {!user ? (
                <div className="">
                    <Header />
                </div>
            ) : (
                <HeaderAfterLogin user={user} />
            )}  
            <SidebarDemo>
                <div className={cn(
                    "min-h-[calc(100vh-80px)]",
                    "bg-gray-50/50 dark:bg-gray-900/50",
                    "flex items-center justify-center"
                )}>
                    <CreateNewCoursePage />
                </div>
            </SidebarDemo>
        </>
    )
}

export default CourseCreationPage;
