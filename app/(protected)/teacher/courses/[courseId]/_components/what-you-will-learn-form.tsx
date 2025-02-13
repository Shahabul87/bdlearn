"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { Pencil, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface WhatYouWillLearnFormProps {
  initialData: {
    whatYouWillLearn: string[];
  };
  courseId: string;
}

type LearningObjective = {
  value: string;
};

type FormValues = {
  whatYouWillLearn: LearningObjective[];
};

const formSchema = z.object({
  whatYouWillLearn: z.array(
    z.object({
      value: z.string().min(1, "Learning objective is required"),
    })
  ).optional(),
});

export const WhatYouWillLearnForm = ({
  initialData,
  courseId,
}: WhatYouWillLearnFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Convert the initial string array to an array of objects
      whatYouWillLearn: initialData.whatYouWillLearn?.map((obj) => ({
        value: obj,
      })) || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "whatYouWillLearn",
  });

  const { isSubmitting, isValid, isDirty } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const payload = {
        whatYouWillLearn: values.whatYouWillLearn?.map((obj) => obj.value) || []
      };
      await axios.patch(`/api/courses/${courseId}/what-you-will-learn`, payload);
      toast.success("Course learning objectives updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const toggleEdit = () => setIsEditing((current) => !current);

  return (
    <div className="mt-6 border border-gray-200 dark:border-gray-700 bg-slate-100 dark:bg-gray-800/50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between text-gray-900 dark:text-gray-100">
       What You Will Learn
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit 
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div
          className={cn(
            "text-sm mt-2 text-gray-600 dark:text-gray-300 space-y-3",
            !initialData.whatYouWillLearn?.length && "text-slate-500 dark:text-gray-400 italic"
          )}
        >
          {!initialData.whatYouWillLearn?.length && "No learning objectives"}
          {initialData.whatYouWillLearn?.map((item, index) => (
            <div key={index} className="flex items-center gap-x-3">
              <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full bg-slate-700 dark:bg-slate-600 text-white text-xs">
                {index + 1}
              </div>
              <span className="flex-1">{item}</span>
            </div>
          ))}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4 w-full">
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`whatYouWillLearn.${index}.value`}
                render={({ field }) => (
                  <FormItem className="w-full sm:w-[400px] md:w-[600px] lg:w-[800px]">
                    <FormControl>
                      <div className="flex items-center gap-x-2 w-full">
                        <Input
                          disabled={isSubmitting}
                          placeholder={`Learning objective ${index + 1}`}
                          className="flex-1 min-w-0 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                          {...field}
                        />
                        <Button
                          type="button"
                          onClick={() => remove(index)}
                          variant="ghost"
                          size="sm"
                          className="flex-shrink-0 hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="mt-2 hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => append({ value: "" })}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add objective
            </Button>
            <div className="flex items-center gap-x-2">
              <Button 
                disabled={(!isDirty && !isValid) || isSubmitting}
                type="submit"
                className="bg-slate-700 dark:bg-slate-600 hover:bg-slate-800 dark:hover:bg-slate-700 text-white"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
