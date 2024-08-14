import { cn } from "@/lib/utils";
import { Sidebar } from "../(dashboard)/_components/sidebar";
type Props = {
    className?:string
};


export const SidebarLearn =({className}:Props)=>{

    return (
           <div className={cn("flex bg-red-500 h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col", className)}>
            <Sidebar />
           </div>
    )
}