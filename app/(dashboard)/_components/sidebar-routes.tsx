"use client";

import { BarChart, Compass, Layout, List, HomeIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  {
    icon: HomeIcon,
    label: "Home",
    href: "/",
  },
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

// const teacherRoutes = [
//   {
//     icon: List,
//     label: "Courses",
//     href: "/teacher/courses",
//   },
//   {
//     icon: BarChart,
//     label: "Analytics",
//     href: "/teacher/analytics",
//   },
// ]

export const SidebarRoutes = () => {
  // const pathname = usePathname();

  // const isTeacherPage = pathname?.includes("/teacher");

  const routes = guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}