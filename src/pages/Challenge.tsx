import { motion, useReducedMotion } from 'framer-motion'
import { useChallengeStore } from '../contexts/useChallengeStore'

function Confetti() {
  const shouldReduceMotion = useReducedMotion()
  if (shouldReduceMotion) return null
  const colors = ['#FFD761', '#3b82f6', '#E5F0FB']
  const pieces = Array.from({ length: 25 }, (_, i) => i)
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {pieces.map((p) => {
        const left = Math.random() * 100
        const delay = Math.random() * 0.3
        const bg = colors[p % colors.length]
        return (
          <motion.div
            key={p}
            style={{ left: `${left}%`, backgroundColor: bg }}
            className="absolute top-0 w-2 h-2"
            initial={{ opacity: 1, y: 0, rotate: 0 }}
            animate={{ opacity: 0, y: '100vh', rotate: 360 }}
            transition={{ duration: 2, delay }}
          />
        )
      })}
    </div>
  )
}

export default function Challenge() {
  const { steps, joined, current, join, completeStep } = useChallengeStore()
  const completed = current >= steps.length
  const progress = (current / steps.length) * 100

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">30 Day Challenge</h1>
      <div
        className="h-4 bg-mutedBlueGray rounded-full overflow-hidden"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
      >
        <div
          className="h-full bg-gradient-to-r from-primary to-yellow"
          style={{ width: `${progress}%` }}
        />
      </div>
      <ul className="space-y-1">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={i < current}
              readOnly
              className="accent-primary-dark"
            />
            <span className={i < current ? 'text-mutedBlueGray line-through' : ''}>
              {s}
            </span>
          </li>
        ))}
      </ul>
      <p className="font-semibold">{Math.round(progress)}% complete</p>
      {!joined && (
        <button onClick={join} className="px-4 py-2 bg-primary-dark text-white rounded">
          Join Challenge
        </button>
      )}
      {joined && !completed && (
        <button
          onClick={completeStep}
          className="px-4 py-2 bg-yellow text-indigo rounded"
        >
          Complete Step
        </button>
      )}
      {completed && <Confetti />}
    </div>
  )
}
