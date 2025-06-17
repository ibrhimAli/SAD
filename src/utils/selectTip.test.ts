import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { selectTip } from './selectTip'
import tips from '../tips/tips.json' assert { type: 'json' }
import type { MoodEntry } from '../contexts/useMoodStore'

describe('selectTip', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns a low mood tip when mood is low', () => {
    const entries: MoodEntry[] = [{ timestamp: 0, mood: 1, notes: '' }]
    const tip = selectTip(entries)
    const all = tips as { text: string; condition: string }[]
    const expected = all.filter((t) => t.condition === 'lowMood' || t.condition === 'any')[0].text
    expect(tip).toBe(expected)
  })
})
