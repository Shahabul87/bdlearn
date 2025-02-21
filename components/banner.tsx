"use client";

import { AlertTriangle, CheckCircleIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const bannerVariants = cva(
  "relative overflow-hidden border backdrop-blur-sm p-3 sm:p-4 flex items-center gap-x-2 sm:gap-x-3 rounded-lg sm:rounded-xl transition-all duration-300",
  {
    variants: {
      variant: {
        warning: [
          "bg-amber-50/50 dark:bg-amber-500/5",
          "border-amber-200/50 dark:border-amber-500/20",
          "text-amber-700 dark:text-amber-300",
          "hover:bg-amber-50/80 dark:hover:bg-amber-500/10"
        ].join(" "),
        success: [
          "bg-emerald-50/50 dark:bg-emerald-500/5",
          "border-emerald-200/50 dark:border-emerald-500/20",
          "text-emerald-700 dark:text-emerald-300",
          "hover:bg-emerald-50/80 dark:hover:bg-emerald-500/10"
        ].join(" "),
      }
    },
    defaultVariants: {
      variant: "warning",
    }
  }
);

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
};

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
};

interface BannerContentProps {
  children: React.ReactNode;
  className?: string;
}

const BannerContent = ({ children, className }: BannerContentProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const Banner = ({
  label,
  variant,
}: BannerProps) => {
  const Icon = iconMap[variant || "warning"];

  return (
    <BannerContent className={cn(bannerVariants({ variant }))}>
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 dark:via-white/2 to-transparent animate-shimmer" />
      
      {/* Animated glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className={cn(
        "relative p-1.5 sm:p-2 rounded-full transition-all duration-200 group",
        variant === "warning" ? [
          "bg-amber-100/80 dark:bg-amber-500/10",
          "ring-1 ring-amber-200/50 dark:ring-amber-500/20",
          "group-hover:ring-amber-300/50 dark:group-hover:ring-amber-500/30"
        ].join(" ") : [
          "bg-emerald-100/80 dark:bg-emerald-500/10",
          "ring-1 ring-emerald-200/50 dark:ring-emerald-500/20",
          "group-hover:ring-emerald-300/50 dark:group-hover:ring-emerald-500/30"
        ].join(" ")
      )}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon className={cn(
            "h-4 w-4 sm:h-5 sm:w-5 transition-colors duration-200",
            variant === "warning" ? [
              "text-amber-600 dark:text-amber-400",
              "group-hover:text-amber-700 dark:group-hover:text-amber-300"
            ].join(" ") : [
              "text-emerald-600 dark:text-emerald-400",
              "group-hover:text-emerald-700 dark:group-hover:text-emerald-300"
            ].join(" ")
          )} />
        </motion.div>
      </div>
      
      <div className="flex-1 relative">
        <p className={cn(
          "text-xs sm:text-sm font-medium tracking-wide transition-colors duration-200",
          variant === "warning" ? [
            "text-amber-800 dark:text-amber-300",
            "group-hover:text-amber-900 dark:group-hover:text-amber-200"
          ].join(" ") : [
            "text-emerald-800 dark:text-emerald-300",
            "group-hover:text-emerald-900 dark:group-hover:text-emerald-200"
          ].join(" ")
        )}>
          {label}
        </p>
        
        {/* Subtle text shadow for better readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/5 dark:from-black/10 to-transparent opacity-50 blur-sm" />
      </div>
    </BannerContent>
  );
};