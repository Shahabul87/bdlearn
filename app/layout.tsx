import type { Metadata } from 'next'
import { Inter, DM_Sans } from 'next/font/google'
import './globals.css'
import clsx from "clsx";
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { Toaster } from "@/components/ui/sonner";
import { ConfettiProvider } from '@/components/providers/confetti-provider';
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ['latin'] })

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'bdgenai',
  description: 'Learn with Shahabul Alam',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link 
          rel="preload" 
          href="/_next/static/css/app/layout.css" 
          as="style"
        />
      </head>
      <body className={clsx(
        dmSans.className,
        "min-h-screen bg-white/30 dark:bg-gray-900 transition-colors duration-300"
      )}>
        <SessionProvider session={session}>
          <Providers>
            <ConfettiProvider />
            <Toaster />
            <main className="min-h-screen">
                {children}
            </main> 
          </Providers>
        </SessionProvider>
      </body>
    </html>
  )
}
