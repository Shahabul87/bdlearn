"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons"
import { RiAdminFill } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";
import { CiServer } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";

export const UserButton = () => {
  const user = useCurrentUser();

  //console.log(user)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-slate-700">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
       
        <DropdownMenuItem>
        <Link href="/settings" className="flex flex-row">
            <CiSettings className="h-4 w-4 mr-2" />
            Settings
          </Link> 
        </DropdownMenuItem>
        <DropdownMenuItem>
        <Link href="/admin" className="flex flex-row">
            <RiAdminFill className="h-4 w-4 mr-2" />
            Admin
          </Link> 
        </DropdownMenuItem>
        <DropdownMenuItem>
        <Link href="/server" className="flex flex-row">
            <CiServer className="h-4 w-4 mr-2" />
            Server
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
        <Link href="/client" className="flex flex-row">
            <FaHome className="h-4 w-4 mr-2" />
            Client
          </Link>
        </DropdownMenuItem>
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};