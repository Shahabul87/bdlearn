import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Dashboard } from "./dashboard";
import { Header } from "@/app/(homepage)/header";
import { HeaderAfterLogin } from "@/app/(homepage)/header-after-login";
import { SidebarDemo } from "@/components/ui/sidebar-demo";

const CoursesPage = async () => {
    const user = await currentUser();

    if(!user?.id){
        return redirect("/");
    }
    
    const userId = user?.id;

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
           <Dashboard />
       </SidebarDemo>
       </>
   );
        
}
 
export default CoursesPage;