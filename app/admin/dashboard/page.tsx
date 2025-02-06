import { db } from "@/lib/db";

export default async function AdminDashboard() {
  const stats = await db.user.count();
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div>Total Users: {stats}</div>
    </div>
  );
} 