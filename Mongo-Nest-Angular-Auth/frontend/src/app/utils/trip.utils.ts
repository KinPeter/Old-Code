import { Day, TripBase, TripDto } from '~/app/types/trip.types'
import { getDateArray } from '~/app/utils/date.utils'

export function createInitialDto(tripBase: TripBase): TripDto {
  const dates = getDateArray(tripBase.startingDate, tripBase.endingDate)
  const days: Day[] = dates.map(date => {
    return {
      date,
      cities: []
    }
  })
  return {
    title: tripBase.title,
    startingDate: tripBase.startingDate,
    endingDate: tripBase.endingDate,
    countries: [...tripBase.countries],
    coverImageUrl: tripBase.coverImageUrl,
    days: JSON.stringify(days)
  }
}
