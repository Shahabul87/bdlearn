"use client";

import { SidebarDemo } from "@/components/ui/sidebar-demo";
import { UserRole } from "@prisma/client";

interface ClientDashboardWrapperProps {
  children: React.ReactNode;
  userRole: UserRole;
}

export default function ClientDashboardWrapper({ 
  children,
  userRole 
}: ClientDashboardWrapperProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-50/80 to-white dark:from-gray-900 dark:via-gray-900/80 dark:to-gray-800 transition-colors duration-300">
      <SidebarDemo>
        <main className="container mx-auto px-4 py-8 mt-20">
          {children}
        </main>
      </SidebarDemo>
    </div>
  );
} 