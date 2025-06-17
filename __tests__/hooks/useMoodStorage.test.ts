import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadMoodEntries, saveMoodEntry, saveMoodEntries, clearMoodEntries } from '@/hooks/useMoodStorage';
import type { MoodEntry } from '@/constants/moods';

jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));

describe('mood storage utilities', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('returns an empty array when nothing is stored', async () => {
    const entries = await loadMoodEntries();
    expect(entries).toEqual([]);
  });

  it('saves and loads a single entry', async () => {
    const entry: MoodEntry = { date: '2024-01-01', level: 3, notes: 'ok' };
    await saveMoodEntry(entry);
    const stored = await loadMoodEntries();
    expect(stored).toEqual([entry]);
  });

  it('updates an existing entry', async () => {
    const entry: MoodEntry = { date: '2024-01-02', level: 2, notes: 'meh' };
    await saveMoodEntry(entry);
    const updated: MoodEntry = { ...entry, level: 5, notes: 'great' };
    await saveMoodEntry(updated);
    const stored = await loadMoodEntries();
    expect(stored).toEqual([updated]);
  });

  it('saves multiple entries and clears them', async () => {
    const entries: MoodEntry[] = [
      { date: '2024-02-01', level: 4, notes: 'good' },
      { date: '2024-02-02', level: 1, notes: 'bad' },
    ];
    await saveMoodEntries(entries);
    expect(await loadMoodEntries()).toEqual(entries);
    await clearMoodEntries();
    expect(await loadMoodEntries()).toEqual([]);
  });
});
