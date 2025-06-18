import { create } from 'zustand'

interface PremiumState {
  firstUse: number
  dismissed: boolean
  trialStarted: boolean
  setDismissed: (val: boolean) => void
  startTrial: () => void
}

const storedFirst = parseInt(localStorage.getItem('firstUse') || '0', 10)
const initialFirst = storedFirst || Date.now()
if (!storedFirst) {
  localStorage.setItem('firstUse', String(initialFirst))
}
const storedDismissed = localStorage.getItem('premiumDismissed') === 'true'
const storedTrial = localStorage.getItem('trialStarted') === 'true'

export const usePremiumStore = create<PremiumState>((set) => ({
  firstUse: initialFirst,
  dismissed: storedDismissed,
  trialStarted: storedTrial,
  setDismissed: (val) => {
    localStorage.setItem('premiumDismissed', String(val))
    set({ dismissed: val })
  },
  startTrial: () => {
    localStorage.setItem('trialStarted', 'true')
    set({ trialStarted: true })
  },
}))
