"use client";

import { useEffect } from "react";
import { CalendarContainer } from "./calendar-container";
import { SearchHandler } from "./search-handler";
import { SettingsPanel } from "./settings-panel";
import { useSettingsSync } from "../_lib/settings-sync";
import { useSettingsStore } from "../_lib/settings-store";
import { useSearchParams } from "next/navigation";
import { handleCalendarError } from "../_lib/error-handler";

interface CalendarLayoutProps {
  userId: string;
}

export const CalendarLayout = ({ userId }: CalendarLayoutProps) => {
  const searchParams = useSearchParams();
  const { settings } = useSettingsStore();
  const { syncSettings, isInitialized } = useSettingsSync();

  // Only sync settings when initialized
  useEffect(() => {
    if (isInitialized) {
      syncSettings().catch((error) => {
        handleCalendarError(error, { 
          silent: !isInitialized // Only show error if it's not the initial sync
        });
      });
    }
  }, [isInitialized, settings]);

  // Get filters from URL
  const filters = {
    categories: searchParams.get("categories")?.split(",") || [],
    status: searchParams.get("status")?.split(",") || [],
    dateRange: {
      start: searchParams.get("dateRangeStart") ? new Date(searchParams.get("dateRangeStart")!) : null,
      end: searchParams.get("dateRangeEnd") ? new Date(searchParams.get("dateRangeEnd")!) : null,
    },
    searchQuery: searchParams.get("query") || "",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SearchHandler />
        <SettingsPanel />
      </div>

      <CalendarContainer
        userId={userId}
        filters={filters}
        settings={settings}
      />
    </div>
  );
}; 