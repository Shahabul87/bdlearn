import { AdminGuard } from "@/components/auth/admin-guard";

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        {children}
      </div>
    </AdminGuard>
  );
} 