"use client";

import { logout } from "@/actions/logout";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  children?: React.ReactNode;
};

export const LogoutButton = ({
  children
}: LogoutButtonProps) => {
  const router = useRouter()
  const onClick = () => {
    logout();
    
  };

  return (
    <span onClick={onClick} className=" flex cursor-pointer">
      {children}
    </span>
  );
};