"use client";

import { AlertTriangle, CheckCircleIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const bannerVariants = cva(
  "relative overflow-hidden border backdrop-blur-sm p-4 flex items-center gap-x-3 rounded-xl transition-all duration-300",
  {
    variants: {
      variant: {
        warning: "bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-500/5 border-amber-500/20 text-amber-300 hover:bg-amber-500/15",
        success: "bg-gradient-to-r from-emerald-500/5 via-emerald-500/10 to-emerald-500/5 border-emerald-500/20 text-emerald-300 hover:bg-emerald-500/15",
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

const BannerContent = ({ children, className }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
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
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
      
      {/* Animated glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className={cn(
        "relative p-2 rounded-full transition-all duration-200 group",
        variant === "warning" 
          ? "bg-gradient-to-br from-amber-500/10 to-amber-600/10 ring-1 ring-amber-500/20 group-hover:ring-amber-500/30" 
          : "bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 ring-1 ring-emerald-500/20 group-hover:ring-emerald-500/30"
      )}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon className={cn(
            "h-5 w-5 transition-colors duration-200",
            variant === "warning"
              ? "text-amber-400 group-hover:text-amber-300"
              : "text-emerald-400 group-hover:text-emerald-300"
          )} />
        </motion.div>
      </div>
      
      <div className="flex-1 relative">
        <p className={cn(
          "text-sm font-medium tracking-wide transition-colors duration-200",
          variant === "warning"
            ? "text-amber-300 group-hover:text-amber-200"
            : "text-emerald-300 group-hover:text-emerald-200"
        )}>
          {label}
        </p>
        
        {/* Subtle text shadow for better readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent opacity-50 blur-sm" />
      </div>
    </BannerContent>
  );
};