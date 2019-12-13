import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    rooms: []
  },
  mutations: {
    SET_IS_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_ROOMS (state, payload) {
      state.rooms = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
