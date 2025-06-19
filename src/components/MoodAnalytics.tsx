import React from 'react'
import { Line } from 'react-chartjs-2'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import type { ChartOptions } from 'chart.js'
import { format } from 'date-fns'
import { useMoodStore } from '../contexts/useMoodStore'
import { computeWeeklySummary } from '../contexts/analytics'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function MoodAnalytics() {
  const entries = useMoodStore((state) => state.entries)

  const labels = entries.map((e) => format(e.timestamp, 'MM/dd'))
  const moodData = entries.map((e) => e.mood)
  const daylightData = entries.map((e) => {
    if (e.sunrise && e.sunset) {
      const rise = new Date(e.sunrise).getTime()
      const set = new Date(e.sunset).getTime()
      if (!isNaN(rise) && !isNaN(set)) {
        return Number(((set - rise) / 3600000).toFixed(2))
      }
    }
    return null
  })

  const lineChartData = {
    labels,
    datasets: [
      {
        label: 'Recent mood',
        data: moodData,
        borderColor: '#4A90E2',
        backgroundColor: 'rgba(74, 144, 226, 0.2)',
        tension: 0.3,
      },
      {
        label: 'Daylight hours',
        data: daylightData,
        borderColor: '#FFC75F',
        backgroundColor: 'rgba(255, 199, 95, 0.2)',
        tension: 0.3,
      },
    ],
  }

  const options: ChartOptions<'line'> = {
    events: ['click'],
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#B7C9D4',
        titleColor: '#1D3557',
        bodyColor: '#1D3557',
        callbacks: {
          afterBody: (ctx) => {
            const i = ctx[0]?.dataIndex ?? 0
            const entry = entries[i]
            if (!entry) return []
            const sunrise = entry.sunrise
              ? format(new Date(entry.sunrise), 'HH:mm')
              : 'n/a'
            const sunset = entry.sunset
              ? format(new Date(entry.sunset), 'HH:mm')
              : 'n/a'
            const weather = entry.weather ?? 'n/a'
            return [`Sunrise: ${sunrise}`, `Sunset: ${sunset}`, `Weather: ${weather}`]
          },
        },
      },
    },
  }

  const summary = React.useMemo(() => computeWeeklySummary(entries), [entries])
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="space-y-4"
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
    >
      <div>
        <h2 className="font-bold mb-2">Mood Over Time</h2>
        <div className="text-sm mb-2">
          <span className="mr-2">
            <span
              className="inline-block w-3 h-3 mr-1"
              style={{ backgroundColor: '#4A90E2' }}
            />
            Recent mood
          </span>
          |
          <span className="ml-2">
            <span
              className="inline-block w-3 h-3 mr-1"
              style={{ backgroundColor: '#FFC75F' }}
            />
            Daylight hours
          </span>
        </div>
        <Line data={lineChartData} options={options} />
      </div>
      <div className="p-4 border rounded bg-creamWhite dark:bg-indigo">
        <h3 className="font-bold mb-2">Last 7 Days Summary</h3>
        <p>Average Mood: {summary.averageMood.toFixed(2)}</p>
        <p>Highest Mood Day: {summary.highestMoodDay}</p>
      </div>
    </motion.div>
  )
}
