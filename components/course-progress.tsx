import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseProgressProps {
  value: number;
  variant?: "default" | "success";
  size?: "default" | "sm";
}

export const CourseProgress = ({
  value,
  variant,
  size = "default"
}: CourseProgressProps) => {
  return (
    <div>
      <Progress 
        className={cn(
          "h-2",
          variant === "success" && "bg-emerald-50",
        )}
        value={value}
      />
      <p className={cn(
        "font-medium mt-2",
        variant === "success" ? "text-emerald-700" : "text-sky-700"
      )}>
        {Math.round(value)}% Complete
      </p>
    </div>
  );
};