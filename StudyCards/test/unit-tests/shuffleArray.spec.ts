import { shuffleArray } from '~/utils/shuffleArray'

describe('shuffleArray', () => {
  it('should return with a proper array', () => {
    const shuffled1 = shuffleArray([1, 2, 3, 4, 5])
    expect(Array.isArray(shuffled1)).toBeTruthy()
    expect(shuffled1.length).toEqual(5)

    const shuffled2 = shuffleArray([])
    expect(Array.isArray(shuffled2)).toBeTruthy()
    expect(shuffled2.length).toEqual(0)
  })
})
