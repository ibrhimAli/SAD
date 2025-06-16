import { create } from 'zustand';

interface CheckInState {
  lastPrompt: number;
  setLastPrompt: (val: number) => void;
}

const initialTimestamp = parseInt(
  localStorage.getItem('lastCheckInPrompt') || '0',
  10
);

export const useCheckInStore = create<CheckInState>((set) => ({
  lastPrompt: initialTimestamp,
  setLastPrompt: (val) => {
    localStorage.setItem('lastCheckInPrompt', String(val));
    set({ lastPrompt: val });
  },
}));
