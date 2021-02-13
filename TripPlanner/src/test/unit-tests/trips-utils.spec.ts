import { mockTrips } from '~/test/mocks/data/mock-trips'
import { applyFilter, getFutureTrips, orderTrips } from '~/app/utils/trips.utils'
import { TripsOrder } from '~/app/types/shared.types'

describe('TripsUtils getFutureTrips', () => {
  it('should filter out trips in the future but not touch the original array', () => {
    const trips = [...mockTrips]
    const futureTrips = getFutureTrips(trips)
    expect(trips.length).toEqual(4)
    expect(futureTrips.length).toEqual(1)
    expect(futureTrips[0].id).toEqual('trip4')

    const trips2 = [mockTrips[0], mockTrips[1]]
    const futureTrips2 = getFutureTrips(trips2)
    expect(trips2.length).toEqual(2)
    expect(futureTrips2.length).toEqual(0)
  })
})

describe('TripsUtils applyFilter', () => {
  it('should filter out trips by a year', () => {
    const trips = [...mockTrips]
    const filtered1 = applyFilter(trips, '2040')
    expect(filtered1.length).toEqual(1)
    expect(filtered1[0].id).toEqual('trip4')
  })

  it('should filter out trips by a country, case insensitive', () => {
    const trips = [...mockTrips]

    const filtered = applyFilter(trips, 'kor')
    expect(filtered.length).toEqual(2)
    expect(filtered.map(t => t.id)).toContain('trip1')
    expect(filtered.map(t => t.id)).toContain('trip3')

    const filtered2 = applyFilter(trips, 'TAIW')
    expect(filtered2.length).toEqual(1)
    expect(filtered2.map(t => t.id)).toContain('trip1')
  })

  it('should filter out trips by a title, case insensitive', () => {
    const trips = [...mockTrips]

    const filtered1 = applyFilter(trips, 'trip')
    expect(filtered1.length).toEqual(3)
    expect(filtered1.map(t => t.id)).toContain('trip1')
    expect(filtered1.map(t => t.id)).toContain('trip2')
    expect(filtered1.map(t => t.id)).toContain('trip3')

    const filtered2 = applyFilter(trips, 'TRiP')
    expect(filtered2.length).toEqual(3)
    expect(trips.length).toEqual(4)
    expect(filtered2.map(t => t.id)).toContain('trip1')
    expect(filtered2.map(t => t.id)).toContain('trip2')
    expect(filtered2.map(t => t.id)).toContain('trip3')
  })
})

describe('TripsUtils orderTrips', () => {
  it('should order trips by title, ascending', () => {
    const trips = [...mockTrips]
    const ordered = orderTrips(trips, TripsOrder.ALPHA_ASC)
    expect(ordered.length).toEqual(4)
    expect(ordered[0].id).toEqual('trip3')
    expect(ordered[1].id).toEqual('trip4')
    expect(ordered[2].id).toEqual('trip1')
    expect(ordered[3].id).toEqual('trip2')
  })

  it('should order trips by title, descending', () => {
    const trips = [...mockTrips]
    const ordered = orderTrips(trips, TripsOrder.ALPHA_DESC)
    expect(ordered.length).toEqual(4)
    expect(ordered[0].id).toEqual('trip2')
    expect(ordered[1].id).toEqual('trip1')
    expect(ordered[2].id).toEqual('trip4')
    expect(ordered[3].id).toEqual('trip3')
  })

  it('should order trips by date, ascending', () => {
    const trips = [...mockTrips]
    const ordered = orderTrips(trips, TripsOrder.DATE_ASC)
    expect(ordered.length).toEqual(4)
    expect(ordered[0].id).toEqual('trip2')
    expect(ordered[1].id).toEqual('trip1')
    expect(ordered[2].id).toEqual('trip3')
    expect(ordered[3].id).toEqual('trip4')
  })

  it('should order trips by date, descending', () => {
    const trips = [...mockTrips]
    const ordered = orderTrips(trips, TripsOrder.DATE_DESC)
    expect(ordered.length).toEqual(4)
    expect(ordered[0].id).toEqual('trip4')
    expect(ordered[1].id).toEqual('trip3')
    expect(ordered[2].id).toEqual('trip1')
    expect(ordered[3].id).toEqual('trip2')
  })
})
