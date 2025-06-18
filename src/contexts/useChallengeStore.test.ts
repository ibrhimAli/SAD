import { beforeEach, describe, expect, it } from 'vitest'
import { useChallengeStore } from './useChallengeStore'

beforeEach(() => {
  localStorage.clear()
  useChallengeStore.setState({ joined: false, current: 0, steps: useChallengeStore.getState().steps })
})

describe('useChallengeStore', () => {
  it('joins the challenge and resets progress', () => {
    const store = useChallengeStore.getState()
    store.join()
    const state = useChallengeStore.getState()
    expect(state.joined).toBe(true)
    expect(state.current).toBe(0)
    expect(localStorage.getItem('challengeJoined')).toBe('true')
    expect(localStorage.getItem('challengeCurrent')).toBe('0')
  })

  it('completes steps without exceeding length', () => {
    const store = useChallengeStore.getState()
    store.join()
    const total = store.steps.length
    for (let i = 0; i < total + 2; i++) {
      useChallengeStore.getState().completeStep()
    }
    expect(useChallengeStore.getState().current).toBe(total)
    expect(localStorage.getItem('challengeCurrent')).toBe(String(total))
  })

  it('resets progress', () => {
    const store = useChallengeStore.getState()
    store.join()
    store.completeStep()
    store.reset()
    const state = useChallengeStore.getState()
    expect(state.joined).toBe(false)
    expect(state.current).toBe(0)
    expect(localStorage.getItem('challengeJoined')).toBeNull()
    expect(localStorage.getItem('challengeCurrent')).toBeNull()
  })
})
