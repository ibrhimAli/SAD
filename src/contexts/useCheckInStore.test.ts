import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useCheckInStore } from './useCheckInStore'

declare global {
  interface Navigator {
    serviceWorker: {
      ready: Promise<{ active: { postMessage: (data: unknown) => void } }>
    }
  }
}

let postMessage: (data: unknown) => void

beforeEach(() => {
  localStorage.clear()
  postMessage = vi.fn()
  global.navigator = {
    serviceWorker: {
      ready: Promise.resolve({ active: { postMessage } }),
    },
  } as unknown as Navigator
})

describe('useCheckInStore', () => {
  it('posts reminder time to the service worker', async () => {
    const store = useCheckInStore.getState()
    store.setReminderTime('10:15')
    await Promise.resolve()
    expect(postMessage).toHaveBeenCalledWith({ type: 'set-reminder', time: '10:15' })
  })
})
