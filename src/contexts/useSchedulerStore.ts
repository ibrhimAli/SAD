import { create } from 'zustand';

interface SchedulerState {
  times: string[];
  addTime: (time: string) => void;
  removeTime: (time: string) => void;
}

const stored = localStorage.getItem('scheduledTimes');
const initialTimes: string[] = stored ? JSON.parse(stored) : [];

export const useSchedulerStore = create<SchedulerState>((set, get) => ({
  times: initialTimes,
  addTime: (time) => {
    const updated = Array.from(new Set([...get().times, time])).sort();
    localStorage.setItem('scheduledTimes', JSON.stringify(updated));
    set({ times: updated });
  },
  removeTime: (time) => {
    const updated = get().times.filter((t) => t !== time);
    localStorage.setItem('scheduledTimes', JSON.stringify(updated));
    set({ times: updated });
  },
}));
