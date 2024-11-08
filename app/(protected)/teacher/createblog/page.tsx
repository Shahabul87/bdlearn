import { SidebarDemo } from "@/components/ui/sidebar-demo"
import { Header } from "@/app/(homepage)/header"
import { HeaderAfterLogin } from "@/app/(homepage)/header-after-login"
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CreateNewBlogPage } from "./create-blog";



const BlogCreationPage = async() => {

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
            <div>
               <CreateNewBlogPage />
            </div>
         </SidebarDemo>
        </>
    )
}

export default BlogCreationPage