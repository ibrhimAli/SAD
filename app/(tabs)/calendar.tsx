import { StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useMemo } from 'react';

import { ThemedView } from '@/components/ThemedView';
import { moodEntries, moodColors } from '@/constants/moods';

export default function CalendarScreen() {
  const markedDates = useMemo(() => {
    const marks: Record<string, { marked: boolean; dotColor: string }> = {};
    moodEntries.forEach((entry) => {
      marks[entry.date] = { marked: true, dotColor: moodColors[entry.level] };
    });
    return marks;
  }, []);

  return (
    <ThemedView style={styles.container}>
      <Calendar markedDates={markedDates} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },
});
