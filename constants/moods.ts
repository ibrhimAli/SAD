export type MoodEntry = {
  date: string; // YYYY-MM-DD
  level: 1 | 2 | 3 | 4 | 5;
  notes: string;
};

export const moodColors: Record<MoodEntry['level'], string> = {
  1: '#d84c4c',
  2: '#e3853b',
  3: '#e3c93b',
  4: '#64b85e',
  5: '#3a9e82',
};

export const moodEntries: MoodEntry[] = [
  { date: '2024-06-02', level: 4, notes: 'Good day' },
  { date: '2024-06-05', level: 2, notes: 'Felt tired' },
  { date: '2024-06-10', level: 5, notes: 'Excellent mood' },
  { date: '2024-06-15', level: 3, notes: 'Average day' },
  { date: '2024-06-20', level: 1, notes: 'Pretty bad' },
];
