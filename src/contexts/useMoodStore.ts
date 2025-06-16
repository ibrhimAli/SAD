import { create } from 'zustand';

export interface MoodEntry {
  timestamp: number;
  mood: number;
  energy: number;
  sleep: number;
  light: number;
  notes: string;
  coords?: { latitude: number; longitude: number };
}

interface MoodState {
  entries: MoodEntry[];
  addEntry: (data: Omit<MoodEntry, 'timestamp' | 'coords'>) => Promise<void>;
  getEntries: () => MoodEntry[];
}

const stored = localStorage.getItem('moodEntries');
const initialEntries: MoodEntry[] = stored ? JSON.parse(stored) : [];

export const useMoodStore = create<MoodState>((set, get) => ({
  entries: initialEntries,
  addEntry: async (data) => {
    const entry: MoodEntry = { timestamp: Date.now(), ...data };

    if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
      try {
        const coords = await new Promise<GeolocationCoordinates>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => resolve(pos.coords),
            () => reject(new Error('geolocation failed'))
          );
        });
        entry.coords = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };
      } catch {
        // ignore geolocation errors
      }
    }

    const updated = [...get().entries, entry];
    localStorage.setItem('moodEntries', JSON.stringify(updated));
    set({ entries: updated });
  },
  getEntries: () => get().entries,
}));
