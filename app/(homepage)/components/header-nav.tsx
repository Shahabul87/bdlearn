"use client";

import { useAdmin } from "@/hooks/use-admin";
import Link from "next/link";

export const HeaderNav = () => {
  const isAdmin = useAdmin();

  return (
    <nav>
      {/* Existing nav items */}
      
      {isAdmin && (
        <Link 
          href="/admin/dashboard"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          Admin
        </Link>
      )}
    </nav>
  );
}; 