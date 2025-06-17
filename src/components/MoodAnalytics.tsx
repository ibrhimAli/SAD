import React from 'react'
import { Line } from 'react-chartjs-2'
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
import { format } from 'date-fns'
import { useMoodStore } from '../contexts/useMoodStore'
import { computeWeeklySummary } from '../contexts/analytics'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function MoodAnalytics() {
  const entries = useMoodStore((state) => state.entries)

  const labels = entries.map((e) => format(e.timestamp, 'MM/dd'))
  const moodData = entries.map((e) => e.mood)

  const lineChartData = {
    labels,
    datasets: [
      {
        label: 'Mood',
        data: moodData,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
      },
    ],
  }

  const summary = React.useMemo(() => computeWeeklySummary(entries), [entries])

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-bold mb-2">Mood Over Time</h2>
        <Line data={lineChartData} />
      </div>
      <div className="p-4 border rounded">
        <h3 className="font-bold mb-2">Last 7 Days Summary</h3>
        <p>Average Mood: {summary.averageMood.toFixed(2)}</p>
        <p>Highest Mood Day: {summary.highestMoodDay}</p>
      </div>
    </div>
  )
}
