import { create } from 'zustand';
import { format, subDays, startOfDay } from 'date-fns';

export interface MoodEntry {
  timestamp: number;
  mood: number;
  energy: number;
  sleep: number;
  light: number;
  notes: string;
  coords?: { latitude: number; longitude: number };
  sunrise?: string;
  sunset?: string;
  weather?: string;
}

interface MoodState {
  entries: MoodEntry[];
  addEntry: (
    data: Omit<MoodEntry, 'timestamp' | 'coords' | 'sunrise' | 'sunset' | 'weather'>,
  ) => Promise<void>;
  getEntries: () => MoodEntry[];
  getStreak: () => number;
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

        try {
          const res = await fetch(
            `https://api.sunrise-sunset.org/json?lat=${coords.latitude}&lng=${coords.longitude}&formatted=0`,
          );
          const json = await res.json();
          if (json.status === 'OK') {
            entry.sunrise = json.results.sunrise;
            entry.sunset = json.results.sunset;
          }
        } catch {
          // ignore fetch errors
        }

        try {
          const wRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true`,
          );
          const wJson = await wRes.json();
          const code = wJson?.current_weather?.weathercode as number | undefined;
          if (typeof code === 'number') {
            if (code === 0) entry.weather = 'clear';
            else if (code >= 1 && code <= 3) entry.weather = 'cloudy';
            else if (
              (code >= 51 && code <= 67) ||
              (code >= 80 && code <= 82) ||
              code === 61 ||
              code === 63 ||
              code === 65 ||
              (code >= 95 && code <= 99)
            )
              entry.weather = 'rain';
            else if (
              (code >= 71 && code <= 77) ||
              code === 85 ||
              code === 86
            )
              entry.weather = 'snow';
            else entry.weather = 'other';
          }
        } catch {
          // ignore weather fetch errors
        }
      } catch {
        // ignore geolocation errors
      }
    }

    const updated = [...get().entries, entry];
    localStorage.setItem('moodEntries', JSON.stringify(updated));
    set({ entries: updated });
  },
  getEntries: () => get().entries,
  getStreak: () => {
    const entryDates = new Set(
      get()
        .entries
        .map((e) => format(e.timestamp, 'yyyy-MM-dd')),
    );

    let streak = 0;
    let day = startOfDay(new Date());

    while (entryDates.has(format(day, 'yyyy-MM-dd'))) {
      streak += 1;
      day = subDays(day, 1);
    }

    return streak;
  },
}));
