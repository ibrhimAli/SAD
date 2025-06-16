import { create } from 'zustand';

interface ThemeState {
  dark: boolean;
  toggle: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  dark: false,
  toggle: () => set((state) => ({ dark: !state.dark })),
}));
