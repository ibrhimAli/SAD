import tips from '../tips/tips.json' assert { type: 'json' }
import type { MoodEntry } from '../contexts/useMoodStore'

export interface Tip {
  text: string
  /**
   * Condition decides when the tip can appear. `lowLight` triggers when
   * recent daylight hours average under six, `lowMood` when the recent mood
   * average is two or below. `any` is a fallback used otherwise.
   */
  condition: 'any' | 'lowLight' | 'lowMood'
}

const allTips = tips as Tip[]

export function selectTip(entries: MoodEntry[]): string {
  const recent = entries.slice(-3)
  let cond: Tip['condition'] = 'any'

  if (recent.length > 0) {
    const avgMood = recent.reduce((s, e) => s + e.mood, 0) / recent.length
    if (avgMood <= 2) {
      cond = 'lowMood'
    }

    const daylight = recent
      .map((e) => {
        if (e.sunrise && e.sunset) {
          const rise = new Date(e.sunrise).getTime()
          const set = new Date(e.sunset).getTime()
          if (!Number.isNaN(rise) && !Number.isNaN(set)) {
            return (set - rise) / 3600000
          }
        }
        return undefined
      })
      .filter((h): h is number => typeof h === 'number')

    if (daylight.length > 0) {
      const avgLight = daylight.reduce((s, h) => s + h, 0) / daylight.length
      if (avgLight < 6) {
        cond = 'lowLight'
      }
    }
  }

  const candidates = allTips.filter(
    (t) => t.condition === cond || t.condition === 'any'
  )

  const selected = candidates[Math.floor(Math.random() * candidates.length)]
  return selected.text
}
