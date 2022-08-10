import { convertToWordList } from '~/utils/convertToWordList'

const mockText1 = `front1\tback1
front2\tback2
front3\tback3
front4\tback4`

const mockText2 = 'Just a text without line breaks and tabs'

const mockText3 = `This has linebreaks
but no tabs`

describe('convertToWordList', () => {
  it('should convert TSV to word list', () => {
    const converted1 = convertToWordList(mockText1)
    expect('front' in converted1).toBeTruthy()
    expect('back' in converted1).toBeTruthy()
    expect(Object.keys(converted1).length).toEqual(2)
    expect(converted1.front.length).toEqual(4)
    expect(converted1.back.length).toEqual(4)
    expect(converted1.front[0]).toBe('front1')
    expect(converted1.front[3]).toBe('front4')
    expect(converted1.back[0]).toBe('back1')
    expect(converted1.back[3]).toBe('back4')
  })

  it('should fail to convert invalid text', () => {
    expect(() => {
      convertToWordList(mockText2)
    }).toThrowError()
    expect(() => {
      convertToWordList(mockText3)
    }).toThrowError()
  })
})
