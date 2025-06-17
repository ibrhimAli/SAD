import React from 'react'
import { useMoodStore } from '../contexts/useMoodStore'
import { selectTip } from '../utils/selectTip'

export default function ContentFeed() {
  const entries = useMoodStore((state) => state.entries)
  const [tip, setTip] = React.useState('')

  React.useEffect(() => {
    const today = new Date().toDateString()
    const stored = localStorage.getItem('dailyTip')
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as { date: string; tip: string }
        if (parsed.date === today) {
          setTip(parsed.tip)
          return
        }
      } catch {
        // ignore parse errors
      }
    }
    const newTip = selectTip(entries)
    localStorage.setItem('dailyTip', JSON.stringify({ date: today, tip: newTip }))
    setTip(newTip)
  }, [entries])

  if (!tip) return null

  return (
    <div className="p-2 border rounded bg-gray-100 dark:bg-gray-700">{tip}</div>
  )
}
