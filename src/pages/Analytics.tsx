import React from 'react'
import MoodAnalytics from '../components/MoodAnalytics'
import PremiumModal from '../components/PremiumModal'
import { usePremiumStore } from '../contexts/usePremiumStore'

export default function Analytics() {
  const { trialStarted, startTrial } = usePremiumStore()
  const [showPremium, setShowPremium] = React.useState(false)

  const openPremium = () => setShowPremium(true)
  const closePremium = () => setShowPremium(false)

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Analytics</h1>
      <div className="bg-white dark:bg-indigo p-4 rounded shadow">
        <MoodAnalytics />
      </div>
      {!trialStarted && (
        <button
          onClick={openPremium}
          className="mt-4 px-4 py-2 bg-primary-dark text-white rounded"
        >
          See your 60-day trend
        </button>
      )}
      {showPremium && (
        <PremiumModal onStart={startTrial} onClose={closePremium} />
      )}
    </div>
  )
}
