import { WordList } from '~/services/deck/types/WordList'

export function convertToWordList(text: string): WordList {
  const wordList: WordList = { front: [], back: [] }
  const lines = text.split('\n')
  if (lines.length < 2) {
    throw new Error('Empty or corrupted file!')
  }
  lines.forEach(line => {
    const wordPair = line.split('\t')
    if (wordPair.length < 2) {
      throw new Error('Empty or corrupted file!')
    }
    wordList.front.push(wordPair[1])
    wordList.back.push(wordPair[0])
  })
  return wordList
}
