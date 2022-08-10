import { actionTree, getterTree, mutationTree } from 'nuxt-typed-vuex'

export const namespaced = true

interface SoundState {
  sound: boolean
}

const state = (): SoundState => ({
  sound: true,
})

const getters = getterTree(state, {
  isOn(state): boolean {
    return state.sound
  },
})

const mutations = mutationTree(state, {
  setSound(state, payload: boolean) {
    state.sound = payload
  },
})

const actions = actionTree(
  { state, getters, mutations },
  {
    turnSoundOn({ commit }) {
      commit('setSound', true)
    },
    turnSoundOff({ commit }) {
      commit('setSound', false)
    },
  }
)

export { state, getters, mutations, actions }
