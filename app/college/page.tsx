import { Metadata } from "next";
import HeroSection from "./_components/hero-section";
import TestimonialSection from "./_components/testimonial-section";
import CollegeStats from "./_components/college-stats";
import NewsSection from "./_components/news-section";
import TeacherShowcase from "./_components/teacher-showcase";
import ConditionalHeader from "../(homepage)/user-header";
import Footer from "../(homepage)/_components/footer";
import { currentUser } from '@/lib/auth';

export const metadata: Metadata = {
  title: "কলেজ শিক্ষা | বাণী - বাংলাদেশী শিক্ষার্থীদের জন্য",
  description: "বাংলাদেশের কলেজ শিক্ষার্থীদের জন্য আধুনিক ও সমৃদ্ধ অনলাইন শিক্ষা প্লাটফর্ম",
};

export default async function CollegePage() {
  const user = await currentUser();
  
  return (
    <div className="overflow-x-hidden">
      <ConditionalHeader user={user} />
      <main className="min-h-screen mt-20">
        <HeroSection />
        <CollegeStats />
        <TeacherShowcase />
        <TestimonialSection />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
} 