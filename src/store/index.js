import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../apis/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    rooms: [],
    message: '',
    testString: "",
    questions: []
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
    },
    SET_TEST (state, payload) {
      state.testString = payload
    },
    SET_QUESTIONS (state,payload) {
      state.questions = payload
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
    },
    login ({ commit }, payload) {
      axios.post('/users/signin', payload, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem('token', data.token)
          commit('SET_IS_LOGIN', true)
          commit('SET_MESSAGE', '')
          router.push('/')
        })
        .catch(err => {
          console.log(err.response)
          err.response ? commit('SET_MESSAGE', err.response.data.message) : commit('SET_MESSAGE', `couldn't connect to the server`)
        })
    },

    parsingData ({commit}, payload) {
      return axios.post('https://n4k8xe0cd7.execute-api.us-east-1.amazonaws.com/dev/', payload, {
      }) 
    },

    addQuestion({commit}, payload) {
      return axios.post("/questions", payload, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },

    fetchQuestions({commit}, payload) {
      axios.get('/questions')
        .then(({data}) => {
          commit("SET_QUESTIONS", data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
