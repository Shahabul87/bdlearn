"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { DisplayExplanations } from "../_components/_explanations/components/display-explanations";

interface ExplanationActionsProps {
  courseId: string;
  chapterId: string;
  sectionId: string;
  codeExplanations: {
    id: string;
    heading: string | null;
    code: string | null;
    explanation: string | null;
  }[];
}

export const ExplanationActions = ({
  courseId,
  chapterId,
  sectionId,
  codeExplanations
}: ExplanationActionsProps) => {
  const router = useRouter();

  const onCreate = () => {
    router.push(`/teacher/courses/${courseId}/chapters/${chapterId}/section/${sectionId}/explanations/create`);
  };

  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${chapterId}/section/${sectionId}/explanations/${id}`);
  };

  const onDelete = async (id: string) => {
    try {
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}/sections/${sectionId}/explanations/${id}`);
      router.refresh();
    } catch (error) {
      throw error;
    }
  };

  return (
    <DisplayExplanations 
      items={codeExplanations}
      onCreateClick={onCreate}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}; 