"use client"

import { UserButton } from "@/components/auth/user-button";
import { MobileSidebar } from "@/app/(dashboard)/_components/mobile-sidebar";
import { NavbarRoutes } from "@/components/navbar/navbar-routes";
import Link from "next/link";
import { HoverBorderGradient } from "@/components/navbar/hover-border-gradient";

export const Navbar = () => {

  return (
    <nav className="bg-blue-500 flex h-[80px] justify-between items-center p-4 w-full shadow-sm">
         <Link href = "/">
                            <HoverBorderGradient
                                containerClassName="rounded-full"
                                as="button"
                                className="dark:bg-black bg-white text-blue dark:text-white flex items-center space-x-2"
                                >
                                <span className="text-blue-600 font-semibold">iSham</span>
                            </HoverBorderGradient>
                        </Link>
      <div className="flex justify-start items-center w-full">
          <NavbarRoutes />
        <div  className ="md:hidden">
            <div className="p-4 border-b h-full flex items-center bg-white shadow-sm rounded-full">
                <MobileSidebar />
            </div>
        </div>
      </div>
      <UserButton />
    </nav>
  );
};