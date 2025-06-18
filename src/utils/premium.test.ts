import { describe, it, expect } from 'vitest'
import { shouldShowPremiumModal } from './premium'

describe('shouldShowPremiumModal', () => {
  const PREMIUM_DAYS = 7
  const day = 24 * 60 * 60 * 1000

  it('shows modal after enough days', () => {
    const now = Date.now()
    const firstUse = now - PREMIUM_DAYS * day
    expect(
      shouldShowPremiumModal(firstUse, false, false, PREMIUM_DAYS, now),
    ).toBe(true)
  })

  it('does not show when dismissed or trial started', () => {
    const now = Date.now()
    const firstUse = now - PREMIUM_DAYS * day
    expect(
      shouldShowPremiumModal(firstUse, true, false, PREMIUM_DAYS, now),
    ).toBe(false)
    expect(
      shouldShowPremiumModal(firstUse, false, true, PREMIUM_DAYS, now),
    ).toBe(false)
  })
})
