import type { Metadata } from 'next'
import { Inter, DM_Sans } from 'next/font/google'
import './globals.css'
import clsx from "clsx";
import { auth } from '@/auth'
import { Toaster } from "@/components/ui/sonner";
import { ConfettiProvider } from '@/components/providers/confetti-provider';
import Providers from "@/app/providers";

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
  return (
    <html lang="en" suppressHydrationWarning className="light">
      <head>
        <link 
          rel="preload" 
          href="/_next/static/css/app/layout.css" 
          as="style"
        />
      </head>
      <body className={clsx(
        dmSans.className,
        "min-h-screen bg-background text-foreground transition-colors duration-300 overflow-x-hidden"
      )}>
        <Providers>
          <ConfettiProvider />
          <Toaster />
          <main className="min-h-screen">
              {children}
          </main> 
        </Providers>
      </body>
    </html>
  )
}
