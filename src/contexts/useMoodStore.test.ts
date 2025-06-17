import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useMoodStore } from './useMoodStore'

declare global {
  interface Navigator {
    geolocation: {
      getCurrentPosition: (
        success: (pos: { coords: GeolocationCoordinates }) => void,
        error?: () => void
      ) => void
    }
  }
}

beforeEach(() => {
  localStorage.clear()
  global.navigator = {
    geolocation: {
      getCurrentPosition: (success) => {
        success({
          coords: { latitude: 0, longitude: 0 } as GeolocationCoordinates,
        })
      },
    },
  } as Navigator
})

describe('useMoodStore', () => {
  it('adds an entry and computes streak', async () => {
    const store = useMoodStore.getState()
    await store.addEntry({ mood: 3, energy: 2, sleep: 1, light: 4, notes: 'ok' })
    expect(store.getEntries()).toHaveLength(1)
    expect(store.getStreak()).toBe(1)
  })
})
