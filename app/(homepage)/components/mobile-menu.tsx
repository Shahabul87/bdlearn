"use client";

import Link from "next/link";
import { useAdmin } from "@/hooks/use-admin";
import { 
  LayoutDashboard, 
  Settings, 
  User, 
  BookOpen, 
  GraduationCap,
  Users,
  BarChart,
  Shield,
  FileText,
  HelpCircle
} from "lucide-react";

export const MobileMenu = () => {
  const isAdmin = useAdmin();

  return (
    <div className="flex flex-col h-full">
      {/* Main Navigation */}
      <div className="flex flex-col space-y-2 px-4">
        <Link 
          href="/courses" 
          className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <BookOpen className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <span className="text-gray-700 dark:text-gray-300">Courses</span>
        </Link>
        <Link 
          href="/learning" 
          className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <GraduationCap className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <span className="text-gray-700 dark:text-gray-300">My Learning</span>
        </Link>
      </div>

      {/* User Section */}
      <div className="mt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col space-y-2 px-4 pt-6">
          <Link 
            href="/dashboard" 
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <LayoutDashboard className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">Dashboard</span>
          </Link>
          <Link 
            href="/profile" 
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">Profile</span>
          </Link>
          <Link 
            href="/settings" 
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Settings className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">Settings</span>
          </Link>
        </div>
      </div>

      {/* Admin Section */}
      {isAdmin && (
        <div className="mt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 py-4">
            <h3 className="px-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Admin
            </h3>
            <div className="mt-3 flex flex-col space-y-2">
              <Link 
                href="/admin/dashboard" 
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <BarChart className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">Admin Dashboard</span>
              </Link>
              <Link 
                href="/admin/users" 
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Users className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">Manage Users</span>
              </Link>
              <Link 
                href="/admin/settings" 
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Shield className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">Admin Settings</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Help & Support */}
      <div className="mt-auto border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col space-y-2 px-4 py-4">
          <Link 
            href="/help" 
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <HelpCircle className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">Help & Support</span>
          </Link>
          <Link 
            href="/documentation" 
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FileText className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">Documentation</span>
          </Link>
        </div>
      </div>
    </div>
  );
}; 