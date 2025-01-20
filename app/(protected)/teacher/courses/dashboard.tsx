import { DataTable } from "./_components/data-table";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { columns } from "./_components/column";


export const Dashboard = async() => {


    const user = await currentUser();

    if(!user?.id){
        return redirect("/");
    }
    
    const userId = user?.id;

    const courses = await db.course.findMany({
        where: {
        userId,
        },
        select: {
        id: true,
        title: true,
        category: {
            select: {
            name: true
            }
        },
        price: true,
        isPublished: true,
        createdAt: true,
        },
        orderBy: {
        createdAt: "desc",
        },
    });
   
    return (
      
        <div className="mt-20 p-6 px-10">
           <DataTable columns={columns} data={courses} />
        </div>
    );
  };