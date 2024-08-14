


interface HomeLayoutProps {
    children: React.ReactNode;
  };
  
  const HomeLayout = ({ children }: HomeLayoutProps) => {
    return ( 
    
      <div className = "h-full">
          
            <main className = "">             
               {children}
            </main> 
          
      </div> 
     );
  }
   
  export default HomeLayout;