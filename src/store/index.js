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
    ADD_TO_BOX(state, data) {
      state.collects.push(data)
    },

    REMOVE_FROM_BOX(state, data) {
      const pkg = state.collects.find(pkg => pkg.package.name === data.package.name)
      drop(state.collects, pkg)
    }
  },
  plugins: [
    createPersistedState({
      key: 'npmarket'
    })
  ]
})
