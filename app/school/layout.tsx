import React from "react";
import { currentUser } from "@/lib/auth";
import ConditionalHeader from "@/app/(homepage)/user-header";
import { ClientThemeProvider } from "./components/client-theme-provider";
import { LanguageProvider } from "./components/language-provider";
import { NavigationSidebar } from "./components/navigation-sidebar";
import { Footer } from "./components/footer";
import { LanguageText } from "./components/language-provider";

interface SchoolLayoutProps {
  children: React.ReactNode;
}

export default async function SchoolLayout({ children }: SchoolLayoutProps) {
  const user = await currentUser();

  // Education levels (with string icons for the client component to resolve)
  const educationLevels = [
    {
      id: "primary",
      nameBn: "প্রাথমিক শিক্ষা",
      nameEn: "Primary Education",
      icon: "School2",
      path: "/school/primary",
      description: {
        bn: "১ম থেকে ৫ম শ্রেণি",
        en: "Class 1 to 5"
      },
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/40"
    },
    {
      id: "junior",
      nameBn: "নিম্ন মাধ্যমিক শিক্ষা",
      nameEn: "Junior Secondary",
      icon: "School",
      path: "/school/junior",
      description: {
        bn: "৬ষ্ঠ থেকে ৮ম শ্রেণি",
        en: "Class 6 to 8"
      },
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/40"
    },
    {
      id: "secondary",
      nameBn: "মাধ্যমিক শিক্ষা",
      nameEn: "Secondary Education",
      icon: "BookText",
      path: "/school/secondary",
      description: {
        bn: "৯ম থেকে ১০ম শ্রেণি",
        en: "Class 9 to 10"
      },
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/40"
    },
    {
      id: "higher-secondary",
      nameBn: "উচ্চ মাধ্যমিক শিক্ষা",
      nameEn: "Higher Secondary",
      icon: "GraduationCap",
      path: "/school/higher-secondary",
      description: {
        bn: "১১শ থেকে ১২শ শ্রেণি",
        en: "Class 11 to 12"
      },
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-100 dark:bg-red-900/40"
    },
    {
      id: "vocational",
      nameBn: "কারিগরি শিক্ষা",
      nameEn: "Vocational Education",
      icon: "BrainCircuit",
      path: "/school/vocational",
      description: {
        bn: "এসএসসি ও এইচএসসি (ভোকেশনাল)",
        en: "SSC and HSC (Vocational)"
      },
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-900/40"
    },
    {
      id: "madrasa",
      nameBn: "মাদ্রাসা শিক্ষা",
      nameEn: "Madrasa Education",
      icon: "Landmark",
      path: "/school/madrasa",
      description: {
        bn: "ইবতেদায়ী থেকে কামিল",
        en: "Ebtedayee to Kamil"
      },
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/40"
    }
  ];

  // Quick links
  const quickLinks = [
    {
      nameBn: "শিক্ষা নির্দেশিকা",
      nameEn: "Education Guidelines",
      icon: "ClipboardList",
      path: "/school/guidelines"
    },
    {
      nameBn: "জাতীয় শিক্ষাক্রম",
      nameEn: "National Curriculum",
      icon: "History",
      path: "/school/curriculum"
    },
    {
      nameBn: "পরীক্ষা সূচি",
      nameEn: "Exam Schedule",
      icon: "Bookmark",
      path: "/school/exams"
    }
  ];

  return (
    <ClientThemeProvider>
      <LanguageProvider defaultLanguage="bn">
        {/* Use ConditionalHeader at the top level */}
        <ConditionalHeader user={user} />
        
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
          {/* Main content area */}
          <div className="w-[calc(100%-10px)] max-w-[98rem] mx-auto px-2 sm:px-3 md:px-5 py-6">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                <LanguageText bn="বাংলাদেশ স্কুল শিক্ষা" en="Bangladesh School Education" />
              </h1>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
                <LanguageText 
                  bn="বাংলাদেশের জাতীয় শিক্ষাক্রম অনুযায়ী সকল স্তরের শিক্ষার জন্য সম্পূর্ণ শিখন সামগ্রী এবং সহায়তা।"
                  en="Complete learning materials and support for all levels of education according to Bangladesh's national curriculum."
                />
              </p>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-5">
              {/* Sidebar - client component with server-provided data */}
              <div className="lg:w-1/4 xl:w-1/5">
                <NavigationSidebar 
                  educationLevels={educationLevels}
                  quickLinks={quickLinks}
                />
              </div>

              {/* Main content */}
              <div className="flex-1 w-full">
                {children}
              </div>
            </div>
          </div>
          
          {/* Footer - client component */}
          <Footer />
        </div>
      </LanguageProvider>
    </ClientThemeProvider>
  );
} 