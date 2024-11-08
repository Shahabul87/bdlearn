"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import {toast} from "sonner";
import { useRouter } from "next/navigation";
import { Post } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TitleFormProps {
  initialData: Post;
  postId: string;
};

const formSchema = z.object({
  category: z.string().min(1, {
    message: "Category is required",
  }),
});

export const PostCategory = ({
  initialData,
  postId
}: TitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: initialData.category || "", // Set an empty string if category is null I found error here 
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log("Submitting values:", values);
    // console.log("Post ID:", postId);
  
    try {
      await axios.patch(`/api/posts/${postId}`, values);
      toast.success("Post updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border border-[#94a3b8] bg-gray-700 rounded-md p-4">
      <div className="font-medium flex items-center justify-between text-white/90">
        Post Category
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
        <p className="text-sm mt-2 text-cyan-400 font-semibold">
          {initialData.category}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Write Post Category Here'"
                      className="text-cyan-400 font-semibold bg-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}