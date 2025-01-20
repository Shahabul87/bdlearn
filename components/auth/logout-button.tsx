"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";

interface LogoutButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export const LogoutButton = ({
  children,
  className
}: LogoutButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      await signOut({
        redirect: true,
        callbackUrl: "/"
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <span 
      onClick={onClick} 
      className={`flex cursor-pointer hover:text-cyan-500 ${className}`}
      style={{ opacity: isLoading ? 0.7 : 1 }}
    >
      {children}
    </span>
  );
};