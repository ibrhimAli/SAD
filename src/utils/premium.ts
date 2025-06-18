export function shouldShowPremiumModal(
  firstUse: number,
  dismissed: boolean,
  trialStarted: boolean,
  premiumDays: number,
  now: number = Date.now(),
): boolean {
  const daysUsed = (now - firstUse) / (24 * 60 * 60 * 1000)
  return !dismissed && !trialStarted && daysUsed >= premiumDays
}
