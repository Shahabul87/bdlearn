import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { SidebarLearn } from "./sidebar";


export const MobileSidebarLearn = () => {

    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-white"/>
            </SheetTrigger>
            <SheetContent className="p-0 z-[100]" side="left">
                <SidebarLearn />
            </SheetContent>
        </Sheet>
    )
}