import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { drop } from 'vuea'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    collects: []
  },
  mutations: {
    ADD_TO_COLLECT(state, name) {
      state.collects.push(name)
    },

    REMOVE_FROM_CCOLLECT(state, name) {
      drop(state.collects, name)
    }
  },
  plugins: [
    createPersistedState()
  ]
})
