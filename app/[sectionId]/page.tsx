import { Metadata } from "next";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface SectionPageProps {
  params: {
    sectionId: string;
  };
}

export async function generateMetadata({
  params
}: SectionPageProps): Promise<Metadata> {
  const section = await db.section.findUnique({
    where: {
      id: params.sectionId
    }
  });

  if (!section) {
    return {
      title: "Not Found",
      description: "The page you're looking for doesn't exist."
    };
  }

  return {
    title: section.title,
    description: `Section: ${section.title}`
  };
}

export async function generateStaticParams() {
  const sections = await db.section.findMany({
    select: {
      id: true
    }
  });

  return sections.map((section) => ({
    sectionId: section.id
  }));
}

export default async function SectionPage({
  params
}: SectionPageProps) {
  const section = await db.section.findUnique({
    where: {
      id: params.sectionId
    },
    include: {
      chapter: {
        include: {
          course: true
        }
      }
    }
  });

  if (!section) {
    notFound();
  }

  return (
    <div>
      {/* Your section content components here */}
    </div>
  );
}
