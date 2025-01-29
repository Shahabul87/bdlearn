import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
  className?: string; // Optional className prop
};

export const HeaderComponent = ({
  label,
  className, // Accept className as a prop
}: HeaderProps) => {
  return (
    <div className={cn("w-full flex flex-col gap-y-4 items-center justify-center", className)}>
      <h1 className={cn(
        "text-3xl md:text-4xl font-semibold text-white/70",
        font.className,
      )}>
        iSham 
      </h1>
      <p className="text-muted-foreground text-md font-semibold ">
        {label}
      </p>
    </div>
  );
};
