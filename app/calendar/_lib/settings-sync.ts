import { useEffect } from 'react';
import { useSettingsStore } from './settings-store';
import { toast } from 'sonner';

export const useSettingsSync = () => {
  const { settings, setSettings, isInitialized, setInitialized } = useSettingsStore();

  // Initial fetch of settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/calendar/settings');
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setSettings(data);
          }
          setInitialized(true);
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      }
    };

    if (!isInitialized) {
      fetchSettings();
    }
  }, [setInitialized, setSettings, isInitialized]);

  // Sync settings to server only when initialized
  const syncSettings = async () => {
    if (!isInitialized) return;

    try {
      const response = await fetch('/api/calendar/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error('Failed to sync settings');
      }
    } catch (error) {
      console.error('Failed to sync settings:', error);
      // Only show error toast if it's not the initial sync
      if (isInitialized) {
        toast.error('Failed to save settings');
      }
      throw error;
    }
  };

  return { syncSettings, isInitialized };
}; 