import { create } from 'zustand'

function scheduleReminder(time: string): void {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return
  navigator.serviceWorker.ready
    .then((reg) => {
      reg.active?.postMessage({ type: 'set-reminder', time })
    })
    .catch(() => {})
}

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
    scheduleReminder(time);
  },
}));

scheduleReminder(initialTime);
