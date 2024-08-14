"use client";


import { Button } from "../ui/button";
import { ExitIcon } from "@radix-ui/react-icons";

// import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
// import { LogOut } from "lucide-react";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "../auth/logout-button";

// import { Button } from "@/components/ui/button";
// import { isTeacher } from "@/lib/teacher";

import { SearchInput } from "../search-input";

export const NavbarRoutes = () => {
// const user = useCurrentUser();
const pathname = usePathname();

// const isTeacherPage = pathname?.startsWith("/teacher");
// const isCoursePage = pathname?.includes("/courses");
const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      {/* <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogoutButton>
              <ExitIcon className="h-4 w-4 mr-2" />
                Exit
              </LogoutButton>
            </Button>
          </Link>
        ) : (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher mode
            </Button>
          </Link>
        )}  
        </div> */}
      
    </>
    
  )
}