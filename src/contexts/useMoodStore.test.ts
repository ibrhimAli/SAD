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
  let call = 0
  global.fetch = vi.fn().mockImplementation(() => {
    call++
    if (call === 1) {
      return Promise.resolve({
        json: async () => ({
          status: 'OK',
          results: { sunrise: '06:00', sunset: '18:00' },
        }),
      } as Response)
    }
    return Promise.resolve({
      json: async () => ({ current_weather: { weathercode: 2 } }),
    } as Response)
  })
})

describe('useMoodStore', () => {
  it('adds an entry and computes streak', async () => {
    const store = useMoodStore.getState()
    await store.addEntry({ mood: 3, energy: 2, sleep: 1, light: 4, notes: 'ok' })
    expect(store.getEntries()).toHaveLength(1)
    const entry = store.getEntries()[0]
    expect(entry.sunrise).toBe('06:00')
    expect(entry.sunset).toBe('18:00')
    expect(entry.weather).toBe('cloudy')
    expect(store.getStreak()).toBe(1)
  })
})
