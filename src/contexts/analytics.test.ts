import { describe, it, expect } from 'vitest'
import { computeWeeklySummary } from './analytics'
import type { MoodEntry } from './useMoodStore'
import { startOfDay, subDays } from 'date-fns'

describe('computeWeeklySummary', () => {
  it('calculates stats for the last seven days', () => {
    const base = startOfDay(new Date('2025-06-20')).getTime()
    const entries: MoodEntry[] = [
      { timestamp: subDays(base, 8).getTime(), mood: 1, notes: '' },
      { timestamp: subDays(base, 2).getTime(), mood: 5, notes: '' },
      { timestamp: subDays(base, 1).getTime(), mood: 3, notes: '' },
      { timestamp: base, mood: 4, notes: '' },
    ]

    const summary = computeWeeklySummary(entries, base)

    expect(summary.averageMood).toBeCloseTo((5 + 3 + 4) / 3)
    expect(summary.highestMoodDay).toBe('Wed')
  })
})
