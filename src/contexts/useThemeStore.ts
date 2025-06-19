import { create } from 'zustand';

interface ThemeState {
  dark: boolean;
  season: string;
  notificationFrequency: number;
  toggle: () => void;
  setSeason: (season: string) => void;
  setNotificationFrequency: (frequency: number) => void;
}

const initialDark = localStorage.getItem('themeDark') === 'true';
const initialSeason = localStorage.getItem('seasonPreference') || 'Spring';
const initialFrequency = parseInt(
  localStorage.getItem('notificationFrequency') || '1',
  10
);

export const useThemeStore = create<ThemeState>((set) => ({
  dark: initialDark,
  season: initialSeason,
  notificationFrequency: initialFrequency,
  toggle: () =>
    set((state) => {
      const value = !state.dark;
      localStorage.setItem('themeDark', String(value));
      return { dark: value };
    }),
  setSeason: (season) => {
    localStorage.setItem('seasonPreference', season);
    set({ season });
  },
  setNotificationFrequency: (frequency) => {
    localStorage.setItem('notificationFrequency', String(frequency));
    set({ notificationFrequency: frequency });
  },
}));
