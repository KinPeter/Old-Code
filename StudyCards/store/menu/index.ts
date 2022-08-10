import { actionTree, getterTree, mutationTree } from 'nuxt-typed-vuex'

export const namespaced = true

interface MenuState {
  actions: {
    decks: { [key: string]: boolean }
    practice: { [key: string]: boolean }
  }
}

const state = (): MenuState => ({
  actions: {
    decks: {
      addNewDeck: false,
    },
    practice: {
      saveProgress: false,
    },
  },
})

const getters = getterTree(state, {
  deckActions(state, _getters, _rootState): boolean {
    return Object.values(state.actions.decks).some(value => !!value)
  },
  practiceActions(state, _getters, _rootState): boolean {
    return Object.values(state.actions.practice).some(value => !!value)
  },
})

const mutations = mutationTree(state, {
  setDecksAction(state, payload: { action: string; value: boolean }) {
    state.actions.decks[payload.action] = payload.value
  },
  setPracticeAction(state, payload: { action: string; value: boolean }) {
    state.actions.practice[payload.action] = payload.value
  },
})

const actions = actionTree(
  { state, getters, mutations },
  {
    showDecksActions({ commit }) {
      commit('setDecksAction', { action: 'addNewDeck', value: true })
    },
    hideDecksActions({ commit }) {
      commit('setDecksAction', { action: 'addNewDeck', value: false })
    },
    showPracticeActions({ commit }) {
      commit('setPracticeAction', { action: 'saveProgress', value: true })
    },
    hidePracticeActions({ commit }) {
      commit('setPracticeAction', { action: 'saveProgress', value: false })
    },
  }
)

export { state, getters, mutations, actions }
