import { actionTree, getterTree, mutationTree } from 'nuxt-typed-vuex'
import { DeckProgress } from '~/services/deck/types/DeckProgress'
import { WordList } from '~/services/deck/types/WordList'
import { DeckResource } from '~/services/deck/types/DeckResource'
import { parseProgress } from '~/utils/parseProgress'
import { DeckService } from '~/services/deck/DeckService'

export const namespaced = true

interface DecksState {
  loadedDeck: {
    id: string
    name: string
    link: string
    progress: DeckProgress
    wordList: WordList
  }
  isShowingDifficult: boolean
}

const state = (): DecksState => ({
  loadedDeck: {
    id: '',
    name: '',
    link: '',
    progress: {
      remaining: [],
      done: [],
      difficult: [],
      lastUsed: '',
      shuffled: false,
    },
    wordList: {
      front: [],
      back: [],
    },
  },
  isShowingDifficult: false,
})

const getters = getterTree(state, {
  hasLoadedDeck(state): boolean {
    return state.loadedDeck.id !== ''
  },
  hasLoadedDeckAndWordList(state): boolean {
    return (
      state.loadedDeck.id !== '' && state.loadedDeck.wordList.front.length !== 0
    )
  },
  numberOfCards(state): number {
    return (
      state.loadedDeck.progress.remaining.length +
      state.loadedDeck.progress.done.length +
      state.loadedDeck.progress.difficult.length
    )
  },
  isDeckFinished(state): boolean {
    return (
      !state.loadedDeck.progress.difficult.length &&
      !state.loadedDeck.progress.remaining.length
    )
  },
})

const mutations = mutationTree(state, {
  loadDeckData(state, deck: DeckResource) {
    state.loadedDeck.id = deck.id
    state.loadedDeck.name = deck.name
    state.loadedDeck.link = deck.link
    state.loadedDeck.progress = parseProgress(deck.progress)
  },
  loadWordList(state, wordList: WordList) {
    state.loadedDeck.wordList = wordList
  },
  transferCard(
    state,
    payload: { fromDifficult: boolean; toDifficult: boolean }
  ) {
    let elem: number | undefined
    if (!payload.fromDifficult) {
      elem = state.loadedDeck.progress.remaining.shift()
    } else {
      elem = state.loadedDeck.progress.difficult.shift()
    }
    if (elem !== undefined && !payload.toDifficult) {
      state.loadedDeck.progress.done.push(elem)
    } else if (elem !== undefined && payload.toDifficult) {
      state.loadedDeck.progress.difficult.push(elem)
    }
  },
  setShowingDifficult(state, value: boolean) {
    state.isShowingDifficult = value
  },
  setLastUsed(state, value: string) {
    state.loadedDeck.progress.lastUsed = value
  },
})

const actions = actionTree(
  { state, getters, mutations },
  {
    loadForEdit({ commit }, deck: DeckResource) {
      commit('loadDeckData', deck)
    },
    async loadForPractice(
      { commit },
      payload: { deck: DeckResource; deckService: DeckService }
    ) {
      const { deck, deckService } = payload
      commit('loadDeckData', deck)
      const wordList = await deckService.getWordList(deck.link)
      commit('loadWordList', wordList)
    },
    practiceCorrectAnswer({ commit }) {
      commit('transferCard', { fromDifficult: false, toDifficult: false })
    },
    practiceIncorrectAnswer({ commit }) {
      commit('transferCard', { fromDifficult: false, toDifficult: true })
    },
    difficultCorrectAnswer({ commit }) {
      commit('transferCard', { fromDifficult: true, toDifficult: false })
    },
    difficultIncorrectAnswer({ commit }) {
      commit('transferCard', { fromDifficult: true, toDifficult: true })
    },
    showDifficult({ commit }) {
      commit('setShowingDifficult', true)
    },
    showRemaining({ commit }) {
      commit('setShowingDifficult', false)
    },
    updateLastUsed({ commit }) {
      commit('setLastUsed', new Date().toISOString())
    },
  }
)

export { state, getters, mutations, actions }
