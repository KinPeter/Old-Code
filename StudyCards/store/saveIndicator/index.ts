import { actionTree, getterTree, mutationTree } from 'nuxt-typed-vuex'

export const namespaced = true

interface SaveIndicatorState {
  loading: boolean
  saved: boolean
  error: boolean
}

const state = (): SaveIndicatorState => ({
  loading: false,
  saved: false,
  error: false,
})

const getters = getterTree(state, {})

const mutations = mutationTree(state, {
  setSaved(state, value: boolean) {
    state.saved = value
  },
  setLoading(state, value: boolean) {
    state.loading = value
  },
  setError(state, value: boolean) {
    state.error = value
  },
})

const actions = actionTree(
  { state, getters, mutations },
  {
    showLoading({ commit }) {
      commit('setLoading', true)
    },
    hideLoading({ commit }) {
      commit('setLoading', false)
    },
    showSaved({ commit }) {
      commit('setSaved', true)
      setTimeout(() => {
        commit('setSaved', false)
      }, 2000)
    },
    showError({ commit }) {
      commit('setError', true)
      setTimeout(() => {
        commit('setError', false)
      }, 10000)
    },
  }
)

export { state, getters, mutations, actions }
