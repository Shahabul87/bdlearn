import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { SectionSidebar } from "./section-sidebar";


export const SectionMobileSidebar = () => {

    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-white"/>
            </SheetTrigger>
            <SheetContent className="p-0 z-[100]" side="left">
                <SectionSidebar />
            </SheetContent>
        </Sheet>
    )
}