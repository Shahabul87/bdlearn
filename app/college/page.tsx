import { Metadata } from "next";
import HeroSection from "./_components/hero-section";
import TestimonialSection from "./_components/testimonial-section";
import CollegeStats from "./_components/college-stats";
import NewsSection from "./_components/news-section";
import TeacherShowcase from "./_components/teacher-showcase";

export const metadata: Metadata = {
  title: "কলেজ শিক্ষা | বাণী - বাংলাদেশী শিক্ষার্থীদের জন্য",
  description: "বাংলাদেশের কলেজ শিক্ষার্থীদের জন্য আধুনিক ও সমৃদ্ধ অনলাইন শিক্ষা প্লাটফর্ম",
};

export default function CollegePage() {
  return (
    <>
      <HeroSection />
      <CollegeStats />
      <TeacherShowcase />
      <TestimonialSection />
      <NewsSection />
    </>
  );
} 