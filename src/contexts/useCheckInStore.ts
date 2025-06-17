import { create } from 'zustand';

interface CheckInState {
  lastPrompt: number;
  reminderTime: string;
  setLastPrompt: (val: number) => void;
  setReminderTime: (time: string) => void;
}

const initialTimestamp = parseInt(
  localStorage.getItem('lastCheckInPrompt') || '0',
  10
);
const initialTime = localStorage.getItem('checkInReminderTime') || '09:00';

export const useCheckInStore = create<CheckInState>((set) => ({
  lastPrompt: initialTimestamp,
  reminderTime: initialTime,
  setLastPrompt: (val) => {
    localStorage.setItem('lastCheckInPrompt', String(val));
    set({ lastPrompt: val });
  },
  setReminderTime: (time) => {
    localStorage.setItem('checkInReminderTime', time);
    set({ reminderTime: time });
  },
}));
