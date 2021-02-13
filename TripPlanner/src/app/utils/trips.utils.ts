import { Trip } from '~/app/types/trip.types'
import { TripsOrder } from '~/app/types/shared.types'

export interface WithTitle {
  title: string
}
export interface WithDate {
  startingDate: Date
}

export function orderByTitleAsc<T extends WithTitle>(a: T, b: T): number {
  const titleA = a.title.toLowerCase()
  const titleB = b.title.toLowerCase()
  if (titleA < titleB) return -1
  if (titleA > titleB) return 1
  return 0
}

export function orderByTitleDesc<T extends WithTitle>(a: T, b: T): number {
  const titleA = a.title.toLowerCase()
  const titleB = b.title.toLowerCase()
  if (titleA > titleB) return -1
  if (titleA < titleB) return 1
  return 0
}

export function orderByDateAsc<T extends WithDate>(a: T, b: T): number {
  if (a.startingDate < b.startingDate) return -1
  if (a.startingDate > b.startingDate) return 1
  return 0
}

export function orderByDateDesc<T extends WithDate>(a: T, b: T): number {
  if (a.startingDate > b.startingDate) return -1
  if (a.startingDate < b.startingDate) return 1
  return 0
}

export function getFutureTrips(trips: Trip[]): Trip[] {
  return trips.filter(t => t.endingDate > new Date())
}

export function applyFilter(trips: Trip[], filter: string): Trip[] {
  filter = filter.toLowerCase()
  return trips.filter(
    t =>
      t.title.toLowerCase().includes(filter) ||
      t.countries.some(c => c.toLowerCase().includes(filter)) ||
      t.startingDate.getFullYear().toString() === filter ||
      t.endingDate.getFullYear().toString() === filter
  )
}

export function orderTrips(trips: Trip[], orderBy: TripsOrder): Trip[] {
  let compareFn
  switch (orderBy) {
    case TripsOrder.ALPHA_ASC:
      compareFn = orderByTitleAsc
      break
    case TripsOrder.ALPHA_DESC:
      compareFn = orderByTitleDesc
      break
    case TripsOrder.DATE_ASC:
      compareFn = orderByDateAsc
      break
    case TripsOrder.DATE_DESC:
      compareFn = orderByDateDesc
      break
  }
  return trips.sort(compareFn)
}
