"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { ExplanationForm } from "../../_components/_explanations/components/explanation-form";

interface ExplanationEditPageProps {
  params: {
    courseId: string;
    chapterId: string;
    sectionId: string;
    explanationId: string;
  };
}

const formSchema = z.object({
  heading: z.string().min(1),
  code: z.string().optional(),
  explanation: z.string().optional(),
});

const ExplanationEditPage = ({ params }: ExplanationEditPageProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [explanationData, setExplanationData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchExplanation = async () => {
      try {
        const response = await axios.get(`/api/courses/${params.courseId}/chapters/${params.chapterId}/sections/${params.sectionId}/explanations/${params.explanationId}`);
        setExplanationData(response.data);
      } catch (error) {
        toast.error("Failed to load explanation");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExplanation();
  }, [params.courseId, params.chapterId, params.sectionId, params.explanationId]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      await axios.patch(
        `/api/courses/${params.courseId}/chapters/${params.chapterId}/sections/${params.sectionId}/explanations/${params.explanationId}`,
        values
      );
      toast.success("Explanation updated");
      router.push(`/teacher/courses/${params.courseId}/chapters/${params.chapterId}/section/${params.sectionId}`);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-5xl lg:max-w-7xl xl:max-w-8xl mx-auto p-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Edit Explanation</h1>
        <ExplanationForm 
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          initialData={explanationData}
        />
      </div>
    </div>
  );
};

export default ExplanationEditPage; 