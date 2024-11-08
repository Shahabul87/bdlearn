// "use client";

// import * as z from "zod";
// import axios from "axios";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { toast } from "sonner";
// import { SidebarDemo } from "@/components/ui/sidebar-demo";

// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormLabel,
//   FormMessage,
//   FormItem,
// } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// const formSchema = z.object({
//   title: z.string().min(1, {
//     message: "Title is required",
//   }),
// });

// const CreatePage = () => {
//   const router = useRouter();
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: ""
//     },
//   });

//   const { isSubmitting, isValid } = form.formState;

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//    console.log(values)
//     try {
//       const response = await axios.post("/api/courses", values);
//       router.push(`/teacher/courses/${response.data.id}`);
//       toast.success("Course created");
//     } catch {
//       toast.error("Something went wrong");
//     }
//   }

//   return ( 
//     <SidebarDemo>
//     <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
//       <div>
//         <h1 className="text-2xl">
//           Name your course
//         </h1>
//         <p className="text-sm text-slate-600">
//           What would you like to name your course? Don&apos;t worry, you can change this later.
//         </p>
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="space-y-8 mt-8"
//           >
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>
//                     Course title
//                   </FormLabel>
//                   <FormControl>
//                     <Input
//                       disabled={isSubmitting}
//                       placeholder="e.g. 'Advanced web development'"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormDescription>
//                     What will you teach in this course?
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <div className="flex items-center gap-x-2">
//               <Link href="/">
//                 <Button
//                   type="button"
//                   variant="ghost"
//                 >
//                   Cancel
//                 </Button>
//               </Link>
//               <Button
//                 type="submit"
//                 disabled={!isValid || isSubmitting}
//               >
//                 Continue
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </div>
//     </div>
//     </SidebarDemo>
//    );
// }
 
// export default CreatePage;

import { SidebarDemo } from "@/components/ui/sidebar-demo"
import { Header } from "@/app/(homepage)/header"
import { HeaderAfterLogin } from "@/app/(homepage)/header-after-login"
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CreateNewCoursePage } from "./create-course";




const CourseCreationPage = async() => {

    const user = await currentUser();

    if(!user?.id){
        return redirect("/");
    }
    
    const userId = user?.id;

    return (
        <>
        {!user? (
                 <>
                    <div className="">
                       <Header />
                    </div>
               </> ):
               (
                <>
                <HeaderAfterLogin />
                </>
               )}  
        <SidebarDemo>
            <div>
             <CreateNewCoursePage />
            </div>
         </SidebarDemo>
        </>
    )
}

export default CourseCreationPage
