import React from 'react'

interface PremiumModalProps {
  onStart: () => void
  onClose: () => void
}

export default function PremiumModal({ onStart, onClose }: PremiumModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-primary-light bg-opacity-90 z-50 p-4">
      <div className="bg-white p-6 rounded shadow max-w-sm w-full text-center">
        <h2 className="text-xl font-bold mb-2">Unlock Premium Analytics</h2>
        <p className="mb-4">See your 60-day mood trends and more.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onStart}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Start Free Trial
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  )
}
