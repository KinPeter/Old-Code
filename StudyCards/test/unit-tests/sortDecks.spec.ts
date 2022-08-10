import { sortDecks } from '~/utils/sortDecks'
import { mockDecks } from '~/test/unit-tests/mockDecks'

describe('sortDecks', () => {
  it('should sort decks', () => {
    const decks = sortDecks(mockDecks)
    expect(decks.length).toEqual(mockDecks.length)
    expect(decks[0].name).toBe('test4')
    expect(decks[4].name).toBe('test3 completed')
  })
})
