import { Trip } from '~/app/types/trip.types'

export const mockTrips: Trip[] = [
  Trip.fromResource({
    id: 'trip1',
    userId: 'user1',
    title: 'Trip 1',
    countries: ['Korea', 'Taiwan'],
    startingDate: new Date(2020, 5, 16),
    endingDate: new Date(2020, 5, 20),
    days: JSON.stringify([
      { date: new Date(2020, 5, 16), cities: [] },
      { date: new Date(2020, 5, 17), cities: [] },
      { date: new Date(2020, 5, 18), cities: [] },
      { date: new Date(2020, 5, 19), cities: [] },
      { date: new Date(2020, 5, 20), cities: [] }
    ])
  }),
  Trip.fromResource({
    id: 'trip2',
    userId: 'user1',
    title: 'Trip 2',
    countries: ['USA', 'Canada'],
    startingDate: new Date(2020, 3, 16),
    endingDate: new Date(2020, 3, 20),
    days: JSON.stringify([
      { date: new Date(2020, 3, 16), cities: [] },
      { date: new Date(2020, 3, 17), cities: [] },
      { date: new Date(2020, 3, 18), cities: [] },
      { date: new Date(2020, 3, 19), cities: [] },
      { date: new Date(2020, 3, 20), cities: [] }
    ])
  }),
  Trip.fromResource({
    id: 'trip3',
    userId: 'user1',
    title: 'A Trip again',
    countries: ['Thailand', 'Korea'],
    startingDate: new Date(2020, 7, 16),
    endingDate: new Date(2020, 7, 20),
    days: JSON.stringify([
      { date: new Date(2020, 7, 16), cities: [] },
      { date: new Date(2020, 7, 17), cities: [] },
      { date: new Date(2020, 7, 18), cities: [] },
      { date: new Date(2020, 7, 19), cities: [] },
      { date: new Date(2020, 7, 20), cities: [] }
    ])
  }),
  Trip.fromResource({
    id: 'trip4',
    userId: 'user1',
    title: 'To the Moon',
    countries: ['The Moon'],
    startingDate: new Date(2040, 7, 16),
    endingDate: new Date(2040, 7, 20),
    days: JSON.stringify([
      { date: new Date(2040, 7, 16), cities: [] },
      { date: new Date(2040, 7, 17), cities: [] },
      { date: new Date(2040, 7, 18), cities: [] },
      { date: new Date(2040, 7, 19), cities: [] },
      { date: new Date(2040, 7, 20), cities: [] }
    ])
  })
]
