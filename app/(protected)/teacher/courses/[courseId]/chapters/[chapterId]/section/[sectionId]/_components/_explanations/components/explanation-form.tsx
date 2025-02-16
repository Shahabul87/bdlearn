import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { ExplanationFormFields } from "./explanation-form-fields";
import { ExplanationSubmitButton } from "./explanation-submit-button";
import "@/app/(protected)/teacher/courses/[courseId]/chapters/[chapterId]/section/[sectionId]/_components/_explanations/styles/editor.css";

const formSchema = z.object({
  heading: z.string().min(1, { message: "Heading is required" }),
  code: z.string().min(1, { message: "Code is required" }),
  explanation: z.string().min(1, { message: "Explanation is required" })
    .transform((str) => str.trim()) // Remove extra whitespace
    .refine((str) => str !== '<p><br></p>', { // Check if content is not empty
      message: "Explanation is required"
    }),
});

interface ExplanationFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  isSubmitting: boolean;
}

export const ExplanationForm = ({ onSubmit, isSubmitting }: ExplanationFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heading: "",
      code: "",
      explanation: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <ExplanationFormFields form={form} isSubmitting={isSubmitting} />
        <ExplanationSubmitButton isSubmitting={isSubmitting} isValid={form.formState.isValid} />
      </form>
    </Form>
  );
}; 