import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | SkillHub",
  description: "Learn about our mission to transform education through innovative teaching methods and practical skill development. With 12 years of teaching experience, we're dedicated to making learning accessible and effective.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  keywords: [
    "education",
    "teaching experience",
    "skill development",
    "online learning",
    "practical skills",
    "innovative teaching"
  ],
  openGraph: {
    title: "About Me",
    description: "Discover our journey in transforming education through innovative teaching methods and practical skill development.",
    images: [
      {
        url: "/about-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SkillHub About Page"
      }
    ],
    type: "website",
    locale: "en_US",
    siteName: "SkillHub"
  },
  twitter: {
    card: "summary_large_image",
    title: "About Me | SkillHub",
    description: "Discover our journey in transforming education through innovative teaching methods.",
    images: ["/about-og-image.jpg"],
  }
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 