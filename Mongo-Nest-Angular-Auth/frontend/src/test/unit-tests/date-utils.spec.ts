import { asUTC, getDateArray, getDiffInDays, getNextDay } from '~/app/utils/date.utils'

describe('DateUtils getNextDay', () => {
  it('should return the next day', () => {
    const day1 = new Date(2020, 10, 27)
    const day1next: Date = getNextDay(day1)
    expect(day1next).toBeInstanceOf(Date)
    expect(day1next.getFullYear()).toBe(2020)
    expect(day1next.getMonth()).toBe(10)
    expect(day1next.getDate()).toBe(28)

    const day2 = new Date(2020, 11, 31)
    const day2next = getNextDay(day2)
    expect(day2next.getFullYear()).toBe(2021)
    expect(day2next.getMonth()).toBe(0)
    expect(day2next.getDate()).toBe(1)
  })
})

describe('DateUtils getDiffInDays', () => {
  it('should return time difference in days', () => {
    const date1 = new Date(2020, 10, 27)
    const date2 = new Date(2020, 10, 30)
    const diff1 = getDiffInDays(date1, date2)
    expect(diff1).toBe(3)

    const diff2 = getDiffInDays(date2, date1)
    expect(diff2).toBe(3)

    const date3 = new Date(2021, 1, 27)
    const date4 = new Date(2021, 2, 3)
    const diff3 = getDiffInDays(date3, date4)
    expect(diff3).toBe(4)

    const diff4 = getDiffInDays(date4, date3)
    expect(diff4).toBe(4)
  })
})

describe('DateUtils asUTC', () => {
  it('should return a date in UTC', () => {
    const date1 = new Date(2020, 10, 27)
    const date1UTC = asUTC(date1)
    expect(date1UTC.toISOString()).toBe('2020-11-27T00:00:00.000Z')

    const date2 = new Date(2020, 11, 31)
    const date2UTC = asUTC(date2)
    expect(date2UTC.toISOString()).toBe('2020-12-31T00:00:00.000Z')
  })
})

describe('DateUtils getDateArray', () => {
  it('should return an array with dates from start to end', () => {
    const date1 = new Date(2020, 10, 27)
    const date2 = new Date(2020, 11, 2)
    const arr = getDateArray(asUTC(date1), asUTC(date2))

    expect(arr.length).toBe(6)
    expect(arr.length).toBe(getDiffInDays(date1, date2) + 1)
    expect(arr[0].toISOString()).toBe('2020-11-27T00:00:00.000Z')
    expect(arr[2].toISOString()).toBe('2020-11-29T00:00:00.000Z')
    expect(arr[5].toISOString()).toBe('2020-12-02T00:00:00.000Z')
  })

  it('should throw an error if end date is before start', () => {
    const date1 = new Date(2020, 10, 27)
    const date2 = new Date(2020, 11, 2)
    expect(() => getDateArray(asUTC(date2), asUTC(date1))).toThrowError()
  })
})
