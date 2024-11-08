

type Props = {
    children: React.ReactNode;
  };
  
  const MainLayout = ({
    children,
  }: Props) => {
    return (
      <div className="px-6">
        {children}
      </div>
    );
  };
  
  export default MainLayout;
  