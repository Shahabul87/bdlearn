
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { DataTable } from "./post-data-table";
import { columns } from "./post-column";


export const PostDashboard = async() => {


    const user = await currentUser();

    if(!user?.id){
        return redirect("/");
    }
    
    const userId = user?.id;

    const posts = await db.post.findMany({
      where: {
          userId,
      },
      orderBy: {
          createdAt: "desc",
      },
  });




  
   
    return (
      
        <div>
           <DataTable columns={columns} data={posts} />
        </div>
    );
  };
