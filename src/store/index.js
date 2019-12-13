import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../apis/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    rooms: [],
    message: ''
  },
  mutations: {
    SET_IS_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_ROOMS (state, payload) {
      state.rooms = payload
    },
    SET_MESSAGE (state, payload) {
      state.message = payload
    }
  },
  actions: {
    register ({ commit }, payload) {
      console.log('aaaa')
      axios.post('/users/signup', payload)
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem('token', data.token)
          commit('SET_IS_LOGIN', true)
          commit('SET_MESSAGE', '')
          router.push('/')
        })
        .catch(err => {
          console.log(err)
          err.response ? commit('SET_MESSAGE', err.response.data.message.join(', ')) : commit('SET_MESSAGE', `couldn't connect to the server`)
        })
    }
  },
  modules: {
  }
})
