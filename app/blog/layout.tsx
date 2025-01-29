import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { Toaster } from "@/components/ui/sonner";
import { ConfettiProvider } from '@/components/providers/confetti-provider';
import { Header } from "@/app/(homepage)/header";
import { HeaderAfterLogin } from "@/app/(homepage)/header-after-login";
import { currentUser } from '@/lib/auth';




export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const session = await auth();
  const user = await currentUser();
 

  return (
   <SessionProvider session={session}>
    {!user ? <Header /> : <HeaderAfterLogin user={user}/>}
      <div className="relative min-h-screen w-screen">
        <div className="antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
          <ConfettiProvider />
          <Toaster />
         
          <main className="w-full min-h-screen p-6 px-10">             
              {children}
          </main> 
        </div>
      </div>
   </SessionProvider>
  )
}