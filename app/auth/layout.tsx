import { currentUser } from '@/lib/auth'
import ConditionalHeader from '@/app/(homepage)/user-header'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  
  return (
    <div className="min-h-screen bg-gray-900">
      <ConditionalHeader user={user} />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900">
        {children}
      </div>
    </div>
    );
}