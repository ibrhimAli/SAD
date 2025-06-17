import { StyleSheet } from 'react-native';
import { Calendar, type DateData } from 'react-native-calendars';
import { useMemo, useState, useCallback, useEffect } from 'react';

import { ThemedView } from '@/components/ThemedView';
import DayDetailModal from '@/components/DayDetailModal';
import { moodColors, moodEntries as sampleEntries, type MoodEntry } from '@/constants/moods';
import { loadMoodEntries, saveMoodEntries } from '@/hooks/useMoodStorage';

export default function CalendarScreen() {
  const [selectedEntry, setSelectedEntry] = useState<MoodEntry | null>(null);
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  useEffect(() => {
    async function init() {
      const stored = await loadMoodEntries();
      if (stored.length === 0) {
        await saveMoodEntries(sampleEntries);
        setEntries(sampleEntries);
      } else {
        setEntries(stored);
      }
    }
    init();
  }, []);

  const markedDates = useMemo(() => {
    const marks: Record<string, { marked: boolean; dotColor: string }> = {};
    entries.forEach((entry) => {
      marks[entry.date] = { marked: true, dotColor: moodColors[entry.level] };
    });
    return marks;
  }, [entries]);

  const handleDayPress = useCallback(
    (day: DateData) => {
      const entry = entries.find((e) => e.date === day.dateString);
      if (entry) {
        setSelectedEntry(entry);
      }
    },
    [entries]
  );

  return (
    <ThemedView style={styles.container}>
      <Calendar markedDates={markedDates} onDayPress={handleDayPress} />
      <DayDetailModal
        visible={selectedEntry !== null}
        entry={selectedEntry}
        onDismiss={() => setSelectedEntry(null)}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },
});
