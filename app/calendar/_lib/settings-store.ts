import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  settings: CalendarSettings;
  setSettings: (settings: Partial<CalendarSettings>) => void;
  resetSettings: () => void;
  isInitialized: boolean;
  setInitialized: (value: boolean) => void;
}

interface CalendarSettings {
  defaultView: 'month' | 'week' | 'day';
  firstDayOfWeek: number;
  showWeekNumbers: boolean;
  enableNotifications: boolean;
  notificationTime: number;
  timeZone: string;
  workingHours: {
    start: string;
    end: string;
  };
}

const defaultSettings: CalendarSettings = {
  defaultView: 'month',
  firstDayOfWeek: 0,
  showWeekNumbers: false,
  enableNotifications: true,
  notificationTime: 30,
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  workingHours: {
    start: '09:00',
    end: '17:00',
  },
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      isInitialized: false,
      setSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      resetSettings: () => set({ settings: defaultSettings }),
      setInitialized: (value) => set({ isInitialized: value }),
    }),
    {
      name: 'calendar-settings',
    }
  )
); 