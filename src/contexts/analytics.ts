import { format, startOfDay, subDays } from 'date-fns'
import type { MoodEntry } from './useMoodStore'

export interface WeeklySummary {
  averageMood: number
  highestMoodDay: string
}

export function computeWeeklySummary(entries: MoodEntry[], now = Date.now()): WeeklySummary {
  const weekStart = subDays(startOfDay(now), 6).getTime()
  const recent = entries.filter((e) => e.timestamp >= weekStart)
  if (recent.length === 0) {
    return { averageMood: 0, highestMoodDay: '' }
  }
  const totalMood = recent.reduce((sum, e) => sum + e.mood, 0)
  const avgMood = totalMood / recent.length
  const highest = recent.reduce((max, e) => (e.mood > max.mood ? e : max), recent[0])
  return {
    averageMood: avgMood,
    highestMoodDay: format(highest.timestamp, 'EEE'),
  }
}
