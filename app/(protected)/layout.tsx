import { Navbar } from "./_components/navbar";
import "@uploadthing/react/styles.css"

import { Sidebar } from "../(dashboard)/_components/sidebar";


interface ProtectedLayoutProps {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return ( 
  
    <div className = "h-full">
          <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
            <Navbar />
          </div>

          <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
           <Sidebar />
          </div>
          <main className = "md:pl-56 h-full pt-[80px]">             
              <div className="h-full">
                  {children}
              </div>
          </main> 
    </div> 
    
)}
 
export default ProtectedLayout;