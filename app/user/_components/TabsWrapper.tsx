'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Tabs } from "@/components/ui/tabs";
import { useEffect, useState } from 'react';

export const TabsWrapper = ({ 
  defaultValue, 
  children, 
  className 
}: { 
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || defaultValue;
  
  return (
    <Tabs 
      value={currentTab}
      defaultValue={currentTab}
      className={className}
      onValueChange={(newValue) => {
        router.push(`/user?tab=${newValue}`, { scroll: false });
      }}
    >
      {children}
    </Tabs>
  );
}; 