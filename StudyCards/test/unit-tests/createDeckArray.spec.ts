import { createDeckArray } from '~/utils/createDeckArray'

describe('createDeckArray', () => {
  it('should create proper arrays', () => {
    const array1 = createDeckArray(1)
    expect(array1.length).toEqual(1)
    expect(array1[0]).toEqual(0)

    const array2 = createDeckArray(12)
    expect(array2.length).toEqual(12)
    expect(array2[0]).toEqual(0)
    expect(array2[11]).toEqual(11)

    const array3 = createDeckArray(500)
    expect(array3.length).toEqual(500)
    expect(array3[0]).toEqual(0)
    expect(array3[499]).toEqual(499)
  })

  it('should fail with invalid length parameters', () => {
    expect(() => {
      createDeckArray(-4)
    }).toThrowError()
    expect(() => {
      createDeckArray(3.21)
    }).toThrowError()
  })
})
