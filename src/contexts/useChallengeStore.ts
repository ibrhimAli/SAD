import { create } from 'zustand'

interface ChallengeState {
  steps: string[]
  joined: boolean
  current: number
  join: () => void
  completeStep: () => void
  reset: () => void
}

const stepList = [
  'Reflect on your mood',
  'Take a short walk',
  'Write down something you are grateful for',
  'Connect with a friend',
  'Do a relaxing activity',
]

const initialJoined = localStorage.getItem('challengeJoined') === 'true'
const initialCurrent = parseInt(localStorage.getItem('challengeCurrent') || '0', 10)

export const useChallengeStore = create<ChallengeState>((set, get) => ({
  steps: stepList,
  joined: initialJoined,
  current: initialCurrent,
  join: () => {
    localStorage.setItem('challengeJoined', 'true')
    localStorage.setItem('challengeCurrent', '0')
    set({ joined: true, current: 0 })
  },
  completeStep: () => {
    const next = Math.min(get().current + 1, stepList.length)
    localStorage.setItem('challengeCurrent', String(next))
    set({ current: next })
  },
  reset: () => {
    localStorage.removeItem('challengeJoined')
    localStorage.removeItem('challengeCurrent')
    set({ joined: false, current: 0 })
  },
}))
