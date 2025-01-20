"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

interface EnrollButtonProps {
  courseId: string;
  price: number;
  userId?: string;
}

export const EnrollButton = ({ courseId, price, userId }: EnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleEnroll = async () => {
    try {
      if (!userId) {
        router.push("/auth/login");
        return;
      }

      setIsLoading(true);
      
      if (price === 0) {
        console.log("Attempting free course enrollment...");
        const response = await axios.post(`/api/courses/${courseId}/enroll`);
        console.log("Enrollment response:", response.data);
        
        toast.success("Successfully enrolled in the course!");
        router.refresh(); // Refresh the page data
        router.push(`/courses/${courseId}/learn`);
      } else {
        console.log("Initiating paid course checkout...");
        const response = await axios.post(`/api/courses/${courseId}/checkout`);
        console.log("Checkout response:", response.data);
        
        if (response.data.url) {
          window.location.href = response.data.url;
        } else {
          throw new Error("No checkout URL received");
        }
      }
    } catch (error: any) {
      console.error("Enrollment error:", error);
      toast.error(error.response?.data || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.button
      onClick={handleEnroll}
      disabled={isLoading}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        px-8 py-4 rounded-full font-semibold text-lg
        ${price === 0 
          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white" 
          : "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
        }
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-lg hover:shadow-xl transition-all duration-300
      `}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          Processing...
        </div>
      ) : (
        <span>
          {price === 0 ? "Enroll Now - Free!" : `Enroll Now - $${price}`}
        </span>
      )}
    </motion.button>
  );
}; 