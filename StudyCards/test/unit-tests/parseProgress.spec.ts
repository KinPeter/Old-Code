import { parseProgress } from '~/utils/parseProgress'

const mockProgress1 = JSON.stringify({
  remaining: [1, 2, 3, 4, 5, 6],
  done: [7, 8, 9, 10],
  difficult: [],
  lastUsed: new Date('2020.01.04.').toISOString(),
  shuffled: false,
})
const mockProgress2 = JSON.stringify({
  remaining: [1, 2, 3, 4, 5, 6],
  done: [7, 8, 9, 10],
  lastUsed: new Date('2020.01.04.').toISOString(),
})

describe('parseProgress', () => {
  it('should parse a progress JSON string', () => {
    const progress = parseProgress(mockProgress1)
    expect('remaining' in progress).toBeTruthy()
    expect('done' in progress).toBeTruthy()
    expect('difficult' in progress).toBeTruthy()
    expect('lastUsed' in progress).toBeTruthy()
    expect('shuffled' in progress).toBeTruthy()
    expect(Object.keys(progress).length).toEqual(5)
    expect(typeof progress.lastUsed).toBe('string')
    expect(Array.isArray(progress.remaining)).toBeTruthy()
    expect(Array.isArray(progress.done)).toBeTruthy()
    expect(Array.isArray(progress.difficult)).toBeTruthy()
    expect(progress.done.length).toEqual(4)
    expect(progress.difficult.length).toEqual(0)
  })

  it('should fail with invalid JSON string', () => {
    expect(() => {
      parseProgress(mockProgress2)
    }).toThrowError()
  })
})
