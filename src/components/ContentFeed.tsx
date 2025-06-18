import React from 'react'
import { useMoodStore } from '../contexts/useMoodStore'
import { selectTip } from '../utils/selectTip'

export default function ContentFeed() {
  const entries = useMoodStore((state) => state.entries)
  const [tip, setTip] = React.useState('')
  const [edgeMessage, setEdgeMessage] = React.useState('')

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

    if (entries.length > 0) {
      const last = entries[entries.length - 1]
      if (Date.now() - last.timestamp > 3 * 24 * 60 * 60 * 1000) {
        setEdgeMessage('Hey, checking in gently. Even small notes help.')
      } else if (last.sunrise && last.sunset) {
        const rise = new Date(last.sunrise).getTime()
        const set = new Date(last.sunset).getTime()
        if (!Number.isNaN(rise) && !Number.isNaN(set)) {
          const hours = (set - rise) / 3600000
          if (hours <= 0) {
            setEdgeMessage(
              'It\u2019s a dark stretch \u2013 let\u2019s focus on small habits indoors \uD83C\uDF19'
            )
          }
        }
      }
    }
  }, [entries])

  if (!tip && !edgeMessage) return null

  return (
    <div className="space-y-2">
      {edgeMessage && (
        <div className="p-2 border rounded bg-yellow text-indigo">{edgeMessage}</div>
      )}
      {tip && (
        <div className="p-2 border rounded bg-creamWhite dark:bg-indigo">{tip}</div>
      )}
    </div>
  )
}
