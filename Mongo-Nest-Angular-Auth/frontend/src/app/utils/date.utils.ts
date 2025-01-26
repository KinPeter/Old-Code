export const MILLIS_PER_DAY = 1000 * 60 * 60 * 24
export const NOW = new Date()
export const TOMORROW = getNextDay(NOW)

export function asUTC(date: Date): Date {
  const utcTimestamp = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  return new Date(utcTimestamp)
}

export function getDateArray(start: Date, end: Date): Date[] {
  if (end < start) throw new Error('End date is before start date')
  const length = getDiffInDays(start, end)
  const dates: Date[] = [start]
  let current = start
  for (let i = 0; i < length; i++) {
    const next = getNextDay(current)
    dates.push(next)
    current = next
  }
  return dates
}

export function getDiffInDays(start: Date, end: Date): number {
  const diffTime = Math.abs(end.getTime() - start.getTime())
  return Math.ceil(diffTime / MILLIS_PER_DAY)
}

export function getNextDay(date: Date): Date {
  return new Date(date.getTime() + MILLIS_PER_DAY)
}
