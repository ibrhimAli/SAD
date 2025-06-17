import tips from '../tips/tips.json' assert { type: 'json' }
import type { MoodEntry } from '../contexts/useMoodStore'

export interface Tip {
  text: string
  condition: 'any' | 'lowLight' | 'lowMood'
}

const allTips = tips as Tip[]

export function selectTip(entries: MoodEntry[]): string {
  const recent = entries.slice(-3)
  let cond: Tip['condition'] = 'any'
  if (recent.length > 0) {
    const avgMood = recent.reduce((s, e) => s + e.mood, 0) / recent.length
    if (avgMood <= 2) cond = 'lowMood'
  }
  const candidates = allTips.filter(
    (t) => t.condition === cond || t.condition === 'any'
  )
  return candidates[Math.floor(Math.random() * candidates.length)].text
}
