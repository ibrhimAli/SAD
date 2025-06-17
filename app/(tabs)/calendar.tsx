import { StyleSheet } from 'react-native';
import { Calendar, type DateData } from 'react-native-calendars';
import { useMemo, useState, useCallback } from 'react';

import { ThemedView } from '@/components/ThemedView';
import DayDetailModal from '@/components/DayDetailModal';
import { moodEntries, moodColors, type MoodEntry } from '@/constants/moods';

export default function CalendarScreen() {
  const [selectedEntry, setSelectedEntry] = useState<MoodEntry | null>(null);
  const markedDates = useMemo(() => {
    const marks: Record<string, { marked: boolean; dotColor: string }> = {};
    moodEntries.forEach((entry) => {
      marks[entry.date] = { marked: true, dotColor: moodColors[entry.level] };
    });
    return marks;
  }, []);

  const handleDayPress = useCallback((day: DateData) => {
    const entry = moodEntries.find((e) => e.date === day.dateString);
    if (entry) {
      setSelectedEntry(entry);
    }
  }, []);

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
