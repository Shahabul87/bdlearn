import { currentUser } from "@/lib/auth";
import { Header } from "@/app/(homepage)/header";
import { HeaderAfterLogin } from "@/app/(homepage)/header-after-login";
import { ThemeProvider } from "@/app/providers/theme-provider";

export default async function CourseLearnLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-200">
        {/* <div className="h-16 border-b border-gray-100 dark:border-gray-800">
          {user ? <HeaderAfterLogin user={user} /> : <Header />}
        </div> */}
        <main className="flex-1 text-gray-900 dark:text-gray-100">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
} 