import AsyncStorage from '@react-native-async-storage/async-storage';
import type { MoodEntry } from '@/constants/moods';

const STORAGE_KEY = 'moodEntries';

export async function loadMoodEntries(): Promise<MoodEntry[]> {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (!json) {
      return [];
    }
    return JSON.parse(json) as MoodEntry[];
  } catch (e) {
    console.warn('Failed to load mood entries', e);
    return [];
  }
}

export async function saveMoodEntry(entry: MoodEntry): Promise<void> {
  const entries = await loadMoodEntries();
  const index = entries.findIndex((e) => e.date === entry.date);
  if (index >= 0) {
    entries[index] = entry;
  } else {
    entries.push(entry);
  }
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (e) {
    console.warn('Failed to save mood entry', e);
  }
}

export async function saveMoodEntries(entries: MoodEntry[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (e) {
    console.warn('Failed to save mood entries', e);
  }
}

export async function clearMoodEntries() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to clear mood entries', e);
  }
}
