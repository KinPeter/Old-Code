import { DeckResource } from '~/services/deck/types/DeckResource'
import { parseProgress } from '~/utils/parseProgress'

export function sortDecks(decks: DeckResource[]): DeckResource[] {
  const completed: DeckResource[] = []
  const inProgress: DeckResource[] = []
  decks
    .sort((a, b) => {
      const aLastUsed = parseProgress(a.progress).lastUsed
      const bLastUsed = parseProgress(b.progress).lastUsed
      if (aLastUsed < bLastUsed) {
        return 1
      } else if (aLastUsed === bLastUsed) {
        return 0
      } else {
        return -1
      }
    })
    .forEach(deck => {
      if (parseProgress(deck.progress).remaining.length) {
        inProgress.push(deck)
      } else {
        completed.push(deck)
      }
    })
  return [...inProgress, ...completed]
}
