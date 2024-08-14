import { MobileHeaderLearn } from "./mobile-header"
import { SidebarLearn } from "./sidebar"


interface Props {
    children:React.ReactNode
}

const MainLayout = ({children}:Props) =>{
    return (
        <>
        <MobileHeaderLearn />
        <SidebarLearn className="hidden lg:flex"/>
         <main className ="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
            <div className="bg-blue-500 h-full">
                {children}
            </div>
         </main>
        </>
    )
}

export default MainLayout




