


interface Props {
    children:React.ReactNode
}

const MainLayout = ({children}:Props) =>{
    return (
        <>
         <main className ="h-full">
            <div className="h-full">
                {children}
            </div>
         </main>
        </>
    )
}

export default MainLayout