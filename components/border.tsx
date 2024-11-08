

interface GradientDividerProps {
    padding?: string; // Optional padding prop
  }
  
  export const GradientDivider: React.FC<GradientDividerProps> = ({ padding = 'p-8' }) => {
    return (
      <div className={`border-t border-gray-700 ${padding} [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]`}></div>
    );
  };