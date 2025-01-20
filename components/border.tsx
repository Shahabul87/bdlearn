interface GradientDividerProps {
  className?: string;
}

export const GradientDivider = ({ className }: GradientDividerProps) => {
  return (
    <div className={`h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent ${className}`} />
  );
};