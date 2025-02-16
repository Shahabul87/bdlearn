import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ExplanationSubmitButtonProps {
  isSubmitting: boolean;
  isValid: boolean;
}

export const ExplanationSubmitButton = ({ isSubmitting, isValid }: ExplanationSubmitButtonProps) => {
  return (
    <Button
      disabled={!isValid || isSubmitting}
      type="submit"
      className={cn(
        "w-full",
        (!isValid || isSubmitting) && "opacity-50 cursor-not-allowed"
      )}
    >
      {isSubmitting ? (
        <div className="flex items-center gap-x-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="h-4 w-4" />
          </motion.div>
          <span>Adding...</span>
        </div>
      ) : (
        "Add explanation"
      )}
    </Button>
  );
}; 