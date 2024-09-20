import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SidebarDemo } from "@/components/ui/sidebar-demo";

import { getAnalytics } from "@/actions/get-analytics";

import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";

const AnalyticsPage = async () => {
    const user = await currentUser();

    if(!user?.id){
        return redirect("/");
    }
    
    const userId = user?.id;

  const {
    data,
    totalRevenue,
    totalSales,
  } = await getAnalytics(userId);

  return ( 
    <SidebarDemo>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard
          label="Total Revenue"
          value={totalRevenue}
          shouldFormat
        />
        <DataCard
          label="Total Sales"
          value={totalSales}
        />
      </div>
      <Chart
        data={data}
      />
    </SidebarDemo>
   );
}
 
export default AnalyticsPage;