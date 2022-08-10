import { DeckProgress } from '~/services/deck/types/DeckProgress'

export function parseProgress(progressJsonString: string): DeckProgress {
  const progress = JSON.parse(progressJsonString)
  if (
    !('remaining' in progress) ||
    !('done' in progress) ||
    !('difficult' in progress) ||
    !('lastUsed' in progress) ||
    !('shuffled' in progress)
  ) {
    throw new Error('Invalid progress JSON')
  }
  return progress as DeckProgress
}
