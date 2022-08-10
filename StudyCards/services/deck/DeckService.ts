import ApiService from '~/services/api/ApiService'
import { WordList } from '~/services/deck/types/WordList'
import { convertToWordList } from '~/utils/convertToWordList'
import { DeckResource } from '~/services/deck/types/DeckResource'
import { RawDeck } from '~/services/deck/types/RawDeck'

export class DeckService {
  constructor(private api: ApiService) {}

  async fetchWordList(url: string): Promise<string> {
    const resp = await fetch(url)
    return await resp.text()
  }

  async verifyWordList(url: string): Promise<number> {
    const file = await this.fetchWordList(url)
    try {
      const wordList: WordList = convertToWordList(file)
      if (wordList.front.length !== wordList.back.length) {
        return -1
      }
      return wordList.front.length
    } catch (_e) {
      return -1
    }
  }

  async getWordList(url: string): Promise<WordList> {
    const file = await this.fetchWordList(url)
    return convertToWordList(file)
  }

  getOne(userId: string, deckId: string): Promise<DeckResource> {
    return this.api.get<DeckResource>(`/decks/${userId}/${deckId}`)
  }

  getAll(userId: string): Promise<DeckResource[]> {
    return this.api.get<DeckResource[]>(`/decks/${userId}`)
  }

  save(deck: RawDeck): Promise<DeckResource> {
    return this.api.post<RawDeck, DeckResource>(`/decks/${deck.userId}`, deck)
  }

  update(deck: DeckResource): Promise<void> {
    return this.api.put<RawDeck, void>(`/decks/${deck.userId}/${deck.id}`, {
      name: deck.name,
      link: deck.link,
      progress: deck.progress,
      userId: deck.userId,
    })
  }

  delete(userId: string, deckId: string): Promise<void> {
    return this.api.delete(`/decks/${userId}/${deckId}`)
  }
}
