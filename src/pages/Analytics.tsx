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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>
      <MoodAnalytics />
      {!trialStarted && (
        <button
          onClick={openPremium}
          className="mt-4 px-4 py-2 bg-primary text-white rounded"
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
