"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconDashboard,
  IconUser,
  IconSettings,
  IconBook,
  IconChartBar,
  IconUsers,
  IconCalendar,
  IconMessageCircle,
  IconBrain,
  IconLibrary,
  IconHelpCircle,
  IconMenu2,
  IconX,
  IconSchool,
  IconPencil,
  IconNews,
  IconAnalyze,
  IconRobot,
  IconBrandTabler,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface SidebarDemoProps {
  children: React.ReactNode;
}

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  href?: string;
  submenu?: { label: string; href: string }[];
}

export function SidebarDemo({ children }: SidebarDemoProps) {
  const user = useCurrentUser();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Update mobile detection to consider larger screens
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle hover effects only on desktop
  const handleMouseEnter = () => {
    if (!isMobile) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false);
      setActiveSubmenu(null);
    }
  };

  const menuItems: MenuItem[] = [
    {
      title: "Dashboard",
      icon: <IconDashboard className="w-5 h-5" />,
      submenu: [
        { label: "Student Dashboard", href: "/dashboard/student" },
        { label: "Teacher Dashboard", href: "/dashboard/teacher" },
        { label: "Admin Dashboard", href: "/dashboard/admin" },
      ],
    },
    {
      title: "Profile Manager",
      icon: <IconUser className="w-5 h-5" />,
      href: "/profile",
    },
    {
      title: "Settings",
      icon: <IconSettings className="w-5 h-5" />,
      href: "/settings",
    },
    {
      title: "Courses",
      icon: <IconBook className="w-5 h-5" />,
      submenu: [
        { label: "My Courses", href: "/teacher/courses/mycourses" },
        { label: "All Courses", href: "/teacher/courses" },
        { label: "Browse Courses", href: "/teacher/courses" },
        { label: "Create Course", href: "/teacher/create" },
      ],
    },
    {
      title: "Posts",
      icon: <IconNews className="w-5 h-5" />,
      submenu: [
        { label: "My Posts", href: "/teacher/posts" },
        { label: "All Posts", href: "/teacher/allposts" },
        { label: "Browse Posts", href: "/posts/browse" },
        { label: "Create Post", href: "/teacher/createblog" },
      ],
    },
    {
      title: "Analytics",
      icon: <IconChartBar className="w-5 h-5" />,
      submenu: [
        { label: "Student Analytics", href: "/analytics/student" },
        { label: "Teacher Analytics", href: "/analytics/teacher" },
        { label: "Admin Analytics", href: "/analytics/admin" },
      ],
    },
    {
      title: "Groups",
      icon: <IconUsers className="w-5 h-5" />,
      submenu: [
        { label: "My Groups", href: "/groups/my-groups" },
        { label: "All Groups", href: "/groups" },
        { label: "Create Group", href: "/groups/create" },
      ],
    },
    {
      title: "Calendar",
      icon: <IconCalendar className="w-5 h-5" />,
      href: "/calendar",
    },
    {
      title: "Support",
      icon: <IconHelpCircle className="w-5 h-5" />,
      href: "/support",
    },
    {
      title: "Message Center",
      icon: <IconMessageCircle className="w-5 h-5" />,
      href: "/messages",
    },
    {
      title: "Resource Center",
      icon: <IconLibrary className="w-5 h-5" />,
      href: "/resources",
    },
    {
      title: "AI Tutor",
      icon: <IconRobot className="w-5 h-5" />,
      href: "/ai-tutor",
    },
  ];

  const toggleSubmenu = (title: string) => {
    setActiveSubmenu(activeSubmenu === title ? null : title);
  };

  return (
    <div className="flex min-h-screen relative">
      {/* Mobile Menu Button - Only show on smaller screens */}
      {isMobile && (
        <button
          onClick={() => setOpen(!open)}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-800/90 text-gray-400 hover:text-white transition-colors md:hidden"
        >
          {open ? (
            <IconX className="w-6 h-6" />
          ) : (
            <IconMenu2 className="w-6 h-6" />
          )}
        </button>
      )}

      {/* Backdrop - Only show on mobile */}
      {isMobile && open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ 
          width: (open || (!isMobile && isHovered)) ? "280px" : "80px",
          x: isMobile && !open ? "-100%" : 0 
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "h-screen bg-gray-900/50 border-r border-gray-700/50 backdrop-blur-sm",
          "flex flex-col sticky top-0 z-50 transition-all duration-300",
          isMobile ? "fixed md:relative" : "relative"
        )}
      >
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-700/50">
          <div className="flex items-center justify-between">
            <AnimatePresence initial={false}>
              {(open || (!isMobile && isHovered)) ? <Logo /> : <LogoIcon />}
            </AnimatePresence>
            {/* Only show toggle button on mobile devices */}
            {isMobile ? (
              <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors lg:hidden"
              >
                {open ? (
                  <IconX className="w-5 h-5 text-gray-400" />
                ) : (
                  <IconMenu2 className="w-5 h-5 text-gray-400" />
                )}
              </button>
            ) : null}
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4 space-y-1">
          {menuItems.map((item, index) => (
            <div key={index}>
              <motion.div
                initial={false}
                onClick={() => {
                  if (item.submenu) {
                    toggleSubmenu(item.title);
                  } else if (item.href) {
                    router.push(item.href);
                    if (isMobile) {
                      setOpen(false);
                    }
                  }
                }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 mx-2 rounded-lg cursor-pointer",
                  "transition-all duration-300",
                  (pathname === item.href || activeSubmenu === item.title)
                    ? "bg-purple-500/10 text-purple-400"
                    : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-200"
                )}
              >
                {item.icon}
                {(open || (!isMobile && isHovered)) && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 text-sm font-medium"
                  >
                    {item.title}
                  </motion.span>
                )}
                {(open || (!isMobile && isHovered)) && item.submenu && (
                  <motion.svg
                    animate={{ rotate: activeSubmenu === item.title ? 180 : 0 }}
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                )}
              </motion.div>

              {/* Submenu */}
              {(open || (!isMobile && isHovered)) && item.submenu && (
                <AnimatePresence initial={false}>
                  {activeSubmenu === item.title && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      {item.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className={cn(
                            "flex items-center gap-3 px-4 py-2 mx-6 rounded-lg text-sm",
                            "transition-all duration-300",
                            pathname === subItem.href
                              ? "text-purple-400 bg-purple-500/10"
                              : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                          )}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-current" />
                          {subItem.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className={cn(
        "flex-1 overflow-x-hidden",
        isMobile && "w-full md:w-auto"
      )}>
        {children}
      </div>
    </div>
  );
}

// Logo components
export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
      <div className="h-8 w-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
        <IconBrandTabler className="h-5 w-5" />
      </div>
      <span className="font-medium">iSham</span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link href="/" className="block">
      <div className="h-8 w-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
        <IconBrandTabler className="h-5 w-5 text-purple-400" />
      </div>
    </Link>
  );
};

