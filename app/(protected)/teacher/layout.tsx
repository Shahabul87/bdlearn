

type Props = {
    children: React.ReactNode;
  };
  
  const MainLayout = ({
    children,
  }: Props) => {
    return (
      <div className="">
        {children}
      </div>
    );
  };
  
  export default MainLayout;
  