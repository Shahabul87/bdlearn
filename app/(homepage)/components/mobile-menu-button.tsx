"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Bell, MessageCircle, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LogoutButton } from '@/components/auth/logout-button';
import { NotificationsPopover } from "../_components/notifications-popover";
import { MessagesPopover } from "../_components/messages-popover";

interface MobileMenuButtonProps {
  dashboardLink: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const MobileMenuButton = ({ dashboardLink, isOpen, setIsOpen }: MobileMenuButtonProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-[85vw] sm:w-[400px] p-0"
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="px-6 border-b border-gray-200 dark:border-gray-800">
            <SheetTitle className="flex items-center">
              <SheetClose asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Menu
                </Button>
              </SheetClose>
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto py-4 px-2">
            <div className="flex items-center gap-4 mb-2">
              <NotificationsPopover />
              <MessagesPopover />
            </div>
            <nav className="space-y-2">
              {[
                { href: "/about", label: "About" },
                { href: "/blog", label: "Blog" },
                { href: dashboardLink, label: "Dashboard" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-2.5 text-sm rounded-lg",
                    "text-gray-700 dark:text-gray-300",
                    "hover:bg-gray-100 dark:hover:bg-gray-800",
                    "transition-all duration-200"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-auto border-t border-gray-200 dark:border-gray-800 p-2">
            <Link
              href="/profile"
              className={cn(
                "flex items-center px-4 py-2.5 text-sm rounded-lg mb-2",
                "text-gray-700 dark:text-gray-300",
                "hover:bg-gray-100 dark:hover:bg-gray-800",
                "transition-all duration-200"
              )}
            >
              <User className="h-4 w-4 mr-3" />
              Profile
            </Link>

            <LogoutButton>
              <button
                className={cn(
                  "flex w-full items-center px-4 py-2.5 text-sm rounded-lg",
                  "text-red-600 dark:text-red-400",
                  "hover:bg-red-50 dark:hover:bg-red-900/10",
                  "transition-all duration-200"
                )}
              >
                <LogOut className="h-4 w-4 mr-3" />
                Logout
              </button>
            </LogoutButton>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}; 