import { create } from 'zustand';

export interface ScheduledMoment {
  time: string;
  label: string;
}

interface SchedulerState {
  times: ScheduledMoment[];
  addTime: (time: string, label: string) => void;
  removeTime: (time: string) => void;
}

const stored = localStorage.getItem('scheduledTimes');
const initialTimes: ScheduledMoment[] = stored ? JSON.parse(stored) : [];

export const useSchedulerStore = create<SchedulerState>((set, get) => ({
  times: initialTimes,
  addTime: (time, label) => {
    const existing = get().times;
    const updated = existing.some((t) => t.time === time)
      ? existing.map((t) => (t.time === time ? { time, label } : t))
      : [...existing, { time, label }];
    const sorted = updated.sort((a, b) => a.time.localeCompare(b.time));
    localStorage.setItem('scheduledTimes', JSON.stringify(sorted));
    set({ times: sorted });
  },
  removeTime: (time) => {
    const updated = get().times.filter((t) => t.time !== time);
    localStorage.setItem('scheduledTimes', JSON.stringify(updated));
    set({ times: updated });
  },
}));
