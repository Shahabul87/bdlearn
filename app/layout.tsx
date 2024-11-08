import type { Metadata } from 'next'
import { Inter, DM_Sans } from 'next/font/google'
import './globals.css'
import clsx from "clsx";
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { Toaster } from "@/components/ui/sonner";
import { ConfettiProvider } from '@/components/providers/confetti-provider';


//bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-200 to-zinc-300

//const inter = Inter({ subsets: ['latin'] })
const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'iSham',
  description: 'Created by S Alam',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const session = await auth();
 

  return (
   <SessionProvider session={session}>
      <html lang="en" className="relative">
        <body className={clsx(dmSans.className, "antialiased bg-gray-800")}>
          <ConfettiProvider />
          <Toaster />
         
          <main className ="">             
              {children}
          </main> 
        </body>
      </html>
   </SessionProvider>

 
  )
}
